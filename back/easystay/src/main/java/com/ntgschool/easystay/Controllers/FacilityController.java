package com.ntgschool.easystay.Controllers;

import com.ntgschool.easystay.Dtos.Request.FacilityRequest;
import com.ntgschool.easystay.Dtos.Response.FacilityResponse;
import com.ntgschool.easystay.Mappers.FacilityMapper;
import com.ntgschool.easystay.Services.FacilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/facilities")
@RequiredArgsConstructor
public class FacilityController {
    private final FacilityService facilityService;
    private final FacilityMapper facilityMapper;

    @GetMapping
    public ResponseEntity<List<FacilityResponse>> getAllFacilities(){
        return ResponseEntity.ok(facilityMapper.toFacilityResponses(
                facilityService.getAllFacilities()
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacilityResponse> getFacilityById(@PathVariable Long id){
        return ResponseEntity.ok(facilityMapper.toFacilityResponse(
                facilityService.getFacilityById(id)
        ));
    }

    @PostMapping
    public ResponseEntity<FacilityResponse> createFacility(@RequestBody FacilityRequest facilityRequest){
        return ResponseEntity.status(HttpStatus.CREATED).body(
                facilityMapper.toFacilityResponse(
                        facilityService.createFacility(facilityMapper.toFacility(facilityRequest))
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacilityResponse> updateFacility(@PathVariable Long id, @RequestBody FacilityRequest facilityRequest){
        return ResponseEntity.ok(facilityMapper.toFacilityResponse(
                facilityService.updateFacility(id, facilityMapper.toFacility(facilityRequest))
        ));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFacility(@PathVariable Long id){
        facilityService.deleteFacility(id);
        return ResponseEntity.noContent().build();
    }
}
