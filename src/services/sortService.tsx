import { SORT_TYPE } from "../models/sortService/sortServiceInterface";

class SortService {
    static sortArray(players: import("../models/player/playerInterface").pendingPlayerDto[], Ascending: SORT_TYPE) {
        throw new Error('Method not implemented.');
    }

    
    sortArray(array: Array<any>, sortType: SORT_TYPE): Array<any> {
        
        let sortedArray = array;
        switch (sortType) {
        case SORT_TYPE.Ascending:
            sortedArray = array.sort((a,b) => a - b);
            break;
        case SORT_TYPE.Descending:
            sortedArray = array.sort((a,b) => b - a);
            break;
        default:
            sortedArray = array;
        }
        return sortedArray;
    }

}

export default new SortService();