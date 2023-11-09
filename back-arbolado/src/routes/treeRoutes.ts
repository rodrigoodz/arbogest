import express from "express";
const router = express.Router();
const treeController = require("../controllers/treeController");

router.get("/", treeController.getBaseData);
router.get("/data", treeController.getFilteredTreeData);

module.exports = router;
