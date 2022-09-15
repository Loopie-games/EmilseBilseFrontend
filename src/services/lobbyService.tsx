import http from "../http-common"
import {GameDTO, Lobby } from "../models/game/gameInterfaces";

class LobbyService {
    startGame(id: string) {
        return http.post<GameDTO>("/Game?lobbyId=" + id);
    }
    closeLobby(lobbyId: string) {
        return http.delete<boolean>("/Lobby/CloseLobby?lobbyId=" + lobbyId);
    }

    async create(){
        return http.post<Lobby>("/Lobby/");
    }



}
export default new LobbyService();