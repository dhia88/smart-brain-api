import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleImage  from "./controllers/image.js";
import handleSignIn  from "./controllers/signin.js";
import handleProfile  from "./controllers/profile.js";
import handleRegister  from "./controllers/register.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "Dhia@1988",
    database: "smart-brain",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/signin", (req, res) => {
  handleSignIn(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  handleRegister(req, res, db, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  handleProfile(req, res);
});

app.put("/image", (req, res) => {
  handleImage(req, res, db);
});

app.listen(3001, () => {
  console.log("app is running");
});
