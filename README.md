# 🚀 TaskFlow - Smart Task Management System

A premium full-stack task management application built using **React, Spring Boot, MySQL, and JWT Authentication**.
TaskFlow helps teams assign, track, and manage tasks efficiently with role-based dashboards for Team Leads and Employees.

---

# ✨ Features

## 🔐 Authentication

* JWT-based secure login
* Role-based access control
* Persistent login using localStorage

## 👨‍💼 Team Lead Features

* Create and assign tasks
* View all employee tasks
* Filter tasks by status
* Search tasks instantly
* Monitor task completion

## 👩‍💻 Employee Features

* View assigned tasks
* Mark tasks as completed
* Filter and search tasks
* View task priority

## 🎨 UI Features

* Premium dark SaaS dashboard UI
* Glassmorphism design
* Responsive layout
* Toast notifications
* Animated cards and modals

---

# 🛠️ Tech Stack

## Frontend

* React + Vite
* CSS3
* Axios
* React Hot Toast
* Lucide React Icons

## Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

## Database

* MySQL

---

# 📸 Screenshots

## Login Page

<img width="1913" height="1019" alt="image" src="https://github.com/user-attachments/assets/92a1a68e-465e-44af-a0f1-6b6536c3b507" />


## Team Lead Dashboard

<img width="1919" height="1018" alt="image" src="https://github.com/user-attachments/assets/f38692a1-73f8-4ac9-ade0-4ea0491b1c09" />


## Employee Dashboard

<img width="1910" height="999" alt="image" src="https://github.com/user-attachments/assets/73fe18dd-8b0e-42e4-a4c9-6c283a944ecb" />


## Create Task Modal

<img width="1912" height="1005" alt="image" src="https://github.com/user-attachments/assets/2f795eba-cb4c-4a55-919b-ab64a1c9dafb" />


---

# 📂 Project Structure

## Frontend

```bash
task-frontend/
├── src/
├── components/
├── App.jsx
├── api.js
└── App.css
```

## Backend

```bash
taskmanagement-backend/
├── controller/
├── entity/
├── repository/
├── security/
├── service/
└── TaskmanagementApplication.java
```

---

# ⚙️ Installation

## Frontend Setup

```bash
cd task-frontend
npm install
npm run dev
```

## Backend Setup

```bash
cd taskmanagement-backend
mvn spring-boot:run
```

---

# 🗄️ Database Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/taskflow
spring.datasource.username=root
spring.datasource.password=yourpassword
```

---

# 🔑 Demo Credentials

## Team Lead

```text
Employee ID: 101
Password: 1234
```

## Employee

```text
Employee ID: 102
Password: 1234
```

---

# 📌 API Endpoints

## Authentication

* POST `/api/login`

## Tasks

* GET `/api/tasks`
* POST `/api/tasks`
* PUT `/api/tasks/{id}/complete`

## Employees

* GET `/api/employees`
* GET `/api/employees/team/{teamId}`

---

# 🚀 Future Improvements

* Dark/Light theme toggle
* Task deadlines
* Notifications
* Drag and drop task board
* Team analytics dashboard

---
# 🚀 Live Demo

Frontend: [TaskFlow Live](https://task-frontend-ten-nu.vercel.app)

Backend API: [Backend API](https://taskflow-backend-brgd.onrender.com)

# 👩‍💻 Developed By

**Devadharshini**
ECE Student | Full Stack Java Developer

GitHub: https://github.com/devadharshini-fs
