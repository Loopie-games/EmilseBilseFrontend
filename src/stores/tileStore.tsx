import {action, makeAutoObservable, observable} from "mobx";
import {UserTile, TileNewFromUser, TilePack} from "../models/tile/tileInterface";
import tilePackService from "../services/tilePackService";
import userTileService from "../services/userTileService";
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
    getAllTilepacks = async () => {
        const response = await tilePackService.getAll();
        this.tilepacks = response.data
        return response.data
    }

    @action
    getTilePackById = async(id: string) =>{
        const response = await tilePackService.getById(id);
        return response.data;
    }

    @action
    createTilePack = async (toCreate: TilePack) => {
        const response = await tilePackService.create(toCreate);
        return response.data
    }

    @action
    getTilesAboutUser = async (userId: string) => {
        const response = await (await userTileService.getTilesAboutUser(userId));
        this.tilesAboutUser = response.data;
    }
    @action
    getCreatedTiles = async (userId: string) => {
        const response = await userTileService.getCreatedTiles(userId);
        this.createdTiles = response.data;
    }

    @action
    createNewTile_User = async (tile: TileNewFromUser) => {
        const response = await userTileService.createTile(tile)
        this.createdtile = response.data
        return response.data;
    }

    @action
    getTilesUsedInPacktiles = async () => {
        const response = await tileService.getUsedInPacks();
        return response.data
    }

    @action
    getAll = async () => {
        const response = await tileService.getAll();
        return response.data
    }

}