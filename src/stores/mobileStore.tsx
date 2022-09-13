import { action, makeAutoObservable, observable } from "mobx";

export class MobileStore {
    @observable isMobile: boolean = false;

    @action
    setIsMobile = (isMobile: boolean) => {
        this.isMobile = isMobile;
    }

    constructor() {
        makeAutoObservable(this);
    }
}