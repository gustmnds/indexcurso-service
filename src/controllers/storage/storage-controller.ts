import { Request, Response } from "express";
import { FindStorageSchema } from "./storage-schema";
import { StorageService } from "../../services/storage-service";

export class StorageController {
    public static async find(req: Request, res: Response) {
        const findStorageDto = await FindStorageSchema.parseAsync(req.params);
        const result = await StorageService.findImage(findStorageDto.id);

        return res
            .setHeader("Content-Type", "image/png")
            .status(200)
            .send(result);
    }
}
