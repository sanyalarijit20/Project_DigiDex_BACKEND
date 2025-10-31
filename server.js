require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pokemon', require('./routes/api/pokemon'));
app.use('/api/collection', require('./routes/api/collection'));
app.use('/api/profile', require('./routes/api/profile'));


module.exports = app;
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
