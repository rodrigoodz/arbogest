import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const port = process.env.PORT || 8000;
dotenv.config();
import bodyParser from "body-parser";

const treeRoutes = require("./src/routes/treeRoutes");
const userRoutes = require("./src/routes/userRoutes");
const cityRoutes = require("./src/routes/cityRoutes");
const filterRoutes = require("./src/routes/filterRoutes");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/", treeRoutes);
app.use("/user", userRoutes);
app.use("/filters", filterRoutes);
app.use("/cities", cityRoutes);

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
