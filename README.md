# 🧩 Project DigiDex - Backend

**DigiDex** is a robust and scalable backend for a modern **Pokédex application**.  
It provides a comprehensive set of APIs to manage users, search for Pokémon, and maintain personal collections of captured Pokémon and collected badges — enabling developers to build a full-featured Pokédex and user profile system with ease.

---

## 🚀 Features

- **User Authentication** – Secure registration and login using **JWT (JSON Web Tokens)** and password hashing.  
- **Pokémon Data API** – Fetches detailed, aggregated Pokémon data via the **public PokeAPI**.  
- **Profile Management** – Full CRUD operations for user profiles, Pokémon collections, and badges.  
- **Scalable Architecture** – Built with **Node.js**, **Express**, and **MongoDB Atlas** for high performance.  
- **Vercel Ready** – Includes a `vercel.json` configuration for immediate deployment.

---

## 🛠️ Technologies Used

| Technology | Description |
|-------------|-------------|
| **Node.js** | JavaScript runtime built on Chrome’s V8 engine |
| **Express** | Minimal and flexible Node.js web framework |
| **MongoDB (Atlas)** | Cloud-native NoSQL database for scalability |
| **Mongoose** | Elegant MongoDB object modeling for Node.js |
| **JWT** | Compact, URL-safe token-based authentication |
| **bcryptjs** | Library for password hashing and verification |
| **axios** | Promise-based HTTP client for external requests |
| **cors** | Enables Cross-Origin Resource Sharing |
| **dotenv** | Loads environment variables from `.env` |
| **Vercel** | Serverless deployment and hosting platform |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/project-digiDex-backend.git
cd project-digiDex-backend
```

## Install Dependencies
```
npm install
```

## Create Environment Variables
```
MONGODB_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=3000
```
## Start the Server 
```
npm start
# or
node server.js
```

## Deployment on Vercel 
 
##
