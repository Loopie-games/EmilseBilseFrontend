import { action, makeAutoObservable, observable } from "mobx";
import {CreateUserDTO, UserDTO } from "../models/user/userInterface";
import userService from "../services/userService";

export class UserStore{
    @observable user: UserDTO | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    create = async (data: CreateUserDTO) =>{
        const response = await userService.createUser(data)
        this.user = response.data
    }
}