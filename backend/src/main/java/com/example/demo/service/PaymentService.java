package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.PaymentModel;
import com.example.demo.repository.paymentRepository;

@Service
public class PaymentService {

    @Autowired
    private paymentRepository paymentRepository;

    public PaymentModel saveMessage(PaymentModel paymentModel) {
        return paymentRepository.save(paymentModel);
    }

    public List<PaymentModel> getAllMessages() {
        return paymentRepository.findAll();
    }

    public PaymentModel getMessageById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public PaymentModel updateMessage(Long id, PaymentModel paymentModel) {
        Optional<PaymentModel> existingMessageOpt = paymentRepository.findById(id);
        if (existingMessageOpt.isPresent()) {
            PaymentModel existingMessage = existingMessageOpt.get();
            existingMessage.setCardholder_name(paymentModel.getCardholder_name());
            existingMessage.setCard_number(paymentModel.getCard_number());
            existingMessage.setExpiry_date(paymentModel.getExpiry_date());
            existingMessage.setCvv(paymentModel.getCvv());
            existingMessage.setAmount(paymentModel.getAmount());
            return paymentRepository.save(existingMessage);
        } else {
            return null;
        }
    }

    public void deleteMessage(Long id) {
        paymentRepository.deleteById(id);
    }
}