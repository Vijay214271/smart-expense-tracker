package com.example.expensetracker.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.ReportService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "*")
public class ExpenseController {
    private final ExpenseService service;
    private final ReportService reportService;

    public ExpenseController(ExpenseService service,ReportService reportService) {
        this.service = service;
        this.reportService = reportService;
    }

    @PostMapping
public ResponseEntity<?> create(@RequestBody Expense expense) {
    if (expense.getDate().isAfter(LocalDate.now())) {
        return ResponseEntity.badRequest().body("Expense date cannot be in the future.");
    }

    Expense saved = service.save(expense);
    return ResponseEntity.ok(saved);
}


    @GetMapping
    public List<Expense> getAll() {
        return service.getAll();
    }

    @GetMapping("/range")
    public List<Expense> getByDateRange(@RequestParam String start, @RequestParam String end) {
        return service.getByDateRange(LocalDate.parse(start), LocalDate.parse(end));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @GetMapping("/pdf")
    public void downloadPdfReport(HttpServletResponse response) throws IOException {
        var expenses = service.getAll(); // or add a filter for date range
        var pdfStream = reportService.generateExpenseReport(expenses);

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=expense_report.pdf");
        response.getOutputStream().write(pdfStream.readAllBytes());
        response.getOutputStream().flush();
    }

    @GetMapping("/category")
    public List<Expense> getByCategory(@RequestParam String name) {
        return service.getByCategory(name);
    }

    @DeleteMapping("/reset")
    public void resetAllData() {
        service.deleteAll();
    }

}
