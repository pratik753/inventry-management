import express from "express";

import {
  signin,
  signup,
  changePassword,
  recoverPasswordEmail,
  setPassword,
} from "../controllers/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);
router.post("/recoverPassword", recoverPasswordEmail);
router.post("/recoverPassword/:id/:token", setPassword);
export default router;
