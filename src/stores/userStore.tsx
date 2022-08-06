import { action, makeAutoObservable, observable } from "mobx";
import {CreateUserDTO, LoginDTO, LoginResponseDTO, UserDTO} from "../models/user/userInterface";
import securityService from "../services/securityService";
import userService from "../services/userService";

export class UserStore {

    @observable user: UserDTO | undefined;
    @observable loginResponse: LoginResponseDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (data: CreateUserDTO) =>{
        data.salt = securityService.generateSalt();
        data.password = securityService.hashPassword(data.password, data.salt);
        console.log(data);
        
        //@TODO, reImplement when salt is implemented in backend table
        //const response = await userService.createUser(data)
        //this.user = response.data
    }

    @action
    getById = async (userId: string) =>{
        const response = await userService.getById(userId)
        this.user = response.data
    }

    @action
    login = async(data: LoginDTO) => {
        const response = await userService.login(data)
        this.loginResponse = response.data;
        console.log(this.loginResponse)
        if(this.loginResponse?.isValid){
            localStorage.setItem("userId", this.loginResponse.userId);
            this.getById(this.loginResponse.userId)
        }
    }
}