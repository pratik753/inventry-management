import express from "express";

import {
    createSale,
    getSale,
} from "../controllers/sale.js";
import auth from "../middleware/auth.js";

const router = express.Router();


router.post("/createSale",  createSale);
router.get("/getSale", getSale);
export default router;
