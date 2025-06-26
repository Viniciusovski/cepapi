package com.bacelar.cepapi.service;

import com.bacelar.cepapi.dto.*;
import com.bacelar.cepapi.exception.*;
import com.bacelar.cepapi.model.*;
import com.bacelar.cepapi.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final ViaCepService viaCepService;

    @Transactional(readOnly = true)
    public List<AddressResponse> getUserAddresses(Long userId) {
        return addressRepository.findByUser_Id(userId).stream()
                .map(this::mapToAddressResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public AddressResponse getAddressById(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        return mapToAddressResponse(address);
    }

    @Transactional
    public AddressResponse createAddress(AddressRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        // Verifica se CEP já está cadastrado para o usuário
        if (addressRepository.existsByCepAndUser_Id(request.cep(), user.getId())) {
            throw new BadRequestException("CEP already registered for this user");
        }

        // Consulta ViaCEP se necessário
        AddressDTO cepInfo = viaCepService.getCepInfo(request.cep());

        Address address = Address.builder()
                .street(request.street().isBlank() ? cepInfo.street() : request.street())
                .number(request.number())
                .complement(request.complement())
                .neighborhood(request.neighborhood().isBlank() ? cepInfo.neighborhood() : request.neighborhood())
                .city(request.city().isBlank() ? cepInfo.city() : request.city())
                .state(request.state().isBlank() ? cepInfo.state() : request.state())
                .cep(request.cep())
                .user(user)
                .build();

        address = addressRepository.save(address);
        return mapToAddressResponse(address);
    }

    @Transactional
    public AddressResponse updateAddress(Long id, AddressRequest request) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));

        if (!address.getUser().getId().equals(request.userId())) {
            throw new BadRequestException("Cannot change address owner");
        }

        address.setStreet(request.street());
        address.setNumber(request.number());
        address.setComplement(request.complement());
        address.setNeighborhood(request.neighborhood());
        address.setCity(request.city());
        address.setState(request.state());
        address.setCep(request.cep());

        address = addressRepository.save(address);
        return mapToAddressResponse(address);
    }

    @Transactional
    public void deleteAddress(Long id) {
        Address address = addressRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
        addressRepository.delete(address);
    }

    private AddressResponse mapToAddressResponse(Address address) {
        return new AddressResponse(
                address.getId(),
                address.getStreet(),
                address.getNumber(),
                address.getComplement(),
                address.getNeighborhood(),
                address.getCity(),
                address.getState(),
                address.getCep(),
                address.getUser().getId()
        );
    }
}