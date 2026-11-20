import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./Modules/Users/user.routes.js";
import { profileRoute } from "./Modules/Profile/profile.route.js";

const app: Application = express();
// json format
app.use(express.json());
// text format
app.use(express.text());
// urlencded format
app.use(express.urlencoded({ extended: true }));

// user route operation

app.use("/api/v1/users", userRoute);

// profile route operation

app.use("/api/v1/profile", profileRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Anamul",
  });
});

export default app;
