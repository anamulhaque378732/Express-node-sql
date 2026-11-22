import { Router } from "express";
import { userController } from "./user.controller.js";
import auth from "../../Moddleware/authMiddleware.js";

const router = Router();

// user api

const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } =
  userController;

// post or create user

router.post("/", createUser);

// get all

router.get("/", auth, getAllUsers);

// get single

router.get("/:id", getSingleUser);

// put update user

router.put("/:id", updateUser);

// delete user

router.delete("/:id", deleteUser);

export const userRoute = router;
