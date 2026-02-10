const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error("Missing MONGODB_URI in environment.");
  process.exit(1);
}

const dataPath = path.join(__dirname, "..", "data", "UsersData.json");
const rawData = fs.readFileSync(dataPath, "utf-8");
const users = JSON.parse(rawData);

const run = async () => {
  try {
    await mongoose.connect(mongoUri);
    const result = await User.insertMany(users, { ordered: false });
    console.log(`Inserted ${result.length} users.`);
  } catch (err) {
    console.error("Seed error:", err);
  } finally {
    await mongoose.disconnect();
  }
};

run();
