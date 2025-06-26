package com.bacelar.cepapi.dto;

import jakarta.validation.constraints.*;

public record AddressRequest(
        @NotBlank String street,
        @NotBlank String number,
        String complement,
        @NotBlank String neighborhood,
        @NotBlank String city,
        @NotBlank @Size(min = 2, max = 2) String state,
        @NotBlank @Size(min = 8, max = 8) String cep,
        @NotNull Long userId
) {}