import http from "../http-common"
import {UserTile, TileNewFromUser } from "../models/tile/tileInterface";

class userTileService {

    getTilesAboutUser = async (userId: string) => {
        return await http.get<UserTile[]>(`UserTile/GetAboutUserById?id=${userId}`)
    }
    getCreatedTiles = async (userId: string) => {
        return await http.get<UserTile[]>(`UserTile/GetMadeByUserId?userId=${userId}`)
    }
    createTile = async (tile: TileNewFromUser) => {
        return await http.post<UserTile>(`/UserTile/Create`, tile)
    }
    deleteTile = async (tileId: string) => {

    }
}
export default new userTileService();