# 🛒 Full-Stack E-Commerce Web Application

## 🇩🇪 Kurzbeschreibung

Dieses Projekt ist eine Full-Stack E-Commerce Webanwendung, die im Rahmen meiner Weiterbildung im Bereich Webentwicklung entstanden ist.  
Sie basiert auf Node.js, Express und MongoDB und folgt einer klar strukturierten MVC-Architektur.  
Der Fokus lag auf der praktischen Umsetzung von Backend-Logik, Datenbankanbindung und dynamischen Webanwendungen.

---

## 🚀 Overview

This project is a full-stack e-commerce web application developed as part of my transition from industrial automation (Siemens PCS7) to modern web development.

It demonstrates the implementation of backend architecture, database integration, and dynamic web application behavior using Node.js, Express, and MongoDB.

---

## 🧰 Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Architecture:** MVC (Model-View-Controller)
- **Concepts:** Middleware, Authentication, Sessions, CSRF Protection

---

## 📦 Features

- Dynamic product listing and product detail pages
- Shopping cart functionality
- Order handling and management
- User authentication (login & register)
- Admin functionality for managing products
- Server-side rendering with dynamic content
- Structured routing and middleware usage

---

## 🧠 Architecture

The application follows a structured **MVC pattern**:

- **Models** → Handle data logic and MongoDB interaction  
- **Controllers** → Manage application logic and request flow  
- **Views** → Render dynamic content to the user  
- **Routes** → Define endpoints and navigation  
- **Middleware** → Handle authentication, validation, and errors  

This structure ensures scalability, maintainability, and separation of concerns.

---

## 🔐 Backend Highlights

- Middleware-based architecture
- Session-based authentication
- CSRF protection implementation
- Organized controller structure (products, users, orders, admin)
- Clean separation between routing and business logic

---

## 🛠️ Setup & Installation

1. Clone the repository:

```bash
git clone git@github.com:ManuelZaf/Milestone-Project.git
```
```bash
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env file:
```bash
MONGO_URI=your_mongodb_connection
SESSION_SECRET=your_secret
```

4. Start the application:
```bash
npm start
```

5. Open in browser:
```bash
http://localhost:3000
```