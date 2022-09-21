import http from "../http-common"
import {PackTile, TilePack} from "../models/tile/tileInterface";

class packTileService {

    getByPackId = async (packId:string) => {
        return await http.get<PackTile[]>("/PackTile/GetByPackId/" + packId)
    }

}

export default new packTileService();