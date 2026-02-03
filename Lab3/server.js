const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const restaurantRoutes = require('./routes/restaurants');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/restaurants', restaurantRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
