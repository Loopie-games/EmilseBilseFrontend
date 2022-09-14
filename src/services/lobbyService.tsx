import http from "../http-common"
import { Lobby } from "../models/game/gameInterfaces";

class LobbyService {
    closeLobby(lobbyId: string) {
        return http.delete<boolean>("/Lobby/CloseLobby?lobbyId=" + lobbyId);
    }

    async create(){
        return http.post<Lobby>("/Lobby/");
    }



}
export default new LobbyService();