import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";
export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(public errors: ValidationError[]) {
        super('some validation error')
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }
    serializeErrors() {
        return this.errors.map((error) => {
            if (error.type === 'field') {
                return { message: error.msg, field: error.path };
            }
            return { message: error.msg };
        })
    }

    // serializeErrors2() {
    //     return this.errors.map((error) => {
    //         return { message: error.msg, field: error.path || 'unknown' };  // Return all errors, even if no 'type' is set
    //     });
    // }
}