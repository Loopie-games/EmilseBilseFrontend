import { Friend } from "../models/friendship/friendInterface";
import { UserTile } from "../models/tile/tileInterface";

class FilterService {
    filterInAchievements(query: string, testAchievements: any[]) {
        
        if (query === '' && query === null && query === undefined) {
            return testAchievements;
        }
        else {
            const copyOfList = [...testAchievements];
            const filteredList = copyOfList.filter((achievement: any) => {
                return achievement.achievement.title.toLowerCase().includes(query.toLowerCase())
                || achievement.achievement.description.toLowerCase().includes(query.toLowerCase())
            });
            return filteredList;
        }
    }


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

    filterForTiles(query: string, listToFilter: UserTile[]) {
        if (query === '' && query === null && query === undefined) {
            return listToFilter;
        }
        else {

            const copyOfList = [...listToFilter];
            const filteredList = copyOfList.filter((tile: UserTile) => {
                return tile.action.toLowerCase().includes(query.toLowerCase())
                    || tile.addedBy.toLowerCase().includes(query.toLowerCase());
            });
            return filteredList;
        }
    }
}
export default new FilterService();