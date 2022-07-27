
import http from "../http-common"
import { loginDto, User } from "../models/auth/authInterfaces";

class AuthService {
    async test() {
        return await http.get("/user");
    }
    async attemptLogin(data: loginDto) {
        return http.post<User>("/Auth/Login", data);
    }
}
export default new AuthService();