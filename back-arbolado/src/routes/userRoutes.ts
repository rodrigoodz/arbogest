import express from "express";
import { createUser, getUserData } from "../controllers/userController";
const router = express.Router();

router.get("/", getUserData);
router.post("/", createUser);

module.exports = router;
