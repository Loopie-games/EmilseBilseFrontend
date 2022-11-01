import http from "../http-common"
import {BoardTileDTO, TileNewFromUser } from "../models/tile/tileInterface";

class boardService {
    async getByBoardId(boardId: string ) {
        return http.get<BoardTileDTO[]>("/BoardTile/GetByBoardId/" + boardId)
    }

    async getBoard(gameId: string) {
        return http.get<BoardTileDTO[]>("/BoardTile/GetByGameId/" + gameId)
    }

}
export default new boardService();