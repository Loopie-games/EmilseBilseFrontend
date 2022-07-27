import { action, makeAutoObservable, observable } from "mobx";
import { loginDto, User } from "../models/auth/authInterfaces";
import authService from "../services/authService";



export class AuthStore {
    @observable user: User | undefined;

    @action
    login = async (data: loginDto) => {
        const response = await authService.attemptLogin(data)
        this.user = response.data;
    }



    constructor() {
        makeAutoObservable(this);
    }
}