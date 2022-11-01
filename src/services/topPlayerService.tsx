import http from "../http-common"
import { GameDTO, TopPlayer } from "../models/game/gameInterfaces";
import { SimpleUserDTO } from "../models/user/userInterface";

class TopPlayerService {

    async getTop3(gameId:string){
        return http.get<TopPlayer[]>("/TopPlayer/FindTop3?gameId=" + gameId);
    }

}
export default new TopPlayerService();