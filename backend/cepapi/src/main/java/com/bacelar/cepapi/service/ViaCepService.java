package com.bacelar.cepapi.service;

import com.bacelar.cepapi.dto.AddressDTO;
import com.bacelar.cepapi.exception.CepNotFoundException;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

@Service
public class ViaCepService {
    private final RestTemplate restTemplate;

    public ViaCepService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public AddressDTO getCepInfo(String cep) {
        String url = "https://viacep.com.br/ws/" + cep + "/json/";

        try {
            ResponseEntity<AddressDTO> response = restTemplate.getForEntity(url, AddressDTO.class);
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return response.getBody();
            }
        } catch (HttpClientErrorException | HttpServerErrorException e) {
            throw new CepNotFoundException("CEP não encontrado: " + cep);
        }
        throw new CepNotFoundException("CEP inválido: " + cep);
    }
}
