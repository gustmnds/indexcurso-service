import { NextFunction, Request, Response } from "express";
import { WebError } from "../utils/errors/web-errors";
import { InternalError } from "../utils/errors/internal-error";
import { BadInputError } from "../utils/errors/bad-input-error";
import { ZodError } from "zod";

const INTERNAL_SERVER_ERROR = new InternalError();

export function WebErrorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
    let webError: WebError = INTERNAL_SERVER_ERROR;

    if (err instanceof ZodError) {
        webError = new BadInputError(err);
    } else if (err instanceof WebError) {
        webError = err;
    } else {
        console.error("Error:", err);
    }

    return res
        .status(webError.status)
        .json(webError.buildResponseMessage());
}
