import { z } from "zod";
import { AuthUserSchema } from "../controllers/user/user-schema";
import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Configs } from "../configs";
import { CredentialsNotMatchError } from "../utils/errors/credentials-not-match-error";

export class UserService {
    public static async auth(authUserDto: z.infer<typeof AuthUserSchema>) {
        const user = await prisma.users.findUnique({
            where: { email: authUserDto.email }
        });

        if (!user) {
            throw new CredentialsNotMatchError();
        }

        if (bcrypt.compareSync(user.password, authUserDto.password, )) {
            throw new CredentialsNotMatchError();
        }

        const token = jwt.sign({ id: user.id, role: user.role }, Configs.JWT_SECRET, { expiresIn: "1d" });

        return { token };
    }
}
