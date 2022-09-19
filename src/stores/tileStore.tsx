import { action, makeAutoObservable, observable } from "mobx";
import {UserTile, TileNewFromUser, TilePack } from "../models/tile/tileInterface";
import tilePackService from "../services/tilePackService";
import tileService from "../services/tileService";

export class TileStore {
    deleteTile(id: string) {
        throw new Error('Method not implemented.');
    }
    @observable tilesAboutUser: UserTile[] | undefined;
    @observable createdTiles: UserTile[] | undefined;
    @observable createdtile: UserTile | undefined;
    @observable tilepacks: TilePack[] = []

    constructor() {
        makeAutoObservable(this);
    }


    @action
    getAllTilepacks = async () =>{
        const response =await tilePackService.getAll();
        this.tilepacks = response.data
        return response.data
    }


    @action
    getTilesAboutUser = async (userId: string) => {
        const response = await (await tileService.getTilesAboutUser(userId));
        this.tilesAboutUser = response.data;
    }
    @action
    getCreatedTiles = async (userId: string) => {
        const response = await tileService.getCreatedTiles(userId);
        this.createdTiles = response.data;
    }

    @action
    createNewTile_User = async (tile: TileNewFromUser) => {
        const response = await tileService.createTile(tile)
        this.createdtile = response.data
        return response;
    }

}