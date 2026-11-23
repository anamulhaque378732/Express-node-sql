import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utils/sendResponse.js";

const { loginUserIntoDB, genarateAccessToken } = authService;

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await loginUserIntoDB(req.body);

    const { refreshToken } = result;

    res.cookie("refreshToken", refreshToken, {
      secure: false, // when http --> secure : false, when https or in production secure:true
      httpOnly: true, //prevent  XSS attack
      sameSite: "lax", // "none", "strict", "lax"  prevet CSRF attack
      // maxAge:
      path: "/",
      domain: "localhost", //.example.com
    });
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User login successfully",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
    });
  }
};

// genarate token

const genarateToken = async (req: Request, res: Response) => {
  try {
    // console.log(req.cookies.refreshToken);
    const result = await genarateAccessToken(req.cookies.refreshToken);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Access Token Genarated Successfully !!",
      data: result,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 500,
      success: false,
      message: error?.message,
    });
  }
};

export const authController = {
  loginUser,
  genarateToken,
};
