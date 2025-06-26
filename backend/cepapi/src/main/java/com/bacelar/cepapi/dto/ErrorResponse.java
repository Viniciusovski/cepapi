package com.bacelar.cepapi.dto;

public record ErrorResponse(
        int status,
        String error,
        String message
) {}