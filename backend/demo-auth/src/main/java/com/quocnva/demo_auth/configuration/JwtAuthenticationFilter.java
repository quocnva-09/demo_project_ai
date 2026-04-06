package com.quocnva.demo_auth.configuration;

import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.SignedJWT;
import com.quocnva.demo_auth.repository.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Date;

@Component
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    final TokenRepository tokenRepository;

    @Value("${jwt.signerKey}")
    String signerKey;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = parseJwt(request);

        if (token != null) {
            try {
                SignedJWT signedJWT = SignedJWT.parse(token);
                JWSVerifier verifier = new MACVerifier(signerKey.getBytes());
                boolean verified = signedJWT.verify(verifier);

                if (verified && signedJWT.getJWTClaimsSet().getExpirationTime().after(new Date())) {
                    String jwtId = signedJWT.getJWTClaimsSet().getJWTID();
                    
                    // Verify that the token is not logged out (exists in DB)
                    if (tokenRepository.findByJwtId(jwtId).isPresent()) {
                        String username = signedJWT.getJWTClaimsSet().getSubject();
                        String role = signedJWT.getJWTClaimsSet().getStringClaim("scope");
                        
                        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                username, null, Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role)));

                        SecurityContextHolder.getContext().setAuthentication(authentication);
                    }
                }
            } catch (Exception e) {
                // Ignore empty/invalid JWT parsing exceptions gracefully
            }
        }

        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
