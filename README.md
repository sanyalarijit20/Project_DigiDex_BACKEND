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

### Clone the Repository
```bash
git clone https://github.com/your-username/project-digiDex-backend.git
cd project-digiDex-backend
```

## Install Dependencies 
```
npm install
```
# Create Environment Variables 
Create a .env file in the root directory and add the following 
```
MONGODB_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=3000
```

# Start the server 
```
npm start
# or
node server.js
```

# Deployment on Vercel 
This project is pre-configured for immediate deployment 
- **Create vercel.json**
Add this file in the root directory
```
{
  "version": 2,
  "builds": [
    {
      "src": "./server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/server.js"
    }
  ]
}
```
- **Modify server.js**
Ensure your server.js exports the app for Vercel:
```
module.exports = app;
```
- **Set Environment Variables on Vercel**
In your Vercel dashboard:
```
MONGODB_URI = your MongoDB Atlas URI

JWT_SECRET = your secret key
```
Then deploy directly with:
```
vercel
```
# API Endpoints 

- **Authentication**
POST /api/auth/register

Description: Registers a new user.
Request Body:
```
{
  "username": "ash_ketchum",
  "password": "yourpassword"
}
```
Response (200 OK):
```
{
  "token": "your_jwt_token"
}
```
POST /api/auth/login

Description: Logs in an existing user.
Request Body:
```
{
  "username": "ash_ketchum",
  "password": "yourpassword"
}
```
Response (200 OK):
```
{
  "token": "your_jwt_token"
}
```
- **Pokemon**
GET /api/pokemon/:name

Description: Retrieves aggregated data for a Pokémon by name or ID.
Response (200 OK):
```
{
  "id": 25,
  "name": "pikachu",
  "imageUrl": "https://raw.githubusercontent.com/.../pikachu.png",
  "info": {
    "height": 4,
    "weight": 60,
    "types": ["electric"],
    "description": "When several of these POKéMON gather..."
  },
  "stats": [
    { "name": "hp", "value": 35 },
    { "name": "attack", "value": 55 }
  ],
  "moves": ["mega-punch", "pay-day"],
  "typeData": [...]
}
```
# User Profile (Protected)
All /api/profile routes require an Authorization header:
```
Bearer <your_jwt_token>
```

GET /api/profile

Description: Retrieves the authenticated user's complete profile.
Response (200 OK):
```
{
  "_id": "68fe2298bcaeaf4c8ee5a98e",
  "username": "sanyalarijit20",
  "folders": [
    {
      "name": "My First Collection",
      "pokemons": ["pikachu", "diglett"],
      "_id": "68fe2298bcaeaf4c8ee5a98f"
    }
  ],
  "badges": [
    {
      "name": "Boulder Badge",
      "gym": "Pewter City Gym",
      "_id": "68fe2e0b0d2f28535256b449",
      "collectedAt": "2025-10-26T14:19:55.321Z"
    }
  ]
}
```
DELETE /api/profile

Description: Deletes the authenticated user's account.
Response (200 OK):
```
{
  "message": "User account deleted successfully"
}
```
# Profile Collections (Protected)
POST /api/profile/pokemons

Description: Adds a Pokémon to the user's collection (defaults to first folder).
Request Body:
```
{
  "folderId": "68fe2298bcaeaf4c8ee5a98f",
  "pokemonName": "mewtwo"
}
```
Response (200 OK):
```
{
  "_id": "68fe2298bcaeaf4c8ee5a98e",
  "username": "sanyalarijit20",
  "folders": [
    {
      "name": "My First Collection",
      "pokemons": ["pikachu", "diglett", "mewtwo"],
      "_id": "68fe2298bcaeaf4c8ee5a98f"
    }
  ]
}
```
DELETE /api/profile/pokemons

Description: Removes a Pokémon from the user's collection.
Request Body:
```
{
  "folderId": "68fe2298bcaeaf4c8ee5a98f",
  "pokemonName": "diglett"
}
```
Response (200 OK):
```
(Updated user profile returned)
```
# Profile Badges (Protected)
POST /api/profile/badges

Description: Adds a new badge to the user's profile.
Request Body:
```
{
  "name": "Cascade Badge",
  "gym": "Cerulean City Gym"
}
```
Response (200 OK):
```
(Updated user profile returned)
```
DELETE /api/profile/badges/:badgeId

Description: Deletes a badge by its unique ID.
Example:
```
DELETE /api/profile/badges/68fe2e0b0d2f28535256b449
```
Response (200 OK):
```
(Updated user profile returned)
```

# License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this project with proper attribution.

# Author
**Arijit Sanyal**
Computer Engineering Student | Backend Developer