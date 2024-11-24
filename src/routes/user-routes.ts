import { Router } from "express";
import { UserController } from "../controllers/user/user-controller";

const userRoutes = Router();

userRoutes.post("/auth", UserController.auth);

export { userRoutes }
