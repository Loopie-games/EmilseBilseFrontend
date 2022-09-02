import { action, makeAutoObservable, observable } from "mobx";
import { loginDto, User } from "../models/auth/authInterfaces";
import authService from "../services/authService";

export class PopupStore {
    @observable isShown: boolean = false;
    @observable errorMessage: string = '';
    
    @action show = () => {
        this.isShown = true;
    }

    @action hide = () => {
        this.isShown = false;
    }

    @action setErrorMessage = (errorMessage: string) => {
        this.errorMessage = errorMessage;
    }
    
    constructor() {
        makeAutoObservable(this);
    }
}