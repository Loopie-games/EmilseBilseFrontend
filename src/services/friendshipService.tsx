import http from "../http-common"
import { Friend } from "../models/friendship/friendInterface";

class FriendshipService {

    async getFriendsByUserId(userId: string) {
        return http.get<Friend[]>("/Friendship/GetFriendsByUserId?userId=" + userId);
    }

    async searchUsers(searchstr: string){
        return http.get<Friend[]>("Friendship/SearchUsers/" + searchstr)
    }
}
export default new FriendshipService();