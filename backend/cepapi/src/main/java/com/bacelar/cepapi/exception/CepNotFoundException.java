package com.bacelar.cepapi.exception;

public class CepNotFoundException extends RuntimeException {
    public CepNotFoundException(String message) {
        super(message);
    }

    public CepNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}