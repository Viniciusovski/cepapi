package com.bacelar.cepapi.service;

import com.bacelar.cepapi.dto.AddressDTO;
import com.bacelar.cepapi.exception.CepNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ViaCepServiceTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private ViaCepService viaCepService;

    @Test
    void whenValidCep_thenReturnAddressDTO() {
        // Arrange
        String cep = "01001000";
        AddressDTO mockResponse = new AddressDTO(
                "01001-000",
                "Praça da Sé",
                "lado ímpar",
                "Sé",
                "São Paulo",
                "SP",
                "3550308",
                "1004",
                "11",
                "7107"
        );

        when(restTemplate.getForEntity(anyString(), eq(AddressDTO.class)))
                .thenReturn(new ResponseEntity<>(mockResponse, HttpStatus.OK));

        // Act
        AddressDTO result = viaCepService.getCepInfo(cep);

        // Assert
        assertNotNull(result);
        assertEquals("01001-000", result.cep());
        assertEquals("Praça da Sé", result.street());
    }

    @Test
    void whenInvalidCep_thenThrowException() {
        // Arrange
        String invalidCep = "00000000";
        when(restTemplate.getForEntity(anyString(), eq(AddressDTO.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.NOT_FOUND));

        // Act & Assert
        assertThrows(CepNotFoundException.class, () -> {
            viaCepService.getCepInfo(invalidCep);
        });
    }
}