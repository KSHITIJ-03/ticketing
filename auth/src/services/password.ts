import {scrypt, randomBytes} from 'crypto';
import {promisify} from 'util'

const scryptAsync = promisify(scrypt)

// There’s no need to create an object because the methods don’t rely on instance-specific data.
// No extra object creation
// The Password class is more of a utility class than a blueprint for objects.
// Can be called without creating an instance of the class.
// Typically used for helper functions, utilities, or operations that don’t rely on object state.
// Can still access other static properties or methods of the class.
// Cannot access instance properties or methods (because they don’t belong to any specific object).


export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = await scryptAsync(password, salt, 64) as Buffer
        return `${buf.toString('hex')}.${salt}`;
    }

    static async comparePassword(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = await scryptAsync(suppliedPassword, salt, 64) as Buffer
        return buf.toString('hex') === hashedPassword
    }
}