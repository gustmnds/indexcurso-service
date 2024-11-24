import { Router } from "express";
import { CourseCotroller } from "../controllers/course/course-controller";
import { AuthorizationMiddleware } from "../middlewares/authorization-middleware";

const courseRoutes = Router();

courseRoutes.get("/", CourseCotroller.search);
courseRoutes.get("/:id", CourseCotroller.find);
courseRoutes.post("/", AuthorizationMiddleware, CourseCotroller.create);
courseRoutes.patch("/:id", AuthorizationMiddleware, CourseCotroller.update);
courseRoutes.delete("/:id", AuthorizationMiddleware, CourseCotroller.delete);

export { courseRoutes }
