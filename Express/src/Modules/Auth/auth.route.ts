import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

const { loginUser } = authController;

// login user

router.post("/login", loginUser);

export const authRoute = router;
