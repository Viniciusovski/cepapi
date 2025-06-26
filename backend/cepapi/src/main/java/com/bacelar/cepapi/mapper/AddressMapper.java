package com.bacelar.cepapi.mapper;

import com.bacelar.cepapi.dto.AddressDTO;
import com.bacelar.cepapi.model.Address;

public class AddressMapper {

    public static Address toEntity(AddressDTO dto) {
        if (dto == null || dto.isEmpty()) {
            return null;
        }

        return Address.builder()
                .cep(dto.cep().replace("-", ""))
                .street(dto.street())
                .complement(dto.complement())
                .neighborhood(dto.neighborhood())
                .city(dto.city())
                .state(dto.state())
                .build();
    }

    public static AddressDTO toDTO(Address entity) {
        if (entity == null) {
            return null;
        }

        return new AddressDTO(
                entity.getCep(),
                entity.getStreet(),
                entity.getComplement(),
                entity.getNeighborhood(),
                entity.getCity(),
                entity.getState(),
                null, null, null, null
        );
    }
}