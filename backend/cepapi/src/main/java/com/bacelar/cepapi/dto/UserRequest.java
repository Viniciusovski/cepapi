package com.bacelar.cepapi.dto;

import jakarta.validation.constraints.*;
import com.bacelar.cepapi.model.Role;

public record UserRequest(
        @NotBlank @Size(min = 3, max = 100) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6) String password,
        Role role
) {}