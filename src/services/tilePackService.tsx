import http from "../http-common"
import {TilePack} from "../models/tile/tileInterface";

class tilePackService {

    getAll = async () => {
        return await http.get<TilePack[]>("/TilePack")
    }

    create = async (toCreate: TilePack) => {
        return await http.post<TilePack>("/TilePack", toCreate)
    }

}

export default new tilePackService();