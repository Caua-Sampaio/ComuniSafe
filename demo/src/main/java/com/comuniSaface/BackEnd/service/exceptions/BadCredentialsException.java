package com.comuniSaface.BackEnd.service.exceptions;
public class BadCredentialsException extends RuntimeException {
    public BadCredentialsException(String message) {
        super(message);
    }
}