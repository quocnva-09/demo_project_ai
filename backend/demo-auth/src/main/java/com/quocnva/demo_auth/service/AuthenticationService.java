package com.quocnva.demo_auth.service;

import com.quocnva.demo_auth.dto.request.LoginRequest;
import com.quocnva.demo_auth.dto.request.TokenRequest;
import com.quocnva.demo_auth.dto.response.AuthenticationResponse;
import com.quocnva.demo_auth.dto.response.IntrospectResponse;

public interface AuthenticationService {
    AuthenticationResponse login(LoginRequest request);
    IntrospectResponse introspect(TokenRequest request);
    void logout(TokenRequest request);
    AuthenticationResponse refreshToken(TokenRequest request);
}
