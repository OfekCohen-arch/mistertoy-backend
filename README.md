# MisterToy - Backend ⚙️

A Node.js-based REST API server for managing toy data.
This backend serves the MisterToy frontend application.

---

## 🚀 Features

- RESTful API
- CRUD operations for toys
- JSON-based data storage
- Modular architecture
- Middleware support
- Error handling
- CORS enabled

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript (ES6+)
- File-based JSON database
- REST API
- Middleware

---

## 📦 Installation

1. Clone the repository:
   
2. Navigate to the project folder:
   cd mistertoy-backend
   
3. Install dependencies:
   npm install

4.Run the server:
   npm start

5. Server will run on:
   http://localhost:3030

🔗 Frontend Repository

This backend connects to the React frontend:

👉 https://github.com/OfekCohen-arch/mistertoy-frontend

📁 Project Structure

server/
 ├─ api/
 │   └─ toy/
 ├─ services/
 ├─ middlewares/
 ├─ config/
 ├─ server.js
 └─ app.js

📡 API Endpoints
Method	Endpoint	Description
GET	/api/toy	Get all toys
GET	/api/toy/:id	Get toy by ID
POST	/api/toy	Create new toy
PUT	/api/toy/:id	Update toy
DELETE	/api/toy/:id	Delete toy

💡 What I Learned

Building RESTful APIs

Working with Express.js

Handling middleware

Server-side validation

Error handling

API & Frontend integration

Backend architecture

📌 Future Improvements

Authentication & authorization

Database integration (MongoDB / SQL)

Unit & integration tests

Logging system

Deployment

Environment variables

👨‍💻 Author

Developed by Ofek Cohen

GitHub: https://github.com/OfekCohen-arch
```bash
git clone https://github.com/OfekCohen-arch/mistertoy-backend.git
