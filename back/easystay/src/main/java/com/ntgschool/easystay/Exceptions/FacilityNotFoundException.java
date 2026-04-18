package com.ntgschool.easystay.Exceptions;

public class FacilityNotFoundException extends RuntimeException {
    private Long id;
    public FacilityNotFoundException(Long id) {
        super("Facility with id " + id + " is not found");
        this.id = id;
    }
}
