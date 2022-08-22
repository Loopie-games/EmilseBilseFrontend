import http from "../http-common"
import { SimpleUserDTO } from "../models/user/userInterface";

class GameService {

    async getPlayers(gameId: string) {
        return http.get<SimpleUserDTO[]>("/Game/GetPlayers/" + gameId);
    }

}
export default new GameService();