package com.quocnva.demo_auth.controller;

import com.quocnva.demo_auth.dto.request.LoginRequest;
import com.quocnva.demo_auth.dto.request.TokenRequest;
import com.quocnva.demo_auth.dto.response.ApiResponse;
import com.quocnva.demo_auth.dto.response.AuthenticationResponse;
import com.quocnva.demo_auth.dto.response.IntrospectResponse;
import com.quocnva.demo_auth.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationController {

    AuthenticationService authenticationService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> login(@RequestBody @Valid LoginRequest request) {
        var result = authenticationService.login(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody @Valid TokenRequest request) {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .result(result)
                .build();
    }

    @PostMapping("/log-out")
    public ApiResponse<Void> logout(@RequestBody @Valid TokenRequest request) {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder().build();
    }

    @PostMapping("/refresh-token")
    public ApiResponse<AuthenticationResponse> refreshToken(@RequestBody @Valid TokenRequest request) {
        var result = authenticationService.refreshToken(request);
        return ApiResponse.<AuthenticationResponse>builder()
                .result(result)
                .build();
    }
}
