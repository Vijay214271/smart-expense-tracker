package com.example.expensetracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;

@Service
public class ExpenseService {
    private final ExpenseRepository repository;
    private final AutoCategorizationService categorizationService;


    public ExpenseService(ExpenseRepository repository) {
        this.repository = repository;
        this.categorizationService = new AutoCategorizationService();
    }

    public Expense save(Expense expense) {
        // Prevent future dates
        if (expense.getDate().isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("Expense date cannot be in the future.");
        }
    
        // Auto-categorize if needed
        if (expense.getCategory() == null || expense.getCategory().isBlank()) {
            String category = categorizationService.categorize(expense.getTitle(), expense.getNotes());
            expense.setCategory(category);
        }
    
        return repository.save(expense);
    }
    

    public List<Expense> getAll() {
        return repository.findAll();
    }

    public List<Expense> getByDateRange(LocalDate start, LocalDate end) {
        return repository.findByDateBetween(start, end);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
    public List<Expense> getByCategory(String name) {
        return repository.findByCategory(name);
    }

    public void deleteAll() {
        repository.deleteAll();
    }
    
}
