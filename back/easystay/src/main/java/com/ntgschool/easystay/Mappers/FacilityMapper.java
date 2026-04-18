package com.ntgschool.easystay.Mappers;

import com.ntgschool.easystay.Dtos.Request.FacilityRequest;
import com.ntgschool.easystay.Dtos.Response.FacilityResponse;
import com.ntgschool.easystay.Entities.Facility;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FacilityMapper {
    FacilityResponse toFacilityResponse(Facility facility);

    List<FacilityResponse> toFacilityResponses(List<Facility> facilities);

    @Mapping(target = "rooms", ignore = true)
    Facility toFacility(FacilityRequest facilityRequest);
}
