package com.example.demo.service;

import com.example.demo.model.Contact;
import com.example.demo.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReportService {

    private final ContactRepository contactRepository;

    public ByteArrayInputStream generateExcelReport() throws IOException {
        List<Contact> contacts = contactRepository.findAll();
        log.info("Generowanie raportu Excel dla {} kontaktów", contacts.size());

        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            Sheet sheet = workbook.createSheet("Kontakty");

            Row headerRow = sheet.createRow(0);
            String[] columns = {"ID", "Imię", "Nazwisko", "Email", "Telefon", "Adres"};
            
            CellStyle headerStyle = workbook.createCellStyle();
            Font font = workbook.createFont();
            font.setBold(true);
            headerStyle.setFont(font);

            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            int rowIdx = 1;
            for (Contact contact : contacts) {
                Row row = sheet.createRow(rowIdx++);
                row.createCell(0).setCellValue(contact.getId());
                row.createCell(1).setCellValue(contact.getFirstName());
                row.createCell(2).setCellValue(contact.getLastName());
                row.createCell(3).setCellValue(contact.getEmail());
                row.createCell(4).setCellValue(contact.getPhoneNumber());
                row.createCell(5).setCellValue(contact.getAddress());
            }

            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        }
    }
}