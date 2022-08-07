
const bcrypt = require('bcryptjs');
class SecurityService {
    generateSalt(): string {
        return bcrypt.genSalt(10);
    }

    hashPassword(password: string, salt: string): string {
        return bcrypt.hash(password, salt);
    }

    comparePassword(password: string, hash: string): boolean {
        return this.hashPassword(password, bcrypt.getSalt(hash)) === hash;
    }
}
export default new SecurityService();