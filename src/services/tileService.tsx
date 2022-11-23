import http from "../http-common"
import {idkTile } from "../models/tile/tileInterface";

class tileService {

    getUsedInPacks= async () => {
        return await http.get<idkTile[]>(`Tile/GetTilesUsedInPacks`)
    }

    getAll = async () =>{
        return await http.get<idkTile[]>('Tile')
    }
}
export default new tileService();