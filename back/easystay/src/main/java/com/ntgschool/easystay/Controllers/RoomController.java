package com.ntgschool.easystay.Controllers;

import com.ntgschool.easystay.Dtos.Request.RoomRequest;
import com.ntgschool.easystay.Dtos.Response.RoomResponse;
import com.ntgschool.easystay.Mappers.RoomMapper;
import com.ntgschool.easystay.Services.RoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {
    private final RoomService roomService;
    private final RoomMapper roomMapper;

    @GetMapping
    public ResponseEntity<List<RoomResponse>> getAllRooms(){
        return ResponseEntity.ok(roomMapper.toRoomResponses(
                roomService.getAllRooms()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoomResponse> getRoomById(@PathVariable Long id){
        return ResponseEntity.ok(roomMapper.toRoomResponse(
                roomService.getRoomById(id)
        ));
    }

    @PostMapping
    public ResponseEntity<RoomResponse> createRoom(@RequestBody RoomRequest roomRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                roomMapper.toRoomResponse(
                        roomService.createRoom(roomMapper.toRoom(roomRequest))
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoomResponse> updateRoom(@PathVariable Long id, @RequestBody RoomRequest roomRequest){
        return ResponseEntity.ok(roomMapper.toRoomResponse(
                roomService.updateRoom(id, roomMapper.toRoom(roomRequest))
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable Long id){
        roomService.deleteRoom(id);
        return ResponseEntity.noContent().build();
    }
}
