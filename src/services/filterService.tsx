import { Friend } from "../models/friendship/friendInterface";

class FilterService {

    filterForFriends = (query: string, listToFilter: Friend[]) => {

        if (query === '' && query === null && query === undefined) {
            return listToFilter;
        }
        else {

            const copyOfList = [...listToFilter];
            const filteredList = copyOfList.filter((friend: Friend) => {
                return friend.user.nickname.toLowerCase().includes(query.toLowerCase())
                || friend.user.username.toLowerCase().includes(query.toLowerCase());
            });
            return filteredList;
        }
    }
}
export default new FilterService();