
# 💸 Smart Expense Tracker

A full-stack expense tracking application with powerful features like PDF report generation, category filters, and monthly insights — built with **React**, **Spring Boot**, and **H2**.

![Smart Expense Tracker Demo](https://smart-expense-tracker-theta.vercel.app/preview.png)

## ✨ Features

- 📝 Add, delete, and manage daily expenses
- 📊 Monthly reports with dynamic charts
- 🗃️ Filter expenses by category and date range
- 📄 Download PDF reports of expenses
- 📦 Backend with Spring Boot + MySQL
- 💾 Fallback to localStorage for offline access
- ⚙️ Clean UI, responsive design
- 🔐 CORS configured for smooth frontend-backend communication

---

## 📂 Project Structure

```
smart-expense-tracker/
├── expensetracker/       # Spring Boot Backend (Deployed on Render)
├── frontend/             # React Frontend (Deployed on Vercel)
```

---

## 🚀 Live Demo

🔗 [Frontend](https://smart-expense-tracker-theta.vercel.app)  
🔗 [Backend API](https://smart-expense-tracker-backend.onrender.com/api/expenses)

---

## 🛠️ Tech Stack

### Frontend:
- React + Vite
- Axios
- Chart.js
- Styled Components / CSS Modules
- Vercel for deployment

### Backend:
- Spring Boot
- H2
- JPA / Hibernate
- CORS Configuration
- Render for deployment

---

## 🔧 How to Run Locally

### 1. Backend (Spring Boot)

```bash
cd expensetracker
./mvnw clean install
./mvnw spring-boot:run
```

Make sure MySQL is running and configured in `application.properties`.

### 2. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Create a `.env` file in frontend with:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## 📄 PDF Report

You can download a monthly PDF report by clicking **"📄 Download PDF Report"** in the **Reports** tab. This is generated on the backend and sent as a downloadable file.

---

## 🧼 Clear Data

Use the **🗑 Clear Local Data** button to reset the backend data and localStorage fallback cache.

---

## 📷 Screenshots

> _You can add screenshots of dashboard, charts, and PDF report here for visual appeal._

---

## 📌 Future Improvements

- User Authentication (JWT)
- Export to Excel
- Recurring Expenses
- Mobile App version (React Native)

---

## 🤝 Contributing

Contributions are welcome! Please fork this repo and submit a PR.

---
