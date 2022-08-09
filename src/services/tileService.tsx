import http from "../http-common"
import { TileForUser, TileNewFromUser } from "../models/tile/tileInterface";

class tileService {

    async getAboutUserById_TileForUser(userId: string) {
        return http.get<TileForUser[]>("/Tile/GetAboutUserById_TileForUser?id=" + userId);
    }


    async createTile(tile: TileNewFromUser) {
        return http.post<TileForUser>("/Tile/Create", tile)
    }
}
export default new tileService();