package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactRepository contactRepository;
    private final SimpMessagingTemplate messagingTemplate;

    public List<Contact> getAllContacts() {
        log.info("Wywołanie metody: pobranie wszystkich kontaktów");
        return contactRepository.findAll();
    }

    public Contact getContactById(Long id) {
        log.info("Wyszukiwanie kontaktu o ID: {}", id);
        return contactRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nie znaleziono kontaktu"));
    }

    public Contact createContact(Contact contact) {
        log.info("Tworzenie nowego kontaktu: {} {}", contact.getFirstName(), contact.getLastName());
        Contact savedContact = contactRepository.save(contact);

        String message = "Nowy kontakt został dodany: " + savedContact.getFirstName() + " " + savedContact.getLastName();
        messagingTemplate.convertAndSend("/topic/contacts", message);
        
        return savedContact;
    }

    public void deleteContact(Long id) {
        log.warn("Usuwanie kontaktu o ID: {}", id);
        contactRepository.deleteById(id);
    }

    public List<Contact> searchByLastName(String lastName) {
        return contactRepository.findByLastName(lastName);
    }

    public List<Contact> searchByEmailDomain(String domain) {
        return contactRepository.findByEmailDomain(domain);
    }
}