package com.ntgschool.easystay.Services.impl;

import com.ntgschool.easystay.Entities.Facility;
import com.ntgschool.easystay.Entities.Hotel;
import com.ntgschool.easystay.Entities.Room;
import com.ntgschool.easystay.Exceptions.RoomNotFoundException;
import com.ntgschool.easystay.Repos.RoomRepository;
import com.ntgschool.easystay.Services.FacilityService;
import com.ntgschool.easystay.Services.HotelService;
import com.ntgschool.easystay.Services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {
    private final RoomRepository roomRepository;
    private final FacilityService facilityService;
    private final HotelService hotelService;


    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public Room getRoomById(Long id) {
       return roomRepository.findById(id).orElseThrow(
                () -> new RoomNotFoundException(id)
        );
    }

    @Override
    public Room createRoom(Room room) {
        List<Facility> oldFacilities = new ArrayList<>();
        room.getFacilities().forEach(
                (facility) -> {
                    Facility facilityById = facilityService.getFacilityById(facility.getId());
                    oldFacilities.add(facilityById);
                }
        );
        Hotel hotel = hotelService.getHotelById(room.getHotel().getId());
        room.setHotel(hotel);
        room.setFacilities(oldFacilities);
        return roomRepository.save(room);
    }

    @Override
    public Room updateRoom(Long id, Room room) {
        Room oldRoom = roomRepository.findById(id).orElseThrow(
                () -> new RoomNotFoundException(id)
        );
        oldRoom.setCapacity(room.getCapacity());
        oldRoom.setPrice(room.getPrice());
        oldRoom.setFacilities(room.getFacilities());
        return roomRepository.save(oldRoom);
    }

    @Override
    public void deleteRoom(Long id) {
        roomRepository.findById(id).orElseThrow(
                () -> new RoomNotFoundException(id)
        );
        roomRepository.deleteById(id);
    }
}
