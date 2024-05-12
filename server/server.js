// server.js

const { json } = require("micro");
const { send } = require("micro");
const cors = require("micro-cors")();
const mongoose = require("mongoose");
require("dotenv").config();

const UserModel = require("./models/Users");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = cors(async (req, res) => {
  if (req.method === "GET" && req.url === "/users") {
    const users = await UserModel.find();
    return send(res, 200, users);
  } else if (req.method === "POST" && req.url === "/createUsers") {
    const data = await json(req);
    const newUser = new UserModel(data);
    await newUser.save();
    return send(res, 201, newUser);
  } else {
    return send(res, 404, "Not Found");
  }
});
