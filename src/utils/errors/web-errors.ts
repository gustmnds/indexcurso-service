export class WebError extends Error {
    constructor(public readonly code: number, message: string) {
        super(message);
    }

    public buildResponseMessage() {
        return {
            code: this.code,
            message: this.message
        }
    }
}