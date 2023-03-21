import express from "express";

import {
  getLaundry,
  createLaundry,
  postInventry,
  getInventryName,
} from "../controllers/inventry.js";
import auth from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, getLaundry);
router.post("/", auth, createLaundry);
router.post("/postInventry", postInventry);
router.get("/getInventryName", getInventryName);
// router.patch("/:id", changeStatus);

export default router;
