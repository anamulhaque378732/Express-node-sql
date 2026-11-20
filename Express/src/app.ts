import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./Modules/Users/user.routes.js";

const app: Application = express();
// json format
app.use(express.json());
// text format
app.use(express.text());
// urlencded format
app.use(express.urlencoded({ extended: true }));

// post
app.use("/api/v1/users", userRoute);

// get all

app.get("/api/v1/users", userRoute);

// get single user

app.get("/api/v1/users/:id", userRoute);

// post create user

app.put("/api/v1/users/:id", userRoute);

// delete user

app.delete("/api/v1/users/:id", userRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Anamul",
  });
});

export default app;
