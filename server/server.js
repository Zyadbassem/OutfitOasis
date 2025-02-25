const express = require("express");
const Item = require("./Models/item.model.js");
const User = require("./Models/user.mode.js"); // Note: Fix typo in filename
const Cart = require("./Models/cart.model.js");
const Order = require("./Models/order.model.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/** Instantiating the app */
const app = express();

/** Init secret key for jwt */
const jwt_secret_key = process.env.SWT_SECRET_KEY; // Note: Consider renaming env var to JWT_SECRET_KEY

/** allow requests from the front web */
const corsOptions = {
  origin: ["https://outfit-oasis-three.vercel.app", "http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Connect to MongoDB at startup
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable not set");
  }

  const client = await mongoose.connect(mongoUrl);
  cachedDb = client;
  return client;
}

// Connect at startup
connectToDatabase()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

/**
 * File Upload Configuration - using memory storage for Vercel
 */
const storage = multer.memoryStorage(); // Use memory storage instead of disk storage
const upload = multer({ storage: storage });

/**
 *** User Authentication
 */

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Welcome to the server" });
});

/** Route to create user */
app.post("/api/signup", async (req, res) => {
  try {
    /** Get the Req */
    const { username, email, password, passwordCon } = req.body;

    /** Case password not match */
    if (password != passwordCon) {
      res.status(500).json({ message: "password not match" });
      return;
    }

    /** Case user exist */
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    /** Case empty field */
    if (!username || !password || !email) {
      res.status(500).json({ message: "please fill the missing fields" });
      return;
    }

    /** Hashing the password */
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    /** Saving the user */
    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    /** Creating a cart */
    const cart = await Cart.create({
      userId: user._id,
      items: [],
      totalAmount: 0,
    });
    res.status(200).json({ message: "signed up successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** Route to sign in */
app.post("/api/signin", async (req, res) => {
  try {
    /** get the requested data */
    const { username, password } = req.body;

    /** check if the data is empty */
    if (!username || !password) {
      res.status(400).json({ message: "please fill the missing fields" });
      return;
    }

    /** Check if the user doesn't exist */
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(401).json({ message: "wrong password or username" });
      return;
    }

    /** Check the password */
    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      res.status(401).json({ message: "wrong password or username" });
      return;
    }

    /** Generating the token */
    let token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        id: user._id,
      },
      jwt_secret_key,
      {
        expiresIn: "1W",
      },
    );

    res.status(200).json({
      success: true,
      userData: {
        username: username,
        userId: user.id,
        userToken: token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** Check token expired or not */
app.post("/api/checktoken", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.json({ valid: false, message: "no token received" });
    }
    const decoded = jwt.verify(token, jwt_secret_key);
    res.status(200).json({ valid: true, message: "token is valid" });
  } catch (error) {
    res.status(500).json({ valid: false, message: error.message });
  }
});

/**
 *** Admin Page
 */

/** Check Admin */
app.get("/api/checkadmin", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);
    res.status(200).json({ isAdmin: decoded.isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** Add Item - modified to use cloud storage instead of local files */
app.post(
  "/api/additems",
  upload.fields([
    { name: "modelPath", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      /** Check if the user is not an admin */
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwt_secret_key);
      if (!decoded.isAdmin) {
        res.status(401).json({ error: "You are not an admin" });
        return;
      }

      /** Getting the user input */
      const { name, description, price, colors, quantity, category } = req.body;

      if (
        !name ||
        !description ||
        !price ||
        !colors ||
        !quantity ||
        !category ||
        !req.files.modelPath ||
        !req.files.image
      ) {
        res.status(500).json({ error: "please fill all the fields" });
        return;
      }

      // Upload image to cloudinary
      const imageResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "outfit-oasis-images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        uploadStream.end(req.files.image[0].buffer);
      });

      // Upload model to cloudinary
      const modelResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "outfit-oasis-models",
            resource_type: "raw",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );

        uploadStream.end(req.files.modelPath[0].buffer);
      });

      /**  Save the item in the database */
      const item = await Item.create({
        name,
        description,
        price,
        colors,
        quantity,
        category,
        modelPath: modelResult.secure_url,
        image: imageResult.secure_url,
      });

      res.status(200).json({ message: "item added", item });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
);

/**
 *** Serve the assets - This won't work on Vercel as is
 */
// app.use("/assets", express.static("assets")); // Not compatible with Vercel

/**
 *** Route to get items based on category
 */
app.get("/api/items/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const items = await Item.find({ category: category });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/*
 *** CART
 */

/** add to cart */
app.post("/api/addtocart", async (req, res) => {
  try {
    /** User Validation */
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);

    /** Get the item and quantity */
    const { itemId, quantity } = req.body;

    /** Check the body */
    if (!itemId || !quantity) {
      res.status(400).json({ message: "please enter the missing fields" });
      return;
    }

    const quantityNum = Number(quantity);

    /** Check the user */
    if (!decoded) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    /** Check the item */
    const item = await Item.findOne({ _id: itemId });
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    /** Check the quantity */
    if (item.quantity < quantityNum) {
      res.status(400).json({ message: "Not enough quantity" });
      return;
    }

    /** add to cart */
    const cart = await Cart.findOne({ userId: decoded.id });
    if (!cart) {
      console.log(decoded);
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    /** Check if the item is already in the cart */
    const itemInCart = cart.items.find((item) => item.itemId === itemId);
    if (itemInCart) {
      itemInCart.quantity += quantityNum;
      itemInCart.priceForAllItemQuantity = itemInCart.quantity * item.price;
    } else {
      cart.items.push({
        itemId,
        quantity: quantityNum,
        priceForAllItemQuantity: quantityNum * item.price,
      });
    }

    /** Update the item quantity and the cart current total amount */
    cart.totalAmount += quantityNum * item.price;
    item.quantity -= quantityNum;
    await cart.save();
    await item.save();

    /** Send the response */
    res.status(200).json({ message: "Item added to cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** remove from cart */
app.patch("/api/removefromcart", async (req, res) => {
  try {
    /** User Validation */
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);

    /** Get the item and quantity */
    const { itemId, quantity } = req.body;

    /** Check the body */
    if (!itemId || !quantity) {
      res.status(400).json({ message: "please enter the missing fields" });
      return;
    }

    const quantityNum = Number(quantity);

    /** Check the user */
    if (!decoded) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    /** Check the item */
    const item = await Item.findOne({ _id: itemId });
    if (!item) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    /** add to cart */
    const cart = await Cart.findOne({ userId: decoded.id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    /** Check if the item is already in the cart */
    const itemInCart = cart.items.find((item) => item.itemId === itemId);
    if (itemInCart && itemInCart.quantity >= 1) {
      itemInCart.quantity -= quantityNum;
      itemInCart.priceForAllItemQuantity = itemInCart.quantity * item.price;
    } else {
      res.status(404).json({ message: "Item not found in cart" });
      return;
    }

    /** Update the item quantity and the cart current total amount */
    cart.totalAmount -= quantityNum * item.price;
    item.quantity += quantityNum;
    await cart.save();
    await item.save();

    /** Send the response */
    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** get the cart */
app.get("/api/getcart", async (req, res) => {
  try {
    /** User Validation */
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);

    /** Check the user */
    if (!decoded) {
      res.status(401).json({ message: "You are not authorized" });
      return;
    }

    /** Get the cart */
    const cart = await Cart.findOne({ userId: decoded.id });
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    /** get the cart items */
    const cartItems = await Item.find({
      _id: { $in: cart.items.map((item) => item.itemId) },
    });
    if (!cartItems) {
      res.status(404).json({ message: "Items not found" });
      return;
    }

    let cartItemsContainer = [];
    for (let item of cartItems) {
      let cartItem = cart.items.find((cartItem) => cartItem.itemId == item._id);
      cartItemsContainer.push({
        item: item,
        quantity: cartItem.quantity,
        priceForAllItemQuantity: cartItem.priceForAllItemQuantity,
      });
    }

    res.status(200).json(cartItemsContainer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** Handle cart quantity change */
app.put("/api/cartQuantityChange", async (req, res) => {
  try {
    // Check the user new quantity and itemId
    const { itemId, newQuantity } = req.body;
    const numberedNewQuantity = Number(newQuantity);

    if (!itemId || numberedNewQuantity < 0 || isNaN(numberedNewQuantity)) {
      return res
        .status(400)
        .json({ message: "Enter valid itemId and quantity" });
    }

    // Check for missing authorization header
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Verify the user token
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Find the item and user's cart
    const item = await Item.findOne({ _id: itemId });
    const cart = await Cart.findOne({ userId: decoded.id });

    if (!item || !cart) {
      return res.status(404).json({ message: "Item or cart not found" });
    }

    // Get the cart item
    const cartItem = cart.items.find(
      (cartItem) => cartItem.itemId.toString() === itemId,
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // Calculate the quantity difference
    const previousQuantity = cartItem.quantity;
    const differenceBetweenTheTwoQuantities =
      numberedNewQuantity - previousQuantity;

    // Check stock availability
    if (item.quantity < differenceBetweenTheTwoQuantities) {
      return res
        .status(400)
        .json({ message: `Not enough in stock. Available: ${item.quantity}` });
    }

    // Update item quantity in stock
    item.quantity -= differenceBetweenTheTwoQuantities;

    // Update the cart item's total price
    const addedAmount = differenceBetweenTheTwoQuantities * item.price;
    cartItem.priceForAllItemQuantity += addedAmount;
    cart.totalAmount += addedAmount;

    // If the new quantity is 0, remove the item from the cart
    if (numberedNewQuantity === 0) {
      cart.items.pull(cartItem);
    } else {
      cartItem.quantity = numberedNewQuantity;
    }

    // Save the changes
    await cart.save();
    await item.save();

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 *** Check Out
 */
app.post("/api/checkout", async (req, res) => {
  try {
    /** Get The Form Data */
    const { firstName, lastName, phoneNumber, address, city, state, country } =
      req.body;
    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({ message: "please fill the missing field" });
    }

    /** Authentication */
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);
    if (!decoded) return res.status(401).json({ message: "Not authorized" });

    /** Get the Cart */
    const cart = await Cart.findOne({ userId: decoded.id });
    if (!cart)
      return res
        .status(404)
        .json({ message: "cart not found contact support" });

    /** Check if theres no items in cart */
    if (cart.items.length < 1) {
      return res.status(404).json({ message: "there's no items in cart" });
    }

    /** Handle getting the order items and price */
    const itemsInCart = cart.items.map((item) => ({
      item_id: item.itemId,
      quantity: item.quantity,
      item_price: item.priceForAllItemQuantity / item.quantity,
    }));
    const total_amount = cart.totalAmount;

    /** Creating the order */
    const order = await Order.create({
      user_id: decoded.id,
      items: itemsInCart,
      total_amount: total_amount,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      address: address,
      city: city,
      state: state,
      country: country,
    });

    /** removing items from cart */
    cart.items = [];
    cart.totalAmount = 0;
    cart.save();

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

/**
 *** Get User Orders
 */
app.get("/api/orders", async (req, res) => {
  try {
    /** Authentication */
    if (!req.headers.authorization) {
      return res.status(401).json({ message: "Authorization token missing" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwt_secret_key);
    if (!decoded) return res.status(401).json({ message: "Not authorized" });

    /** Get the user orders */
    const orders = await Order.find({ user_id: decoded.id });
    if (!orders) return res.status(404).json({ message: "user got no orders" });

    /** Passing the orders */
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Export the Express API for Vercel
module.exports = app;
