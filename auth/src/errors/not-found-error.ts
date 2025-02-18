import { CustomError } from "./custom-error";

export class NotFoundError extends CustomError {
    statusCode = 404
    reason = 'unknown route'
    constructor() {
        super('unkown route')
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}