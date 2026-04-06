package com.quocnva.demo_auth.service;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.response.UserResponse;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse getMyInfo();
}
