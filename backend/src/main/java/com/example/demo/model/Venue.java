package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Venue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String totalmembers;
    private String arrival;
    private String departure;
    private String event;
    private String number;
    private String date;
    private String venueName;
    private String venuePrice;
    private String venueImage;
    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getTotalmembers() {
        return totalmembers;
    }
    public void setTotalmembers(String totalmembers) {
        this.totalmembers = totalmembers;
    }
    public String getArrival() {
        return arrival;
    }
    public void setArrival(String arrival) {
        this.arrival = arrival;
    }
    public String getDeparture() {
        return departure;
    }
    public void setDeparture(String departure) {
        this.departure = departure;
    }
    public String getEvent() {
        return event;
    }
    public void setEvent(String event) {
        this.event = event;
    }
    public String getNumber() {
        return number;
    }
    public void setNumber(String number) {
        this.number = number;
    }
    public String getDate() {
        return date;
    }
    public void setDate(String date) {
        this.date = date;
    }
    public String getVenueName() {
        return venueName;
    }
    public void setVenueName(String venueName) {
        this.venueName = venueName;
    }
    public String getVenuePrice() {
        return venuePrice;
    }
    public void setVenuePrice(String venuePrice) {
        this.venuePrice = venuePrice;
    }
    public String getVenueImage() {
        return venueImage;
    }
    public void setVenueImage(String venueImage) {
        this.venueImage = venueImage;
    }

}