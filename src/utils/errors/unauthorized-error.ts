import { WebError } from "./web-errors";

export class UnauthorizedError extends WebError {
    constructor() {
        super(401, "UNAUTHORIZED", "Authentication required.")
   }
}
