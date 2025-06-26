package com.bacelar.cepapi.repository;

import com.bacelar.cepapi.model.Address;
import com.bacelar.cepapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByUser(User user);
    List<Address> findByUser_Id(Long userId);
    boolean existsByCepAndUser_Id(String cep, Long userId);
}