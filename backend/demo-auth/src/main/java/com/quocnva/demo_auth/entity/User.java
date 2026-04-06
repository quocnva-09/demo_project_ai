package com.quocnva.demo_auth.entity;

import com.quocnva.demo_auth.enums.Provider;
import com.quocnva.demo_auth.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(unique = true, nullable = false)
    String email;

    @Column(unique = true, nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    @Column(unique = true, nullable = false)
    String phone;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    Role role = Role.USER;

    @Column(name = "provider_id", unique = true, nullable = false)
    String providerId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    Provider provider = Provider.LOCAL;

    @Column(name = "is_reset_pwd", nullable = false)
    @Builder.Default
    boolean isResetPwd = false;
}
