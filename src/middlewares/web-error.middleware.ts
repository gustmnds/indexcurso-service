import { NextFunction, Request, Response } from "express";
import { WebError } from "../utils/errors/web-errors";

const INTERNAL_SERVER_ERROR = new WebError(500, "Internal Server Error");

export function WebErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof WebError) {
        return res
            .status(err.code)
            .json(err.buildResponseMessage());
    }

    return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.buildResponseMessage());
}