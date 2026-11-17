import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const port = 5000;

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

app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);

  const { name, age, email } = req.body;

  res.status(200).json({
    success: true,
    message: "this is a test api",
    data: { name, age, email },
  });
});

app.listen(port, () => {
  console.log(`The express server is running on port ${port}`);
});
