import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/errors/unauthorized-error";
import jwt from "jsonwebtoken";
import { Configs } from "../configs";

export function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
        throw new UnauthorizedError();
    }

    const [prefix, value] = token.split(" ");

    if (prefix !== "Bearer" || !value) {
        throw new UnauthorizedError();
    }

    try {
        jwt.verify(value, Configs.JWT_SECRET);
        return next();
    } catch (err) {

    }

    throw new UnauthorizedError();
}
