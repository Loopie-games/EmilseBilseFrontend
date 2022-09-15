import { action, makeAutoObservable, observable } from "mobx";

export class ThemeStore {

    @observable theme: string | undefined;

    @action
    setTheme = () => {
        localStorage.getItem('theme') ?? localStorage.setItem('theme', 'light');
        this.theme = localStorage.getItem('theme') ?? 'light';
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') ?? 'light');
    }

    @action
    toggleTheme = () => {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', localStorage.getItem('theme') === 'light' ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme')!);
    }

    constructor() {
        makeAutoObservable(this);
    }
}