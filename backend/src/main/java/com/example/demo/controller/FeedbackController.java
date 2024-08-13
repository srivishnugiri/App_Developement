package com.example.demo.controller;

import com.example.demo.model.Feedback;
import com.example.demo.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

  @Autowired
  private FeedbackService feedbackService;

  @GetMapping
  public List<Feedback> getAllFeedback() {
    return feedbackService.getAllFeedback();
  }

  @GetMapping("/{id}")
  public ResponseEntity<Feedback> getFeedbackById(@PathVariable Long id) {
    Optional<Feedback> feedbackOptional = feedbackService.getFeedbackById(id);
    if (feedbackOptional.isPresent()) {
      return ResponseEntity.ok(feedbackOptional.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  public Feedback createFeedback(@RequestBody Feedback feedback) {
    return feedbackService.createFeedback(feedback);
  }

  @PutMapping("/{id}")
  public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedbackDetails) {
    Feedback updatedFeedback = feedbackService.updateFeedback(id, feedbackDetails);
    if (updatedFeedback != null) {
      return ResponseEntity.ok(updatedFeedback);
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
    feedbackService.deleteFeedback(id);
    return ResponseEntity.noContent().build();
  }
}
