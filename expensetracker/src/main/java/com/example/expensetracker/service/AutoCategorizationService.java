package com.example.expensetracker.service;

import org.springframework.stereotype.Service;

@Service
public class AutoCategorizationService {

    public String categorize(String title, String notes) {
        String content = (title + " " + notes).toLowerCase();

        if (content.contains("uber") || content.contains("ola") || content.contains("taxi")) {
            return "Transport";
        } else if (content.contains("grocery") || content.contains("supermarket") || content.contains("bigbasket")) {
            return "Groceries";
        } else if (content.contains("electricity") || content.contains("water bill") || content.contains("gas")) {
            return "Utilities";
        } else if (content.contains("movie") || content.contains("netflix") || content.contains("spotify")) {
            return "Entertainment";
        } else if (content.contains("pizza") || content.contains("restaurant") || content.contains("food")) {
            return "Food";
        } else if (content.contains("hospital") || content.contains("medicine") || content.contains("doctor")) {
            return "Healthcare";
        }

        return "Others";
    }
}
