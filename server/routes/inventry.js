import express from "express";

import {
  getLaundry,
  createInventory,
  postInventry,
  getInventryName,
  inventryQuantity,
} from "../controllers/inventry.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getLaundry);
router.post("/createInventory", createInventory);
router.post("/postInventry", postInventry);
router.patch("/inventryQuantity/:id", inventryQuantity);
router.get("/getInventryName", getInventryName);
// router.patch("/:id", changeStatus);

export default router;
