package com.quocnva.demo_auth.mapper;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.response.UserResponse;
import com.quocnva.demo_auth.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(RegisterRequest request);
    UserResponse toUserResponse(User user);
}
