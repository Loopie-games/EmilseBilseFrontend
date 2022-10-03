import http from "../http-common"
import {Tile } from "../models/tile/tileInterface";

class tileService {

    getUsedInPacks= async () => {
        return await http.get<Tile[]>(`PackTile/GetTilesUsedInPacks`)
    }

    getAll = async () =>{
        return await http.get<Tile[]>('Tile')
    }
}
export default new tileService();