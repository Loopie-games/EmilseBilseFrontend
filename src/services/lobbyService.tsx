import http from "../http-common"
import { Lobby } from "../models/game/gameInterfaces";

class LobbyService {

    async create(){
        return http.post<Lobby>("/Lobby/");
    }



}
export default new LobbyService();