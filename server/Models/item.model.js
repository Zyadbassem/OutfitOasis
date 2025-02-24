const mongoose = require("mongoose");

const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter Item name"],
    },
    description: {
      type: String,
      required: [true, "please enter Item description"],
    },
    price: {
      type: Number,
      required: [true, "please enter Item Price"],
    },
    colors: [
      {
        type: String,
      },
    ],
    quantity: {
      type: Number,
      required: [true, "please enter Item quantity"],
      default: 0,
    },
    modelPath: {
      type: String,
      required: [true, "please enter model path"],
    },
    category: {
      type: String,
      enum: ["tops", "trousers", "shoes", "adminItem"],
      required: false,
    },
    image: {
      type: String,
      default: "/assets/testtest.jpeg",
    },
  },
  {
    timestamps: true,
  },
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
