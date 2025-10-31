Project DigiDex - BackendDigiDex is a robust and scalable backend for a modern Pokédex application. It provides a comprehensive set of APIs to manage users, search for Pokémon, and maintain personal collections of "captured" Pokémon and "collected" badges, enabling developers to build a full-featured Pokédex and user profile system with ease.FeaturesUser Authentication: Secure user registration and login using JWT (JSON Web Tokens) and password hashing.Pokémon Data API: A dedicated endpoint that fetches detailed, aggregated data for any Pokémon by name from the public PokeAPI.Profile Management: Full CRUD operations for a user's personal profile, including adding/deleting Pokémon to collections and adding/deleting gym badges.Scalable Architecture: Built with Node.js, Express, and MongoDB (Atlas), ensuring high performance and scalability.Vercel Ready: Includes a vercel.json configuration for immediate, hassle-free deployment.Technologies UsedNode.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.Express: A minimal and flexible Node.js web application framework.MongoDB (Atlas): A cloud-native NoSQL database providing high performance and scalability.Mongoose: An elegant MongoDB object modeling tool for Node.js.JWT (JSON Web Tokens): A compact, URL-safe means of representing claims for secure authentication.bcryptjs: A library to help you hash and compare passwords.axios: A promise-based HTTP client for making requests to the external PokeAPI.cors: A package for enabling Cross-Origin Resource Sharing.dotenv: A module that loads environment variables from a .env file into process.env.Vercel: A cloud platform for serverless deployment and static sites.Installation and SetupClone the repository:git clone [https://github.com/your-username/project-digiDex-backend.git](https://github.com/your-username/project-digiDex-backend.git)
Install dependencies:npm install
Create a .env file in the root directory and add the following environment variables:MONGODB_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_jwt_secret>
PORT=3000
Start the server:npm start
(Or use node server.js)Deployment on VercelThis project is configured for immediate deployment on Vercel.Create a vercel.json file in the root directory with the following content:{
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
Modify your server.js file to export the app for Vercel (see our chat history for the code).Deploy to Vercel and set the MONGODB_URI and JWT_SECRET environment variables in the Vercel project settings.API EndpointsAuthenticationPOST /api/auth/registerDescription: Registers a new user.Request Body:{
  "username": "ash_ketchum",
  "password": "yourpassword"
}
Response (200 OK):{
  "token": "your_jwt_token"
}
POST /api/auth/loginDescription: Logs in an existing user.Request Body:{
  "username": "ash_ketchum",
  "password": "yourpassword"
}
Response (200 OK):{
  "token": "your_jwt_token"
}
PokémonGET /api/pokemon/:nameDescription: Retrieves all aggregated data for a single Pokémon by its name or ID.Response (200 OK):{
  "id": 25,
  "name": "pikachu",
  "imageUrl": "[https://raw.githubusercontent.com/.../pikachu.png](https://raw.githubusercontent.com/.../pikachu.png)",
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
  "moves": ["mega-punch", "pay-day", ...],
  "typeData": [ ... ]
}
User Profile (Protected)All /api/profile routes require an Authorization header: Bearer <your_jwt_token>GET /api/profileDescription: Retrieves the complete profile for the authenticated user.Response (200 OK):{
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
DELETE /api/profileDescription: Deletes the authenticated user's entire account.Response (200 OK):{
  "message": "User account deleted successfully"
}
Profile Collections (Protected)POST /api/profile/pokemonsDescription: Adds a Pokémon to the user's collection (defaults to first folder).Request Body:{
  "folderId": "68fe2298bcaeaf4c8ee5a98f",
  "pokemonName": "mewtwo"
}
Response (200 OK): (Returns the updated user profile){
  "_id": "68fe2298bcaeaf4c8ee5a98e",
  "username": "sanyalarijit20",
  "folders": [
    {
      "name": "My First Collection",
      "pokemons": ["pikachu", "diglett", "mewtwo"],
      "_id": "68fe2298bcaeaf4c8ee5a98f"
    }
  ],
  ...
}
DELETE /api/profile/pokemonsDescription: Deletes a Pokémon from the user's collection.Request Body:{
  "folderId": "68fe2298bcaeaf4c8ee5a98f",
  "pokemonName": "diglett"
}
Response (200 OK): (Returns the updated user profile)Profile Badges (Protected)POST /api/profile/badgesDescription: Adds a new badge to the user's profile.Request Body:{
  "name": "Cascade Badge",
  "gym": "Cerulean City Gym"
}
Response (200 OK): (Returns the updated user profile)DELETE /api/profile/badges/:badgeIdDescription: Deletes a badge from the user's profile using its unique ID.Example URL: DELETE /api/profile/badges/68fe2e0b0d2f28535256b449Response (200 OK): (Returns the updated user profile)