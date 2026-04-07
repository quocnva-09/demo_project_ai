package com.quocnva.demo_auth.mapper;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.request.UserCreateRequest;
import com.quocnva.demo_auth.dto.request.UserUpdateRequest;
import com.quocnva.demo_auth.dto.response.UserResponse;
import com.quocnva.demo_auth.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest request);
    User toUser(UserCreateRequest request);
    UserResponse toUserResponse(User user);
    
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}
