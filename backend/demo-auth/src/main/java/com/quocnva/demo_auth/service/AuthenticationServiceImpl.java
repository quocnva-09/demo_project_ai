package com.quocnva.demo_auth.service;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import com.quocnva.demo_auth.dto.request.LoginRequest;
import com.quocnva.demo_auth.dto.request.TokenRequest;
import com.quocnva.demo_auth.dto.response.AuthenticationResponse;
import com.quocnva.demo_auth.dto.response.IntrospectResponse;
import com.quocnva.demo_auth.entity.Token;
import com.quocnva.demo_auth.entity.User;
import com.quocnva.demo_auth.exception.AppException;
import com.quocnva.demo_auth.exception.ErrorCode;
import com.quocnva.demo_auth.repository.TokenRepository;
import com.quocnva.demo_auth.repository.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationServiceImpl implements AuthenticationService {

    UserRepository userRepository;
    TokenRepository tokenRepository;
    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String signerKey;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long validDuration;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long refreshableDuration;

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        var user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        var token = generateToken(user);
        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    @Override
    public IntrospectResponse introspect(TokenRequest request) {
        var token = request.getToken();
        boolean isValid = true;
        try {
            verifyToken(token, false);
        } catch (AppException | ParseException | JOSEException e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    @Override
    public void logout(TokenRequest request) {
        try {
            var signToken = verifyToken(request.getToken(), true);
            String jwtId = signToken.getJWTClaimsSet().getJWTID();
            tokenRepository.findByJwtId(jwtId).ifPresent(tokenRepository::delete);
        } catch (AppException | ParseException | JOSEException e) {
            // Already logged out or invalid token. Just log or swallow gracefully.
        }
    }

    @Override
    public AuthenticationResponse refreshToken(TokenRequest request) {
        try {
            var signToken = verifyToken(request.getToken(), true);
            String jwtId = signToken.getJWTClaimsSet().getJWTID();
            
            Token tokenEntity = tokenRepository.findByJwtId(jwtId)
                    .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

            User user = tokenEntity.getUser();
            tokenRepository.delete(tokenEntity); // Invalid the old token
            var newToken = generateToken(user);

            return AuthenticationResponse.builder()
                    .token(newToken)
                    .authenticated(true)
                    .build();

        } catch (ParseException | JOSEException e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    private String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

        String jwtId = UUID.randomUUID().toString();
        String refreshToken = UUID.randomUUID().toString();

        long issueTime = Instant.now().toEpochMilli();
        long expirationTime = issueTime + validDuration;

        JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                .subject(user.getUsername())
                .issuer("com.quocnva")
                .issueTime(new Date(issueTime))
                .expirationTime(new Date(expirationTime))
                .jwtID(jwtId)
                .claim("scope", user.getRole().name())
                .build();

        Payload payload = new Payload(jwtClaimsSet.toJSONObject());
        JWSObject jwsObject = new JWSObject(header, payload);

        try {
            jwsObject.sign(new MACSigner(signerKey.getBytes()));
            String tokenString = jwsObject.serialize();

            Token token = Token.builder()
                    .user(user)
                    .jwtId(jwtId)
                    .refreshToken(refreshToken)
                    .expiredAt(LocalDateTime.ofInstant(Instant.ofEpochMilli(expirationTime), ZoneId.systemDefault()))
                    .build();
            tokenRepository.save(token);

            return tokenString;
        } catch (JOSEException e) {
            throw new RuntimeException("Cannot create token", e);
        }
    }

    private SignedJWT verifyToken(String token, boolean isRefresh) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = isRefresh
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime().toInstant().plus(refreshableDuration, ChronoUnit.MILLIS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        var verified = signedJWT.verify(verifier);

        if (!verified || expiryTime.before(new Date())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        
        // Also verify if it's explicitly logged out by checking DB
        boolean tokenExists = tokenRepository.findByJwtId(signedJWT.getJWTClaimsSet().getJWTID()).isPresent();
        if (!tokenExists) {
             throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }
}
