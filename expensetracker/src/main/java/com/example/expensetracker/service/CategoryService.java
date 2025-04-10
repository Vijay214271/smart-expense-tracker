package com.example.expensetracker.service;

import com.example.expensetracker.model.Category;
import com.example.expensetracker.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository repository;

    public CategoryService(CategoryRepository repository) {
        this.repository = repository;
    }

    public Category addCategory(Category category) {
        if (!repository.existsByName(category.getName())) {
            return repository.save(category);
        }
        return category; // or throw an error
    }

    public List<Category> getAllCategories() {
        return repository.findAll();
    }
}
