package com.ntgschool.easystay.Services.impl;

import com.ntgschool.easystay.Entities.Facility;
import com.ntgschool.easystay.Exceptions.FacilityNotFoundException;
import com.ntgschool.easystay.Repos.FacilityRepository;
import com.ntgschool.easystay.Services.FacilityService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FacilityServiceImpl implements FacilityService {
    private final FacilityRepository facilityRepository;


    @Override
    public List<Facility> getAllFacilities() {
        return facilityRepository.findAll();
    }

    @Override
    public Facility getFacilityById(Long id) {
        return facilityRepository.findById(id).orElseThrow(
                () -> new FacilityNotFoundException(id)
        );
    }

    @Override
    @Transactional
    public Facility createFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    @Override
    @Transactional
    public Facility updateFacility(Long id, Facility facility) {
        Facility oldFacility = facilityRepository.findById(id).orElseThrow(
                () -> new FacilityNotFoundException(id)
        );
        oldFacility.setName(facility.getName());
        oldFacility.setRooms(facility.getRooms());
        return facilityRepository.save(oldFacility);
    }

    @Override
    public void deleteFacility(Long id) {
        facilityRepository.findById(id).orElseThrow(
                () -> new FacilityNotFoundException(id)
        );
        facilityRepository.deleteById(id);
    }
}
