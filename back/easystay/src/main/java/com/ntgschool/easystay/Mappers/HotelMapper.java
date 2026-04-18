package com.ntgschool.easystay.Mappers;

import com.ntgschool.easystay.Dtos.Request.HotelRequest;
import com.ntgschool.easystay.Dtos.Response.HotelResponse;
import com.ntgschool.easystay.Entities.Hotel;
import com.ntgschool.easystay.Entities.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring", uses = {RoomMapper.class})
public interface HotelMapper {
    @Mapping(target = "rooms",source = "rooms", qualifiedByName = "getRooms")
    HotelResponse toHotelResponse(Hotel hotel);

    @Named("getRooms")
    default List<Room> getRooms(List<Room> rooms) {
        if (rooms == null) {
            return new ArrayList<>();
        }
        return rooms;
    }

    List<HotelResponse> toHotelResponses(List<Hotel> hotels);

    @Mapping(target = "rooms", ignore = true)
    @Mapping(target = "id", source = "id")
    Hotel toHotel(HotelRequest hotelRequest);
}
