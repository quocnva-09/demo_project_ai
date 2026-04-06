package com.quocnva.demo_auth.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.Optional;

public class SecurityUtils {

    public static Optional<String> getCurrentUserLogin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return Optional.empty();
        }

        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            return Optional.ofNullable(jwt.getSubject());
        }

        if (authentication.getPrincipal() instanceof String) {
            return Optional.of((String) authentication.getPrincipal());
        }

        return Optional.empty();
    }
}
