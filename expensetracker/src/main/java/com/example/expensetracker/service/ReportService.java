package com.example.expensetracker.service;

import com.example.expensetracker.model.Expense;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import java.awt.Color;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

@Service
public class ReportService {

    public ByteArrayInputStream generateExpenseReport(List<Expense> expenses) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font headerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Expense Report", headerFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);

            PdfPTable table = new PdfPTable(5);
            table.setWidthPercentage(100);
            table.setWidths(new int[]{3, 2, 2, 2, 4});

            Stream.of("Title", "Amount", "Category", "Date", "Notes").forEach(col -> {
                PdfPCell cell = new PdfPCell(new Phrase(col));
                cell.setBackgroundColor(Color.LIGHT_GRAY);
                table.addCell(cell);
            });

            for (Expense expense : expenses) {
                table.addCell(expense.getTitle());
                table.addCell(String.valueOf(expense.getAmount()));
                table.addCell(expense.getCategory());
                table.addCell(expense.getDate().toString());
                table.addCell(expense.getNotes());
            }

            document.add(table);
            document.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
