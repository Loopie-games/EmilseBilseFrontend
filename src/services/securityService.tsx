
const bcrypt = require('bcryptjs');
class SecurityService {
    generateSalt = async () => {
        return await bcrypt.genSalt(10);
    }

    hashPassword = async (password: string, salt: string) => {
        return await bcrypt.hash(password, salt);
    }

    comparePassword = async (password: string, hash: string) => {
        return await this.hashPassword(password, bcrypt.getSalt(hash)) === hash;
    }
}
export default new SecurityService();