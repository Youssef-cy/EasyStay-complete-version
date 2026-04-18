package com.ntgschool.easystay.Controllers;

import com.ntgschool.easystay.Dtos.Request.HotelRequest;
import com.ntgschool.easystay.Dtos.Response.HotelResponse;
import com.ntgschool.easystay.Mappers.HotelMapper;
import com.ntgschool.easystay.Services.HotelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {
    private final HotelService hotelService;
    private final HotelMapper hotelMapper;

    @GetMapping
    public ResponseEntity<List<HotelResponse>> getAllHotels(){
        return ResponseEntity.ok(hotelMapper.toHotelResponses(
                hotelService.getAllHotels()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelResponse> getHotelById(@PathVariable Long id){
        return ResponseEntity.ok(hotelMapper.toHotelResponse(
                hotelService.getHotelById(id)
        ));
    }

    @PostMapping
    public ResponseEntity<HotelResponse> createHotel(@RequestBody HotelRequest hotelRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                hotelMapper.toHotelResponse(
                        hotelService.createHotel(hotelMapper.toHotel(hotelRequest))
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<HotelResponse> updateHotel(@PathVariable Long id, @RequestBody HotelRequest hotelRequest){
        return ResponseEntity.ok(hotelMapper.toHotelResponse(
                hotelService.updateHotel(id, hotelMapper.toHotel(hotelRequest))
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHotel(@PathVariable Long id){
        hotelService.deleteHotel(id);
        return ResponseEntity.noContent().build();
    }
}
