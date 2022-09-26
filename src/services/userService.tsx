import { CreateUserDTO, SimpleUserDTO, UserDTO } from "../models/user/userInterface";
import http from "../http-common"
import axios from "axios";

class UserService {
    async getLogged() {
        console.log(localStorage.getItem("token"));

        return http.get("/User/GetLogged", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
    }
    async getSaltByUsername(username: string) {
        return http.get("/User/GetSalt/" + username)
    }

    async getById(userId: string) {
        return http.get<SimpleUserDTO>("/User/" + userId)
    }

    async createUser(data: any) {
        return http.post(decodeURI("/User/CreateUser"), data)
    }

    async search(searchStr: string) {
        return http.get<SimpleUserDTO[]>("User/Search/" + searchStr)
    }

    async login(data: any) {
        return http.post("/Auth", data)
    }

    async update(data: UserDTO){
        return http.put("/User/" + data.id, data)
    }
}
export default new UserService();