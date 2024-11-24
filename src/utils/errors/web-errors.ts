export class WebError extends Error {
    constructor(public readonly status: number, public readonly code: string,  message: string) {
        super(message);
    }

    public buildResponseMessage() {
        return {
            status: this.status,
            code: this.code,
            message: this.message
        }
    }
}
