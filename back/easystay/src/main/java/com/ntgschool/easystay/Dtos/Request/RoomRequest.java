package com.ntgschool.easystay.Dtos.Request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomRequest {
    private Long capacity;
    private Double price;
    private List<FacilityRequest> facilities;
    private HotelRequest hotel;
}
