import express from "express";
import { google, login, signup } from "../controller/authcontoller.js";
const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/google",google)

export default router;