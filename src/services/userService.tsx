import { CreateUserDTO, SimpleUserDTO } from "../models/user/userInterface";
import http from "../http-common"

class UserService {
    getSaltByUsername(username: string) {
        return http.get("/User/GetSalt/" + username)
    }

    getById(userId: string) {
        return http.get("/User/" + userId)
    }

    async createUser(data: any) {
        return http.post(decodeURI("/User/CreateUser"), data)
    }

    async search(searchStr: string){
        return http.get<SimpleUserDTO[]>("User/Search/" + searchStr)
    }

    async login(data: any) {
        return http.post("/Auth", data)
    }
}
export default new UserService();