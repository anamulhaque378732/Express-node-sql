import { Router } from "express";
import { userController } from "./user.controller.js";
import auth from "../../Moddleware/authMiddleware.js";
import { USER_ROLE } from "../../types/index.js";

const router = Router();

// user api

const { createUser, getAllUsers, getSingleUser, updateUser, deleteUser } =
  userController;

// post or create user

router.post("/", createUser);

// get all

router.get("/", auth(USER_ROLE.admin, USER_ROLE.agent), getAllUsers);

// get single

router.get(
  "/:id",
  auth(USER_ROLE.admin, USER_ROLE.agent, USER_ROLE.user),
  getSingleUser,
);

// put update user

router.put("/:id", auth(USER_ROLE.admin, USER_ROLE.user), updateUser);

// delete user

router.delete("/:id", auth(USER_ROLE.admin), deleteUser);

export const userRoute = router;
