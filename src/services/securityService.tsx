
const bcrypt = require('bcryptjs');
class SecurityService {
    generateSalt = () => {
        return bcrypt.genSaltSync(10);
    }

    hashPassword = (password: string, salt: string) => {
        return bcrypt.hashSync(password, salt);
    }

    comparePassword = async (password: string, hash: string) => {
        return await this.hashPassword(password, bcrypt.getSalt(hash)) === hash;
    }
}
export default new SecurityService();