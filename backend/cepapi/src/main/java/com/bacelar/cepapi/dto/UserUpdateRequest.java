package com.bacelar.cepapi.dto;

import com.bacelar.cepapi.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserUpdateRequest(
        @NotBlank
        @Size(min = 3, max = 50)
        String name,

        @NotBlank
        @Email
        String email,

        @Size(min = 6, max = 20)
        String password
) {
    public User toUser(User existingUser) {
        if (name != null) {
            existingUser.setName(name);
        }
        if (email != null) {
            existingUser.setEmail(email);
        }
        return existingUser;
    }
}