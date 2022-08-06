import { action, makeAutoObservable, observable } from "mobx";
import { TileForUser } from "../models/tile/tileInterface";
import tileService from "../services/tileService";

export class TileStore {
    @observable tilesAboutUser: TileForUser[] | undefined;

    constructor() {
        makeAutoObservable(this);
    }

    @action
    getAboutUserById_TileForUser = async (userId: string) =>{
        const response = await tileService.getAboutUserById_TileForUser(userId)
        this.tilesAboutUser = response.data
    }

}