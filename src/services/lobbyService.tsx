import http from "../http-common"
import {CreateGameDto, GameDTO, Lobby} from "../models/game/gameInterfaces";

class LobbyService {
    startGame(createGameDto: CreateGameDto) {
        return http.post<GameDTO>("/Game",createGameDto);
    }

    startFFA(createGameDto: CreateGameDto) {
        return http.post<GameDTO>("/FFA",createGameDto);
    }

    closeLobby(lobbyId: string) {
        return http.delete<boolean>("/Lobby/CloseLobby?lobbyId=" + lobbyId);
    }

    async create(){
        return http.post<Lobby>("/Lobby/");
    }
}
export default new LobbyService();