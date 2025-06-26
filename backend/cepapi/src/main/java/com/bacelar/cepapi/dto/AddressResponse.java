package com.bacelar.cepapi.dto;

public record AddressResponse(
        Long id,
        String street,
        String number,
        String complement,
        String neighborhood,
        String city,
        String state,
        String cep,
        Long userId
) {}