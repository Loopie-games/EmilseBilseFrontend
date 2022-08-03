import { CreateUserDTO } from "../models/user/userInterface";
import http from "../http-common"

class UserService{

    getById(userId: string) {
        return http.get("/User/"+ userId)
    }

    async createUser(data: CreateUserDTO){
        return http.post("/User/CreateUser", data)
    }

    async login(data: any) {
        return http.post("/User/Login", data)
    }
}
export default new UserService();