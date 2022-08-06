import http from "../http-common"
import { TileForUser } from "../models/tile/tileInterface";

class tileService {

    async getAboutUserById_TileForUser(userId: string) {
        return http.get<TileForUser[]>("/Tile/GetAboutUserById_TileForUser?id=" + userId);
    }
}
export default new tileService();