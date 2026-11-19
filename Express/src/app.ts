import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { pool } from "./DB/index.js";
import { userRoute } from "./Modules/Users/user.routes.js";

const app: Application = express();

// json format
app.use(express.json());

// text format
// app.use(express.text());

// urlencded format

// app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  //   res.send("This is root route");
  //   console.log(req);

  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Anamul",
  });
});

// post
app.use("/api/v1/users", userRoute);

// get all

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
  SELECT * FROM users
  `);

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
});
// get 1

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT * FROM users WHERE id=$1
      `,
      [id],
    );

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
});

// post create user

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { name, password, age, is_Active } = req.body;

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
});

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      DELETE FROM users
      WHERE id=$1
      `,
      [id],
    );

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
});

export default app;
