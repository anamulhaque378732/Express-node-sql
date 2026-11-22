import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config/index.js";
import { pool } from "../DB/index.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  // 1. --> check if the token exist

  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      success: false,
      message: "Unauthorization access !!!",
    });
  }

  // 2. --> token validation

  const decode = jwt.verify(token as string, config.accessToken) as JwtPayload;

  // 3. --> Check if the user exists

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email],
  );

  if (user.rowCount === 0) {
    res.status(404).json({
      success: false,
      message: "User not Found !!",
    });
  }

  //4. -->  Is the user status active

  if (!user.rows[0].is_active) {
    res.status(403).json({
      success: false,
      message: "Forbidden !!",
    });
  }

  // Namespace

  req.user = decode;

  next();
};

export default auth;
