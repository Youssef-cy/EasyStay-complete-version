package com.ntgschool.easystay.Exceptions;

public class HotelNotFoundException extends RuntimeException {
    private Long id;
    public HotelNotFoundException(Long id) {
        super("Hotel With id " + id + " is not Found");
    }
}
