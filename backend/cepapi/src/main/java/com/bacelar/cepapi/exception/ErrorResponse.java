package com.bacelar.cepapi.exception;

import java.util.List;

public record ErrorResponse(
        int status,
        String error,
        List<String> messages
) {}