package com.bacelar.cepapi.controller;

import com.bacelar.cepapi.dto.AddressDTO;
import com.bacelar.cepapi.service.ViaCepService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cep")
public class CepController {

    private final ViaCepService viaCepService;

    public CepController(ViaCepService viaCepService) {
        this.viaCepService = viaCepService;
    }

    @GetMapping("/{cep}")
    public AddressDTO getAddressByCep(@PathVariable String cep) {
        return viaCepService.getCepInfo(cep);
    }
}