package com.quocnva.demo_auth.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegisterRequest {

    @NotBlank(message = "USERNAME_INVALID")
    @Size(min = 3, message = "USERNAME_INVALID")
    String username;

    @NotBlank(message = "INVALID_PASSWORD")
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    @NotBlank(message = "INVALID_KEY")
    @Email(message = "INVALID_KEY")
    String email;

    @NotBlank(message = "INVALID_KEY")
    String phone;
}
