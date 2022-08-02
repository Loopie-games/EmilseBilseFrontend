import { UserDTO, CreateUserDTO } from "../models/user/userInterface";
import http from "../http-common"

class UserService{
    async createUser(data: CreateUserDTO){
        return http.post("/User/CreateUser", data)
    }
}
export default new UserService();