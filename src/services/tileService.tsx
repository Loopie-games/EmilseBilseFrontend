import http from "../http-common"
import {UserTile, TileNewFromUser, Tile } from "../models/tile/tileInterface";

class tileService {

    getUsedInPacks= async () => {
        return await http.get<Tile[]>(`PackTile/GetTilesUsedInPacks`)
    }
}
export default new tileService();