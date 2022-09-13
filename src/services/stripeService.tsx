
import http from "../http-common"
import { newTilepackDTO } from "../models/stripe/stripeInterface";

class StripeService {
    async getProducts() {
        return await http.get("/products")
    }

    async createTilePack(tilePack: newTilepackDTO) {
        return await http.post("/tilepack", {
            icon: tilePack.icon,
            name: tilePack.name,
            price: tilePack.price,
            discount: tilePack.discount,
            tiles: tilePack.tiles
        })
    }

}
export default new StripeService();