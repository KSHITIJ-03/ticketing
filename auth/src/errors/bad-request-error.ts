import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) { // this is quiet important
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeErrors() {
        return [{
            message : this.message
        }]
    }
}