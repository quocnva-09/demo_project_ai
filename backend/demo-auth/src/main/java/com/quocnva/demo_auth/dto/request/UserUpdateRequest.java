package com.quocnva.demo_auth.dto.request;

import com.quocnva.demo_auth.enums.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserUpdateRequest {

    @NotBlank(message = "EMAIL_INVALID")
    @Email(message = "EMAIL_INVALID")
    String email;

    @NotBlank(message = "PHONE_INVALID")
    String phone;

    @NotNull(message = "ROLE_INVALID")
    Role role;
}
