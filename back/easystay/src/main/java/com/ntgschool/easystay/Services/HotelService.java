package com.ntgschool.easystay.Services;

import com.ntgschool.easystay.Entities.Hotel;

import java.util.List;

public interface HotelService {
    List<Hotel> getAllHotels();
    Hotel getHotelById(Long id);
    Hotel createHotel(Hotel hotel);
    Hotel updateHotel(Long id, Hotel hotel);
    void deleteHotel(Long id);
}
