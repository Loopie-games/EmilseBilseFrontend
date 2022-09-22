import http from "../http-common"
import {PackTile, PackTileDto} from "../models/tile/tileInterface";

class packTileService {

    getByPackId = async (packId: string) => {
        return await http.get<PackTile[]>("/PackTile/GetByPackId/" + packId)
    }

    addTileToPack = async (pt: PackTileDto) => {
        return await  http.post<PackTile>("/PackTile/AddToTilePack", pt)
    }

    clearPack = async(packId:string) =>{
        return await  http.delete<boolean>("PackTile/ClearPack?id=" + packId)
    }
}

export default new packTileService();