package com.bacelar.cepapi.dto;

import com.bacelar.cepapi.model.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(min = 3, max = 50) String name,
        @NotBlank @Email String email,
        @NotBlank @Size(min = 6) String password,
        Role role
) {}