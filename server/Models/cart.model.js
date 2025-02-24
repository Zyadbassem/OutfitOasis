const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "please enter User Id"],
    },
    items: [
      {
        itemId: {
          type: String,
          required: [true, "please enter Item Id"],
        },
        quantity: {
          type: Number,
          required: [true, "please enter Item quantity"],
        },
        color: {
          type: String,
          default: "Original",
        },
        priceForAllItemQuantity: {
          type: Number,
          required: [true, "please enter Item Price"],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: [true, "please enter total amount"],
    },
  },
  {
    timestamps: true,
  },
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
