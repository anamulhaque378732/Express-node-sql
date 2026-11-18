import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
import config from "./config/index.js";

const app: Application = express();

// json format
app.use(express.json());

// text format
// app.use(express.text());

// urlencded format

// app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  // database url poled
  connectionString: config.connection_string,
});

// console.log(pool);

// sql language create table

const inintDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT,
      is_Active BOOLEAN DEFAULT true,
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()

      );
      `);
    console.log("Database Connected successfully");
  } catch (error: any) {
    console.log(error.message);
  }
};

inintDB();

app.get("/", (req: Request, res: Response) => {
  //   res.send("This is root route");
  //   console.log(req);

  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Anamul",
  });
});
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

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    // console.log(req.body);

    // const  body = req.body;

    const { name, email, password, age } = req.body;

    const result = await pool.query(
      `
    INSERT INTO users(name,email, password, age) VALUES ($1,$2,$3,$4)RETURNING *
    `,
      [name, email, password, age],
    );
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
});

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

app.listen(config.port, () => {
  console.log(`The express server is running on port ${config.port}`);
});
