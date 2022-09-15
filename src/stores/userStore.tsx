import { action, makeAutoObservable, observable } from "mobx";
import { useHref } from "react-router-dom";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, UserDTO } from "../models/user/userInterface";
import cloudinaryService from "../services/cloudinaryService";
import securityService from "../services/securityService";
import userService from "../services/userService";

export class UserStore {
    deleteTile(id: string) {
        throw new Error('Method not implemented.');
    }


    @observable user: UserDTO | undefined;
    @observable loginResponse: LoginResponseDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (data: CreateUserDTO) => {
        data.salt = decodeURIComponent(await securityService.generateSalt());
        data.password = decodeURIComponent(await securityService.hashPassword(data.password, data.salt));
        let response = await userService.createUser(data)
        this.user = response.data
        return response.data;
    }

    @action
    getById = async (userId: string) => {
        const response = await userService.getById(userId)
        this.user = response.data
        return response.data;
    }

    @action
    getUserById = async (userId: string) => {
        const response = await userService.getById(userId)
        return response.data;
    }

    @action
    login = async (data: LoginDTO) => {
        localStorage.removeItem("token")
        await localStorage.removeItem("userId");

        const salt = await (await userService.getSaltByUsername(data.username)).data;
        if (salt === null) {
            return
        }
        const password = await securityService.hashPassword(data.password, salt);

        data.password = password;

        const response = await userService.login({ username: data.username, password: data.password });
        this.loginResponse = await response.data;
        if (this.loginResponse !== undefined) {
            await localStorage.setItem("token", this.loginResponse?.jwt);
            await localStorage.setItem("userId", this.loginResponse.uuid);
            await this.getById(this.loginResponse.uuid)
        }
        return this.loginResponse;
    }

    @action
    logout() {
        localStorage.clear();
        this.user = undefined;
    }

    @action
    search = async(searchstr: string) =>{
        const response = await userService.search(searchstr)
        return response.data
}

    @action
    updateProfilePic = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'profileImage');
        let newProfilePicURL = await cloudinaryService.uploadProfilePic(formData);
        console.log('====================================');
        console.log(newProfilePicURL);
        console.log('====================================');
        return newProfilePicURL;
    }
}