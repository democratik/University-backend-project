package com.example.demo.repository;

import com.example.demo.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    List<Contact> findByLastName(String lastName);

    @Query("SELECT c FROM Contact c WHERE c.email LIKE %:domain")
    List<Contact> findByEmailDomain(String domain);

    @Query(value = "SELECT * FROM contacts WHERE phone_number LIKE %:phonePart%", nativeQuery = true)
    List<Contact> findByPhonePartNative(String phonePart);
}