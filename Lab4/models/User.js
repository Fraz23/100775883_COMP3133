const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 100,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"],
    },
    address: {
      street: {
        type: String,
        required: true,
        trim: true,
      },
      suite: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z ]+$/, "City must contain only letters and spaces"],
      },
      zipcode: {
        type: String,
        required: true,
        trim: true,
        match: [/^\d{5}-\d{4}$/, "Zip code must be in the format 12345-1234"],
      },
      geo: {
        lat: {
          type: String,
          required: true,
          trim: true,
        },
        lng: {
          type: String,
          required: true,
          trim: true,
        },
      },
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d-\d{3}-\d{3}-\d{4}$/, "Phone must be in the format 1-123-123-1234"],
    },
    website: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => {
          try {
            const url = new URL(value);
            return url.protocol === "http:" || url.protocol === "https:";
          } catch {
            return false;
          }
        },
        message: "Website must be a valid http or https URL",
      },
    },
    company: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      catchPhrase: {
        type: String,
        required: true,
        trim: true,
      },
      bs: {
        type: String,
        required: true,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
