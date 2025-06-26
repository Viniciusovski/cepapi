package com.bacelar.cepapi.dto;

import com.bacelar.cepapi.model.Role;
import java.time.LocalDateTime;
import java.util.List;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        LocalDateTime createdAt,
        List<AddressResponse> addresses
) {}