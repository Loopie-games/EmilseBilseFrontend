import { action, makeAutoObservable, observable } from "mobx";
import { loginDto, User } from "../models/auth/authInterfaces";
import { POPUP_STATES } from "../models/popup/popupInterface";
import authService from "../services/authService";

export class PopupStore {
    @observable isShown: boolean = false;
    @observable errorMessage: string = '';
    @observable title: string = ""
    @observable type: POPUP_STATES | undefined ;
    @observable onConfirm: Function | undefined;
    @observable onCancel: Function | undefined;

    @action show = () => {
        this.isShown = true;
    }

    @action hide = () => {
        this.isShown = false;
    }

    @action setTitle = (title: string) => {
        this.title = title;
    }

    @action setOnConfirm = (func: Function) => {
        this.onConfirm = func;
    }

    @action setOnCancel = (func: Function) => {
        this.onCancel = func;
    }

    @action setErrorMessage = (errorMessage: string) => {
        this.errorMessage = errorMessage;
    }

    @action setType = (type: POPUP_STATES) => {
        this.type = type;
    }

    showConfirmation(title: string, message: string, onConfirm: Function, onCancel: Function){
        this.setErrorMessage(message);
        this.setTitle(title);
        this.setOnConfirm(async () => {
            this.hide();
            onConfirm();
        })
        this.setOnCancel(async () => {
            this.hide();
            onCancel();

        })
        this.setType(POPUP_STATES.Confirmation);
        this.show();
    }

    showError(title: string, message: string){
        this.setErrorMessage(message);
        this.setTitle(title);
        this.setOnCancel(() => {
            this.hide();
        })
        this.setType(POPUP_STATES.Information);
        this.show();
    }

    showBug(title: string, message: string){
        this.setErrorMessage(message);
        this.setTitle(title);
        this.setOnConfirm(async () => {
            this.hide();
            // onConfirm();
        })
        this.setOnCancel(async () => {
            this.hide();
            // onCancel();
        })
        this.setType(POPUP_STATES.Bug);
        this.show();
    }

    showFeedback(title: string, message: string){
        this.setErrorMessage(message);
        this.setTitle(title);
        this.setOnConfirm(async () => {
            this.hide();
            // onConfirm();
        })
        this.setOnCancel(async () => {
            this.hide();
            // onCancel();
        })
        this.setType(POPUP_STATES.Feedback);
        this.show();
    }
    
    constructor() {
        makeAutoObservable(this);
    }
}