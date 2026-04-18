package com.ntgschool.easystay.Dtos.Response;

import com.ntgschool.easystay.Entities.Hotel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomResponse {
    private Long id;
    private Long capacity;
    private Double price;
    private List<FacilityResponse> facilities;
}
