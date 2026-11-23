import bcrypt from "bcryptjs";
import { pool } from "../../DB/index.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config/index.js";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // check if the user exist

  const { email, password } = payload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials !!");
  }

  // Check if password is  match

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid Credentials !!");
  }

  // chect the user status

  if (!user.rows[0].is_active) {
    throw new Error(" Access denied !!");
  }

  // If pass all then generate JWT token

  const JwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(JwtPayload, `${config.accessToken}`, {
    expiresIn: "1h",
  });

  const refreshToken = jwt.sign(JwtPayload, `${config.refreshToken}`, {
    expiresIn: "10d",
  });

  //   delete password

  delete user.rows[0].password;
  return { accessToken, refreshToken, user: user.rows[0] };
};

const genarateAccessToken = async (token: string) => {
  // 1. --> check if the token exist

  if (!token) {
    throw new Error("Unauthorized access");
  }

  // 2. --> token validation

  const decode = jwt.verify(token as string, config.refreshToken) as JwtPayload;

  // 3. --> Check if the user exists

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decode.email],
  );

  if (user.rowCount === 0) {
    throw new Error("User not found !!");
  }

  //4. -->  Is the user status active

  if (!user.rows[0].is_active) {
    throw new Error("Forbbiden !!");
  }

  const JwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(JwtPayload, `${config.accessToken}`, {
    expiresIn: "1h",
  });

  return { accessToken };
};

export const authService = {
  loginUserIntoDB,
  genarateAccessToken,
};
