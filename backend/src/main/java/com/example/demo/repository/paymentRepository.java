package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.PaymentModel;

public interface paymentRepository extends JpaRepository<PaymentModel, Long> {
}