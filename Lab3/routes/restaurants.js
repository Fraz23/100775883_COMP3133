const express = require('express');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

/**
 * GET /restaurants
 * Return all restaurant details (all fields).
 */
router.get('/', async (req, res) => {
  try {
    const { sortBy } = req.query;

    // requirement #6 when sortBy is present
    if (sortBy) {
      const direction = sortBy.toUpperCase() === 'DESC' ? -1 : 1;

      const docs = await Restaurant.find({})
        .select('_id cuisine name city restaurant_id')
        .sort({ restaurant_id: direction })
        .lean()
        .exec();

      const result = docs.map(d => ({
        id: d._id,
        cuisines: d.cuisine,
        name: d.name,
        city: d.city,
        restaurant_id: d.restaurant_id
      }));

      return res.json(result);
    }

    // requirement #4: all details
    const restaurants = await Restaurant.find({}).exec();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /restaurants/cuisine/:cuisine
 * Return all restaurant details by cuisine (all fields).
 */
router.get('/cuisine/:cuisine', async (req, res) => {
  try {
    const cuisine = req.params.cuisine;
    const restaurants = await Restaurant.find({ cuisine: cuisine }).exec();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/**
 * GET /restaurants/Delicatessen
 * cuisines == 'Delicatessen' AND city != 'Brooklyn'
 * Return cuisines, name, city (no id), sorted by name ASC.
 */
router.get('/Delicatessen', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      cuisine: 'Delicatessen',
      city: { $ne: 'Brooklyn' }
    })
      .select('cuisine name city -_id')
      .sort({ name: 1 })
      .lean()
      .exec();

    const result = restaurants.map(r => ({
      cuisines: r.cuisine,
      name: r.name,
      city: r.city
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
