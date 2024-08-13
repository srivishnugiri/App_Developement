package com.example.demo.service;

import com.example.demo.model.Feedback;
import com.example.demo.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeedbackService {

  @Autowired
  private FeedbackRepository feedbackRepository;

  public List<Feedback> getAllFeedback() {
    return feedbackRepository.findAll();
  }

  public Optional<Feedback> getFeedbackById(Long id) {
    return feedbackRepository.findById(id);
  }

  public Feedback createFeedback(Feedback feedback) {
    return feedbackRepository.save(feedback);
  }

  public Feedback updateFeedback(Long id, Feedback feedbackDetails) {
    Optional<Feedback> feedbackOptional = feedbackRepository.findById(id);
    if (feedbackOptional.isPresent()) {
      Feedback feedback = feedbackOptional.get();
      feedback.setName(feedbackDetails.getName());
      feedback.setDescription(feedbackDetails.getDescription());
      return feedbackRepository.save(feedback);
    }
    return null;
  }

  public void deleteFeedback(Long id) {
    feedbackRepository.deleteById(id);
  }
}
