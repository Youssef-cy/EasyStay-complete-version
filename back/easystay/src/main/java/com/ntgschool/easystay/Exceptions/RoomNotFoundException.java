package com.ntgschool.easystay.Exceptions;

public class RoomNotFoundException extends RuntimeException {
    private Long id;
    public RoomNotFoundException(Long id ) {
        super("Room with id " + id + " is not found");
        this.id = id;
    }
}
