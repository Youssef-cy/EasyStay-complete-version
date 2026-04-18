package com.ntgschool.easystay.Mappers;

import com.ntgschool.easystay.Dtos.Request.RoomRequest;
import com.ntgschool.easystay.Dtos.Response.RoomResponse;
import com.ntgschool.easystay.Entities.Room;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring", uses = {FacilityMapper.class})
public interface RoomMapper {
    RoomResponse toRoomResponse(Room room);

    List<RoomResponse> toRoomResponses(List<Room> rooms);

    @Mapping(target = "id", ignore = true)
    Room toRoom(RoomRequest roomRequest);
}
