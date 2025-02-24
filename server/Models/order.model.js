const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "please provide us with the user id"],
    },
    items: [
      {
        item_id: {
          type: mongoose.Schema.ObjectId,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        item_price: {
          type: Number,
          required: true,
          min: [1, "price must be at least 1"],
        },
      },
    ],
    total_amount: {
      type: Number,
      required: true,
      min: [0, "total amount cant be negative"],
    },
    first_name: {
      type: String,
      required: [true, "please provide us with the first name"],
      trim: true,
    },
    last_name: {
      type: String,
      required: [true, "please provide us with the last name"],
      trim: true,
    },
    phone_number: {
      type: String,
      required: [true, "please provide us with the user phone number"],
      match: [/^\+?\d{10,15}$/, "Invalid phone number"],
    },
    address: {
      type: String,
      required: [true, "please provide us with the address"],
      trim: true,
    },
    city: {
      type: String,
      required: [true, "please provide us with the city"],
    },
    state: {
      type: String,
      required: [true, "please provide us with the state"],
    },
    country: {
      type: String,
      required: [true, "please provide us with the country"],
    },
    delivered: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
