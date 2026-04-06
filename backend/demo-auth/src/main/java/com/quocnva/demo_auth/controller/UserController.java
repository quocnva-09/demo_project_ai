package com.quocnva.demo_auth.controller;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.response.ApiResponse;
import com.quocnva.demo_auth.dto.response.UserResponse;
import com.quocnva.demo_auth.service.UserService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@RequestBody @Valid RegisterRequest request) {
        return ApiResponse.<UserResponse>builder()
                .result(userService.register(request))
                .build();
    }

    @GetMapping("/me")
    public ApiResponse<UserResponse> getMyInfo() {
        return ApiResponse.<UserResponse>builder()
                .result(userService.getMyInfo())
                .build();
    }
}
