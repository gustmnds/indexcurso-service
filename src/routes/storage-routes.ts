import { Router } from "express";
import { StorageController } from "../controllers/storage/storage-controller";

const storageRoutes = Router();

storageRoutes.get("/image/:id", StorageController.find);

export { storageRoutes }
