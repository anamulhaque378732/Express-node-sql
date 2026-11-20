import { Router } from "express";
import { userController } from "./user.controller.js";

const router = Router();

 

const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } =
  userController;

// post or create user

router.post("/", createUser);

// get all

router.get("/", getAllUsers);

// get single

router.get("/:id", getSingleUser);

// put update user

router.put("/:id", updateUser);

// delete user

router.delete("/:id", deleteUser);

export const userRoute = router;
