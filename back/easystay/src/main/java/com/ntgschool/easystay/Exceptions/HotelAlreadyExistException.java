package com.ntgschool.easystay.Exceptions;

public class HotelAlreadyExistException extends RuntimeException {
    private Long id;
    public HotelAlreadyExistException(Long id) {
        super("Hotel With id " + id + " is already exist");
    }
}
