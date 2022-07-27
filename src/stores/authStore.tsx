import { action, makeAutoObservable, observable } from "mobx";
import { loginDto, User } from "../models/auth/authInterfaces";
import authService from "../services/authService";

export class AuthStore {
    @observable user: User | undefined;
    @observable t: any;

    @action
    login = async (data: loginDto) => {
        const response = await authService.attemptLogin(data)
        this.user = response.data;
    }

    @action
    test = async () => {
        const response = await authService.test();
        console.log(response);
        
        this.t = response.data;
    }

    constructor() {
        makeAutoObservable(this);
    }
}