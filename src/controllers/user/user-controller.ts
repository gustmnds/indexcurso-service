import { Request, Response } from "express";
import { UserService } from "../../services/user-service";
import { AuthUserSchema } from "./user-schema";

export class UserController {
    public static async auth(req: Request, res: Response) {
        const authUserDto = await AuthUserSchema.parseAsync(req.body);
        const result = await UserService.auth(authUserDto);
        return res.status(200).json(result);
    }
}
