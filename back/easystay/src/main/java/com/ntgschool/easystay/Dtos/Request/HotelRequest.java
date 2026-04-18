package com.ntgschool.easystay.Dtos.Request;

import com.ntgschool.easystay.Entities.Location;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HotelRequest {
    private Long id;
    private String name;
    private Location location;
}
