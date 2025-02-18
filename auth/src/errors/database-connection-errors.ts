import { ValidationError } from "express-validator";

export class DataBaseConnectionError extends Error {
    statusCode = 500
    reason = 'database connection error';
    constructor() {
        super()
        Object.setPrototypeOf(this, DataBaseConnectionError.prototype)
    }
    serializeErrors() {
        return {
            errors : [{
                message : this.reason
            }]
        }
    }
}