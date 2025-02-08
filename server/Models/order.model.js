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
      },
    ],
    total_amount: {
      type: Number,
      required: true,
      min: [0, "total amount cant be negative"]
    },
    address: {
      country: {
        type: String,
        required: [true, "please provide us with the user country"],
        trim: true
      },
      city: {
        type: String,
        required: [true, "please provide us with the user city"],
      },
      street: {
        type: String,
        required: [true, "please provide us with the user street"],
      },
      house: {
        type: String,
        required: [true, "please provide us with the user house"],
      },
      phone_number: {
        type: String,
        required: [true, "please provide us with the user phone number"],
        match: [/^\+?\d{10,15}$/, "Invalid phone number"]
      },
    },
    delivered: {
      type: Boolean,
      default: false,
    },
    return_request: {
      requested: {
        type: Boolean,
        default: false,
      },
      request_message: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema)

module.exports = Order
