import { action, makeAutoObservable, observable } from "mobx";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, UserDTO } from "../models/user/userInterface";
import securityService from "../services/securityService";
import userService from "../services/userService";

export class UserStore {


    @observable user: UserDTO | undefined;
    @observable loginResponse: LoginResponseDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (data: CreateUserDTO) => {
        data.salt = decodeURIComponent(await securityService.generateSalt());
        data.password = decodeURIComponent(await securityService.hashPassword(data.password, data.salt));
        console.log(data)
        let response = await userService.createUser(data)
        console.log(response)
        this.user = response.data
    }

    @action
    getById = async (userId: string) => {
        const response = await userService.getById(userId)
        this.user = response.data

        console.log(this.user);

    }

    @action
    login = async (data: LoginDTO) => {
        localStorage.removeItem("token")
        await localStorage.removeItem("userId");

        const salt = await (await userService.getSaltByUsername(data.username)).data;
        if(salt === null){
            return
        }
        const password = await securityService.hashPassword(data.password, salt);

        data.password = password;

        const response = await userService.login({ username: data.username, password: data.password });
        this.loginResponse =  await response.data;
        console.log(this.loginResponse)
        if (this.loginResponse !== undefined) {
            await localStorage.setItem("token", this.loginResponse?.jwt);
            await localStorage.setItem("userId", this.loginResponse.uuid);
            await this.getById(this.loginResponse.uuid)
        }
        return this.loginResponse;
    }

    @action
    logout() {
        localStorage.removeItem("userId");
        this.user = undefined;
    }
}