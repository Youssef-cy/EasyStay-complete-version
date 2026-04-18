package com.ntgschool.easystay.Dtos.Response;

import com.ntgschool.easystay.Entities.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelResponse {
    private Long id;
    private String name;
    private Location location;
    private List<RoomResponse> rooms;
}
