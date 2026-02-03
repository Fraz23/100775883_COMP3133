const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  building: String,
  street: String,
  zipcode: String
});

const RestaurantSchema = new mongoose.Schema({
  address: AddressSchema,
  city: String,
  cuisine: String,
  name: String,
  restaurant_id: String
});

// third argument = EXACT collection name in Atlas (Restaurants)
module.exports = mongoose.model('Restaurant', RestaurantSchema, 'Restaurants');
