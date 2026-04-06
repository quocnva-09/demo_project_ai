package com.quocnva.demo_auth.service;

import com.quocnva.demo_auth.dto.request.RegisterRequest;
import com.quocnva.demo_auth.dto.response.UserResponse;
import com.quocnva.demo_auth.entity.User;
import com.quocnva.demo_auth.enums.Provider;
import com.quocnva.demo_auth.enums.Role;
import com.quocnva.demo_auth.exception.AppException;
import com.quocnva.demo_auth.exception.ErrorCode;
import com.quocnva.demo_auth.mapper.UserMapper;
import com.quocnva.demo_auth.repository.UserRepository;
import com.quocnva.demo_auth.util.SecurityUtils;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    UserMapper userMapper;
    PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        User user = userMapper.toUser(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        
        user.setRole(Role.USER);
        user.setProvider(Provider.LOCAL);
        user.setProviderId(UUID.randomUUID().toString()); // Assuming local users get a random providerId
        
        user = userRepository.save(user);
        
        return userMapper.toUserResponse(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getMyInfo() {
        String username = SecurityUtils.getCurrentUserLogin()
                .orElseThrow(() -> new AppException(ErrorCode.UNAUTHENTICATED));

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }
}
