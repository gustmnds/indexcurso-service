import { WebError } from "./web-errors";

export class CredentialsNotMatchError extends WebError {
    constructor() {
        super(400, "CREDENTIALS_NOT_MATCH", "Unable to find a user with these credentials.");
    }
}
