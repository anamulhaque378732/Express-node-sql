import type { Request, Response } from "express";

import { userService } from "./user.service.js";

const createUser = async (req: Request, res: Response) => {
  {
    try {
      const result = await userService.createUserIntoDB(req.body);

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

export const userController = {
  createUser,
};
