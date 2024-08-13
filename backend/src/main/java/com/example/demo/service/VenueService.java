package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Venue;
import com.example.demo.repository.VenueRepository;

@Service
public class VenueService {

    @Autowired
    private VenueRepository adminRepository;

    public List<Venue> getAllAdmins() {
        return adminRepository.findAll();
    }

    public Optional<Venue> getAdminById(Long id) {
        return adminRepository.findById(id);
    }

    public Venue saveAdmin(Venue admin) {
        return adminRepository.save(admin);
    }
  public Venue updateVenue(Long id, Venue venue) {
    if (adminRepository.existsById(id)) {
        venue.setId(id); // Make sure the ID is set for update
        return adminRepository.save(venue);
    }
    return null;
}

    public void deleteAdmin(Long id) {
        adminRepository.deleteById(id);
    }
}