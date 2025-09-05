# 📝 Omnify Blog Platform

A full-stack **Blog Management Platform** built with **React + Vite (frontend)**, **Spring Boot (backend)**, and **MongoDB (database)**.  
It allows users to **sign up, log in, create, edit, delete, and view blog posts**.  

🔗 **Live Demo:** [https://omnify-red.vercel.app/](https://omnify-red.vercel.app/)

---

## 🚀 Features

✅ **Authentication & Authorization**
- User registration & login with JWT auth  
- Authenticated routes & protected APIs  

✅ **Blog Management**
- Create, update, delete blog posts (only your own)  
- View all blogs from all users  
- Pagination support for browsing blogs  

✅ **User Experience**
- Clean UI with **React + TailwindCSS**  
- Toast notifications for actions (create, update, delete, error handling)  
- Markdown-like formatting support in blog content  

✅ **Deployment Ready**
- Frontend deployed on **Vercel**  
- Backend hosted on **AWS EC2**  
- Reverse proxy via `vercel.json` for seamless API integration  

---

## 🛠️ Tech Stack

### **Frontend**
- ⚡ React (Vite + TypeScript)  
- 🎨 TailwindCSS + ShadCN UI  
- 🔐 Context API for Auth Management  
- 📡 Axios (with interceptor for JWT handling)  
- 🚦 React Router v6  

### **Backend**
- ☕ Spring Boot (Java)  
- 🗄 MongoDB (NoSQL database)  
- 🔑 JWT Authentication  
- 🌐 REST APIs  

### **Deployment**
- 🌍 Frontend: Vercel  
- ☁ Backend: AWS EC2  
- 📦 Database: MongoDB Atlas   

----


## ⚙️ Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Al0kKumar/omnify
cd omnify
```

### 2️⃣ Run MongoDB with Docker
```
docker-compose up -d

```

### 3️⃣ Backend Setup
```
cd backend
```
- Configure application.properties
```
spring.data.mongodb.uri=mongodb://localhost:27017/omnify
server.port=8080
```

- Install dependencies and run the backend
```
./gradlew 
./gradlew bootRun
```

### 4️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```

- configure .env file in frontend
```
VITE_API_URL=http://localhost:8080/api

```

---

## 📡 API Endpoints

### 🔑 Auth

- **POST** `/api/auth/signup`  
  → Register user  

- **POST** `/api/auth/login`  
  → Login & receive JWT  



### 📝 Blogs

- **GET** `/api/blogs?page=0&size=5`  
  → Get paginated blogs  

- **GET** `/api/blogs/{id}`  
  → Get single blog by ID  

- **POST** `/api/blogs` *(auth required)*  
  → Create a new blog  

- **PATCH** `/api/blogs/{id}` *(only author)*  
  → Update blog  

- **DELETE** `/api/blogs/{id}` *(only author)*  
  → Delete blog  

---


## 📜 License

This project is licensed under the **MIT License**.  

