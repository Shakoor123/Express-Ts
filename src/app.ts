import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import { Server } from "http";
import authRout from "./routes/Auth";
import createHttpError from "http-errors";
import { config } from "dotenv";
import mongoose from "mongoose";
config();
const app: Application = express();
app.use(express.json());
app.use("/", authRout);
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URL || "")
  .then(() => {
    console.log("dataBase connected");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT: Number = Number(process.env.PORT) || 3000;
const server: Server = app.listen(PORT, () => {
  console.log("server running " + PORT);
});
