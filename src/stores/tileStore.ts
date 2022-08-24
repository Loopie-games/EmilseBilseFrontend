import { action, makeAutoObservable, observable } from "mobx";
import { TileForUser, TileNewFromUser } from "../models/tile/tileInterface";
import tileService from "../services/tileService";

export class TileStore {
    @observable tilesAboutUser: TileForUser[] | undefined;
    @observable createdtile: TileForUser | undefined

    constructor() {
        makeAutoObservable(this);
    }

    @action
    getAboutUserById_TileForUser = async (userId: string) => {
        const response = await tileService.getAboutUserById_TileForUser(userId)
        this.tilesAboutUser = response.data
        return response;
    }

    @action
    createNewTile_User = async (tile: TileNewFromUser) => {
        const response = await tileService.createTile(tile)
        this.createdtile = response.data
        return response;
    }

}