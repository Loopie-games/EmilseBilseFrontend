import { action, makeAutoObservable, observable } from "mobx";
import {CreateUserDTO, LoginDTO, LoginResponseDTO, UserDTO} from "../models/user/userInterface";
import userService from "../services/userService";

export class UserStore {

    @observable user: UserDTO | undefined;
    @observable loginResponse: LoginResponseDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (data: CreateUserDTO) =>{
        const response = await userService.createUser(data)
        this.user = response.data
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
            this.getById(this.loginResponse.userId)
        }
    }
}