import { pool } from "../../DB/index.js";
import type { IUser, UUser } from "./user.interface.js";
import bcrypt from "bcryptjs";
// create user from db

const createUserIntoDB = async (payLoad: IUser) => {
  const { name, email, password, age } = payLoad;

  const hashPassword = await bcrypt.hash(password, 10);
  console.log(hashPassword);

  const result = await pool.query(
    `
    INSERT INTO users(name,email, password, age) VALUES ($1,$2,$3,$4) RETURNING *
    `,

    // 2nd option
    // anther option
    // `
    // INSERT INTO users(name,email, password, age) VALUES ($1,$2,$3,$4)RETURNING name, email,age,is_active,created_at,updated_at
    // `,

    [name, email, hashPassword, age],
  );

  // 1st option
  delete result.rows[0].password;
  return result;
};

// get all user from db

const getAllUserFromDB = async () => {
  const result = await pool.query(`
  SELECT * FROM users
  `);
  return result;
};

// get single User from db

const getSigleUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT * FROM users WHERE id=$1
      `,
    [id],
  );
  return result;
};

// update user

const updateUserFromDB = async (payload: UUser, id: string) => {
  const { name, password, age, is_Active } = payload;

  const result = await pool.query(
    `
  UPDATE users 
  SET
   name =  COALESCE($1,name),
   password = COALESCE($2,password),
   age =  COALESCE($3,age),
   updated_at  = NOW(),
   is_Active = COALESCE($4,is_Active)
   WHERE id =$5 RETURNING *
  `,
    [name ?? null, password ?? null, age ?? null, is_Active ?? null, id],
  );

  return result;
};

// const delete user

const deleteUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      DELETE FROM users
      WHERE id=$1
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSigleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
