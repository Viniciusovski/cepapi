package com.bacelar.cepapi.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AddressDTO(
        @JsonProperty("cep") String cep,
        @JsonProperty("logradouro") String street,
        @JsonProperty("complemento") String complement,
        @JsonProperty("bairro") String neighborhood,
        @JsonProperty("localidade") String city,
        @JsonProperty("uf") String state,
        @JsonProperty("ibge") String ibgeCode,
        @JsonProperty("gia") String gia,
        @JsonProperty("ddd") String ddd,
        @JsonProperty("siafi") String siafi
) {
    // Método para verificar se o DTO está vazio (quando o CEP não existe)
    public boolean isEmpty() {
        return cep == null || cep.isBlank();
    }
}