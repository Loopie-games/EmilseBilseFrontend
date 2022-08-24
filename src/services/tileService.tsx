import http from "../http-common"
import {TileDTO, TileForUser, TileNewFromUser } from "../models/tile/tileInterface";

class tileService {

    getTilesAboutUser = async (userId: string) => {
        return await http.get<TileDTO[]>(`Tile/GetAboutUserById?id=${userId}`)
    }
    getCreatedTiles = async (userId: string) => {
        return await http.get<TileDTO[]>(`Tile/GetMadeByUserId?userId=${userId}`)
    }
    createTile = async (tile: TileNewFromUser) => {
        return await http.post<TileDTO>(`/Tile/Create`, tile)
    }
    deleteTile = async (tileId: string) => {
        return await http.delete(`/Tile/Delete/${tileId}`)
    }
}
export default new tileService();