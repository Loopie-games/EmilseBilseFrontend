import http from "../http-common"
import { TileForUser, TileNewFromUser } from "../models/tile/tileInterface";

class tileService {

    getTilesAboutUser = async (userId: string) => {
        return await http.get<TileForUser[]>(`/tiles/GetTilesForUser/${userId}`)
    }
    getCreatedTiles = async (userId: string) => {
        return await http.get<TileForUser[]>(`/Tile/GetCreatedTiles/${userId}`)
    }
    createTile = async (tile: TileNewFromUser) => {
        return await http.post<TileForUser>(`/Tile/Create`, tile)
    }
    deleteTile = async (tileId: string) => {
        return await http.delete(`/Tile/Delete/${tileId}`)
    }
}
export default new tileService();