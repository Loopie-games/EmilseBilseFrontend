import http from "../http-common"
import {TileDTO, TileForUser, TileNewFromUser } from "../models/tile/tileInterface";

class userTileService {

    getTilesAboutUser = async (userId: string) => {
        return await http.get<TileDTO[]>(`UserTile/GetAboutUserById?id=${userId}`)
    }
    getCreatedTiles = async (userId: string) => {
        return await http.get<TileDTO[]>(`UserTile/GetMadeByUserId?userId=${userId}`)
    }
    createTile = async (tile: TileNewFromUser) => {
        return await http.post<TileDTO>(`/UserTile/Create`, tile)
    }
    deleteTile = async (tileId: string) => {

    }
}
export default new userTileService();