import { Router } from "express";
import { courseRoutes } from "./course-routes";
import { userRoutes } from "./user-routes";
import { storageRoutes } from "./storage-routes";

const appRoutes = Router();

appRoutes.use("/users", userRoutes);
appRoutes.use("/courses", courseRoutes);
appRoutes.use("/storage", storageRoutes)
export { appRoutes };
