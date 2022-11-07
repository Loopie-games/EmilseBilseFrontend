import http from "../http-common"
import {GameMode} from "../models/gameMode/gameModeInterfaces";


class gameModeService {

    getAll = async () => {
        return await http.get<GameMode[]>("/GameMode")
    }
}

export default new gameModeService();