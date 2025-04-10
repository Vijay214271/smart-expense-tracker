package com.example.expensetracker.controller;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;
import com.example.expensetracker.service.ReportService;

import jakarta.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

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
    public Expense create(@RequestBody Expense expense) {
        return service.save(expense);
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
