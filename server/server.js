const express = require("express");
const Item = require("./Models/item.model.js");
const User = require("./Models/user.mode.js");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

/** Intantianting the app  */
const app = express();
const port = 8080;

/** Init secret key for swt */
const swt_secret_key = process.env.SWT_SECRET_KEY;

/** allow requestes from the front web */
const corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));
app.use(express.json());

/** route to add item */
app.post("/api/items", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ messeage: "error" });
  }
});

/** Route to get items based on category */
app.get("/api/items/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const items = await Item.find({ category: category });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

/** Route to create user */
app.post("/api/signup", async (req, res) => {
  try {
    /** Get the Req */
    const { username, email, password, passwordCon } = req.body;
    console.log(username, email, password, passwordCon);

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
      res.status(500).json({ message: "password not match" });
      return;
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    res.status(200).json(user);
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
      res.status(400).json({ message: "please enter the messing fields" });
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
    let token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      swt_secret_key,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      success: true,
      userData: {
        username: username,
        userId: user.id,
        userToken: token,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** Check Admin */
app.get("/api/checkadmin", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, swt_secret_key);
    res.status(200).json({ isAdmin: decoded.isAdmin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "assets/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

app.post("/api/additems", upload.single("modelPath"), async (req, res) => {
  /** Checking if the user is an admin */
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, swt_secret_key);
    if (!decoded.isAdmin) {
      res.status(401).json({ error: "You are not an admin" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  /** Handle checking item details */
  try {
    const { name, description, price, colors, quantity, category } = req.body;
    const modelPath = `/assets/${req.file.filename}`;
    if (
      !name ||
      !description ||
      !price ||
      !colors ||
      !quantity ||
      !category ||
      !modelPath
    ) {
      res.status(500).json({ error: "please fill all the fields" });
      return;
    }

    /**  Save the item in the database */
    const item = await Item.create({
      name,
      description,
      price,
      colors,
      quantity,
      category,
      modelPath,
    });
    res.status(200).json({ message: "item added", item });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

/** serve the assets */
app.use("/assets", express.static("assets"));

/** Get model paths */
app.get("/api/modelpaths", async (req, res) => {
  try {
    const items = await Item.find();
    const modelPaths = items.map((item) => ({ id: item._id, modelPath: item.modelPath }));
    res.status(200).json(modelPaths);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl).then(() => {
  console.log("connected");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
