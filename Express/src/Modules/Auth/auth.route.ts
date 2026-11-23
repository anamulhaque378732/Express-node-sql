import { Router } from "express";
import { authController } from "./auth.controller.js";

const router = Router();

const { loginUser, genarateToken } = authController;

// login user

router.post("/login", loginUser);

router.post("/refresh-token", genarateToken);

export const authRoute = router;
