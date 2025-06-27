require("dotenv").config();

import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { auth } from "./middleware";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/signup", (req, res) => {
  res.json({ msg: "signup" });
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room",auth, (req, res) => {
  res.json({ msg: "room" });
});

app.listen(PORT);
