import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/Router.js";

dotenv.config();
const port = process.env.PORT;
const mongoDBurl = process.env.MONGO_DB_URL;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(router);

mongoose.connect(mongoDBurl).then(() => {
  console.log("DB connection successful");
});

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
