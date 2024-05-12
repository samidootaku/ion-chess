const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(
  cors({
    Origin: ["https://ion-chess.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
const mongoose = require("mongoose");
const password = process.env.PASSWORD;
mongoose.connect(
  `mongodb+srv://sikou:${password}@sikou.ss8bkcc.mongodb.net/?retryWrites=true&w=majority&appName=sikou`
);

const UserModel = require("./models/Users");

app.get("/users", async (req, res) => {
  const users = await UserModel.find();
  res.json(users);
});

app.post("/createUsers", async (req, res) => {
  const newUser = new UserModel(req.body);
  await newUser.save();
  res.json(newUser);
});

app.listen("3001", () => {
  console.log("server works");
});
