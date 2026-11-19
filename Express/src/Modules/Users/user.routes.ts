import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

// post method

const { createUser } = userController;

// post
router.post("/", createUser);

// get all

// get single

export const userRoute = router;
