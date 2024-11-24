import { ZodError } from "zod";
import { WebError } from "./web-errors";

export class BadInputError extends WebError {
    constructor(private readonly err: ZodError) {
        super(400, "BAD_INPUT", "Unable to process the request due to invalid input.");
    }

    public buildResponseMessage() {
        const details: { [key: string]: string[] } = {};

        this.err.errors.forEach(error => {
            const path = error.path.join(".");
            if (!details[path]) {
                details[path] = [];
            }
            details[path].push(error.message);
        });

        return {
            ...super.buildResponseMessage(),
            details
        };
    }
}
