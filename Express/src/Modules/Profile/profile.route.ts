import { Router } from "express";
import { profileController } from "./profile.controller.js";

const router = Router();

export const profileRoute = router;

const { createProfile } = profileController;

// profile post

router.post("/", createProfile);
