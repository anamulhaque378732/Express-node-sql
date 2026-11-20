import type { Request, Response } from "express";

import { userService } from "./user.service.js";

const {
  createUserIntoDB,
  getAllUserFromDB,
  getSigleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
} = userService;

// create user post

const createUser = async (req: Request, res: Response) => {
  {
    try {
      const result = await createUserIntoDB(req.body);

      res.status(201).json({
        success: true,
        message: " User  Created successsfully",
        data: result.rows[0],
      });
      // console.log(result);
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error?.message,
        error: error,
      });
    }
  }
};

// get all user

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: " Users retrived successsfully",
      data: result.rows,
    });
    // console.log(result);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// get single user

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await getSigleUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: " User  not found",
      });
    }

    res.status(200).json({
      success: true,
      message: " User retrived successsfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// update user

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await updateUserFromDB(req.body, id as string);
    // console.log(result);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: " User  not found",
      });
    }

    res.status(201).json({
      success: true,
      message: " User   updated  successsfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

// delete user

const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteUserFromDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: " User  not found",
      });
    }

    res.status(200).json({
      success: true,
      message: " User deleted successsfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
