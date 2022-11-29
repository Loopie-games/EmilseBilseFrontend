import http from "../http-common"
import {CreateGameDto, GameDTO, Lobby} from "../models/game/gameInterfaces";

class LobbyService {
    startGame(createGameDto: CreateGameDto) {
        return http.post<string>("/Game",createGameDto);
    }

    startFFA(createGameDto: CreateGameDto) {
        return http.post<string>("/FFA",createGameDto);
    }

    startShared(createGameDto: CreateGameDto){
        return http.post<string>("/Shared",createGameDto);
    }

    closeLobby(lobbyId: string) {
        return http.delete<boolean>("/Lobby/CloseLobby?lobbyId=" + lobbyId);
    }

    async create(){
        return http.post<Lobby>("/Lobby/");
    }
}
export default new LobbyService();