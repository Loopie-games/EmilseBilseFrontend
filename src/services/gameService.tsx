import http from "../http-common"
import {GameDTO, GameNameChangeDto} from "../models/game/gameInterfaces";
import { SimpleUserDTO } from "../models/user/userInterface";

class GameService {

    async getById(gameId:string){
        return http.get<GameDTO>("/Game/" + gameId);
    }

    async getPlayers(gameId: string) {
        return http.get<SimpleUserDTO[]>("/Game/GetPlayers/" + gameId);
    }

    async getEndedGames() {
        return http.get<GameDTO[]>("/Game/GetEnded/");
    }

    async setName(gn: GameNameChangeDto){
        return http.put<GameDTO>("/Game/SetName", gn)
    }



}
export default new GameService();