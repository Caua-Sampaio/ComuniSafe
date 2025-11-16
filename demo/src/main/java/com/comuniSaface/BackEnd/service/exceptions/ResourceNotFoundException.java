package com.comuniSaface.BackEnd.service.exceptions;

public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String text){super(text);}
}
