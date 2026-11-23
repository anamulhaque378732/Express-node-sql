import type { Request, Response } from "express";
import { profileService } from "./user.service.js";
import sendResponse from "../../utils/sendResponse.js";

const { createProfileIntoDB } = profileService;

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await createProfileIntoDB(req.body);

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Profile Created successfully !!",
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

export const profileController = { createProfile };
