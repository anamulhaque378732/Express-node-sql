import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import { userRoute } from "./Modules/Users/user.routes.js";
import { profileRoute } from "./Modules/Profile/profile.route.js";
import { authRoute } from "./Modules/Auth/auth.route.js";

import logger from "./Moddleware/loggerMiddleware.js";
import globalErrorHandler from "./Moddleware/GlobalErrorHandler.js";

const app: Application = express();

var corsOptions = {
  // you take multiple origin
  
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));

// *** file system module

// json format
app.use(express.json());

// text format
app.use(express.text());

// urlencded format
app.use(express.urlencoded({ extended: true }));

// middleware loger

app.use(logger);

// user route operation

app.use("/api/v1/users", userRoute);

// profile route operation

app.use("/api/v1/profile", profileRoute);

// login and genate access token

app.use("/api/v1/auth", authRoute);

// main route or server "/"

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "This is root route",
    author: "Anamul",
  });
});

// Global Error Handling Middleware

app.use(globalErrorHandler);

export default app;
