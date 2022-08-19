import http from "../http-common"
import {BoardTileDTO, TileForUser, TileNewFromUser } from "../models/tile/tileInterface";

class boardService {
    async getByBoardId(boardId: string ) {
        return http.get<BoardTileDTO[]>("/BoardTile/GetByBoardId/" + boardId)
    }

}
export default new boardService();