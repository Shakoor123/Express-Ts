import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express";
import { Server } from "http";
import createHttpError from "http-errors";
import { config } from "dotenv";
import mongoose from "mongoose";

config();
const app: Application = express();

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new createHttpError.NotFound());
});
app.use(express.json());
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
};

app.use(errorHandler);

mongoose
  .connect(process.env.URL || "")
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
