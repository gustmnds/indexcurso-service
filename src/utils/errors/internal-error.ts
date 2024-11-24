import { WebError } from "./web-errors";

export class InternalError extends WebError {
    constructor() {
        super(500, "INTERNAL_ERROR", "Unable to process the request due to an internal error.");
    }
}
