import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";

import handleImage from "./controllers/image.js";
import handleSignIn from "./controllers/signin.js";
import handleProfile from "./controllers/profile.js";
import handleRegister from "./controllers/register.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABSE_URL,
    ssl: { rejectUnauthorized: false },
    host: process.env.DATABSE_HOST,
    port: 5432,
    user: process.env.DATABSE_USER,
    password: process.env.DATABSE_PW,
    database: process.env.DATABSE_DB,
  },
});

const app = express();
const port = process.env.PORT || 3001;
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

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
