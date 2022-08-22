import http from "../http-common"
import { Friend } from "../models/friendship/friendInterface";

class FriendshipService {

    async getFriendsByUserId(userId: string) {
        return http.get<Friend[]>("/Friendship/GetFriendsByUserId?userId=" + userId);
    }

    async searchUsers(searchstr: string){
        return http.get<Friend[]>("Friendship/SearchUsers/" + searchstr)
    }

    async sendFriendRequest(userId: string){
        return http.post<Friend>("Friendship/SendFriendRequest?toUserId=" + userId)
    }
}
export default new FriendshipService();