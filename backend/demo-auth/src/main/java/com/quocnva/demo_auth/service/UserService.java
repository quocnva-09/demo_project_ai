package com.quocnva.demo_auth.service;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.request.UserCreateRequest;
import com.quocnva.demo_auth.dto.request.UserUpdateRequest;
import com.quocnva.demo_auth.dto.response.UserResponse;

import java.util.List;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse getMyInfo();
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse createUser(UserCreateRequest request);
    UserResponse updateUser(Long id, UserUpdateRequest request);
    void deleteUser(Long id);
}
