import { CustomError } from "./custom-error";

export class NotAuthourizedError extends CustomError {
    constructor() {
        super('Not Authorized');
        Object.setPrototypeOf(this, NotAuthourizedError.prototype)
    }
    statusCode = 401;
    serializeErrors() {
        return [{ message: 'Not Authorized'}]
    }
}