import { action, makeAutoObservable, observable } from "mobx";
import { loginDto, User } from "../models/auth/authInterfaces";
import { newTilepackDTO } from "../models/stripe/stripeInterface";
import authService from "../services/authService";
import stripeService from "../services/stripeService";

export class StripeStore {
    @observable products: any[] = [];
    @observable clientSecret: string | undefined;
    @action async createTilePack(tilePack: newTilepackDTO) {
        const response = await stripeService.createTilePack(tilePack);
        return;
    }

    @action async getProducts() {
        const response = await stripeService.getProducts();
        this.products = response.data;
        return;
    }

    @action async getClientSecret() {
        const response = await stripeService.getClientSecret();
        this.clientSecret = response.data;
        return;
    }

    constructor() {
        makeAutoObservable(this);
    }
}