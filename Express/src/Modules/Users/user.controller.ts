import type { Request, Response } from "express";

import { userService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

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

      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Created successfully !!",
        data: result.rows[0],
      });
    } catch (error: any) {
      sendResponse(res, {
        statusCode: 500,
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

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Users Retrived Successfully!!!",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
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
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Retrived Successfully!!!",
      data: result.rows,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
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

    if (result.rowCount === 0) {
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found !!",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User updated Successfully!!!",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
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
      sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "User not found !!",
      });
    }

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User Deleted Successfully!!!",
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
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
