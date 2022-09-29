import express, { Request, Response } from "express";
import authController from "../controllers/Auth";
const router = express.Router();
router.get("/", (req: Request, res: Response) => {
  res.send("home right now");
});
router.post("/login", authController.loginFunction);
router.post("/register", authController.registerFunction);

export default router;
