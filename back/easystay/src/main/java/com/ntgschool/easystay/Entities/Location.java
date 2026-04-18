package com.ntgschool.easystay.Entities;

import jakarta.persistence.Embeddable;
import lombok.*;

import java.math.BigDecimal;

@Embeddable
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Location {

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String city;

    private String country;
}
