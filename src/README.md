# WOMEN SAFETY APPLICATION SYSTEM (SHE-SHIELD)

A production-level full-stack web application designed to provide security for women through real-time SOS alerts and emergency location tracking.

## 🚀 Tech Stack
- **Backend:** Java 21, Spring Boot 3.2, Spring Security, MySQL, Hibernate.
- **Frontend:** React 18, Vite, Tailwind CSS, Axios, Lucide React.
- **Security:** JWT (JSON Web Tokens), BCrypt Password Encryption.

## 🛠️ Installation & Setup

### 1. Database Setup
- Open MySQL and create database: `women_safety_db`.
- Run the script found in `database/schema.sql`.

### 2. Backend Setup
- Navigate to `backend/`.
- Update `src/main/resources/application.properties` with your MySQL password.
- Run command: `mvn clean install`
- Run the Spring Boot application: `mvn spring-boot:run`

### 3. Frontend Setup
- Navigate to `frontend/`.
- Run command: `npm install`
- Run development server: `npm run dev`
- Open `http://localhost:5173` in your browser.

## 🔐 Key Features
- **SOS Panic Button:** Instantly captures latitude/longitude and sends to server.
- **Admin Command Center:** Admins can view all alerts on a live dashboard.
- **JWT Auth:** Secure user sessions.
- **Modern UI:** Built with Tailwind CSS for mobile responsiveness.