import express from "express";
const router = express.Router();
import { getAllCities } from "../controllers/cityController";

router.get("/", getAllCities);

module.exports = router;
