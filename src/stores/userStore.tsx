import { action, makeAutoObservable, observable } from "mobx";
import { useHref } from "react-router-dom";
import { CreateUserDTO, LoginDTO, LoginResponseDTO, SimpleUserDTO, UserDTO, admin } from "../models/user/userInterface";
import cloudinaryService from "../services/cloudinaryService";
import securityService from "../services/securityService";
import userService from "../services/userService";

export class UserStore {

    @observable user: SimpleUserDTO | undefined;
    @observable loginResponse: LoginResponseDTO | undefined;
    @observable admin: admin | undefined;

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
    update = async (data: UserDTO) => {
        //TODO: Send data about the new user-fields to backend with proper ID for updating in the database
        const res = await userService.update(data);
        return res.data;
    }

    @action
    getUserById = async (userId: string) => {
        const response = await userService.getById(userId)
        return response.data;
    }

    @action
    login = async (data: LoginDTO) => {
        localStorage.removeItem("token")

        const salt = await (await userService.getSaltByUsername(data.username)).data;
        if (salt === null) {
            throw new Error("No user with given username, check your spelling")
        }
        const password = await securityService.hashPassword(data.password, salt);

        data.password = password;

        const response = await userService.login({ username: data.username, password: data.password });
        this.loginResponse = await response.data;
        if (this.loginResponse !== undefined) {
            localStorage.setItem("token", this.loginResponse?.jwt);
            await this.getLogged();
        }

        return this.loginResponse;
    }

    @action
    async getLogged() {
        const response = await userService.getLogged()
        function instanceOfAdmin(object: any): object is admin {
            return 'adminId' in object;
        }
        if (instanceOfAdmin(response.data)) {
            this.admin = response.data
        }
        this.user = response.data
        return response.data
    }

    @action
    logout() {
        localStorage.removeItem("token");
        this.user = undefined;
        this.admin = undefined;
        this.loginResponse = undefined;
    }

    @action
    search = async (searchstr: string) => {
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

    @action
    validateUsername(username: string) {
        //TODO validate username in backend
        return true
    }
}