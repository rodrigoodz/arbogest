import express from "express";
const router = express.Router();
import { getAllFilters } from "../controllers/filterController";

router.get("/", getAllFilters);

module.exports = router;
