package com.quocnva.demo_auth.dto.request;

import com.quocnva.demo_auth.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreateRequest {

    @NotBlank(message = "EMAIL_INVALID")
    @Email(message = "EMAIL_INVALID")
    String email;

    @NotBlank(message = "USERNAME_INVALID")
    @Size(min = 3, message = "USERNAME_INVALID")
    String username;

    @NotBlank(message = "PASSWORD_INVALID")
    @Size(min = 6, message = "PASSWORD_INVALID")
    String password;

    @NotBlank(message = "PHONE_INVALID")
    String phone;

    @NotNull(message = "ROLE_INVALID")
    Role role;
}
