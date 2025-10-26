require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');


connectDB();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pokemon', require('./routes/api/pokemon'));
app.use('/api/collection', require('./routes/api/collection'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
