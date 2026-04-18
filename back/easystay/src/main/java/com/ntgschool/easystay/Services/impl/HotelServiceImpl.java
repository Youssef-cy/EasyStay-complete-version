package com.ntgschool.easystay.Services.impl;

import com.ntgschool.easystay.Entities.Hotel;
import com.ntgschool.easystay.Exceptions.HotelAlreadyExistException;
import com.ntgschool.easystay.Exceptions.HotelNotFoundException;
import com.ntgschool.easystay.Repos.HotelRepository;
import com.ntgschool.easystay.Services.HotelService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HotelServiceImpl implements HotelService {
    private final HotelRepository hotelRepository;

    @Override
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @Override
    public Hotel getHotelById(Long id) {
        return hotelRepository.findById(id).orElseThrow(
                () -> new HotelNotFoundException(id)
        );
    }

    @Override
    @Transactional
    public Hotel createHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    @Override
    @Transactional
    public Hotel updateHotel(Long id, Hotel hotel) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(
                () -> new HotelNotFoundException(id)
        );
        oldHotel.setName(hotel.getName());
        oldHotel.setLocation(hotel.getLocation());
        oldHotel.setRooms(hotel.getRooms());
        return hotelRepository.save(oldHotel);
    }

    @Override
    public void deleteHotel(Long id) {
        Hotel oldHotel = hotelRepository.findById(id).orElseThrow(
                () -> new HotelNotFoundException(id)
        );
        hotelRepository.deleteById(id);
    }
}
