import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../DB/index.js";
import type { Role } from "../types/index.js";

const auth = (...roles: Role[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. --> check if the token exist

      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorization access !!!",
        });
      }

      // 2. --> token validation

      const decode = jwt.verify(
        token as string,
        config.accessToken,
      ) as JwtPayload;

      // 3. --> Check if the user exists

      const user = await pool.query(
        `
    SELECT * FROM users WHERE email=$1
    `,
        [decode.email],
      );

      if (user.rowCount === 0) {
        return res.status(404).json({
          success: false,
          message: "User not Found !!",
        });
      }

      //4. -->  Is the user status active

      if (!user.rows[0].is_active) {
        return res.status(403).json({
          success: false,
          message: "Forbidden !!",
        });
      }

      // role based access control

      if (roles.length && !roles.includes(user.rows[0].role)) {
        return res.status(401).json({
          success: false,
          message: " Unauthorization access !!",
        });
      }

      // Namespace

      req.user = decode;

      next();
    } catch (error: any) {
      next(error.message);
    }
  };
};

export default auth;
