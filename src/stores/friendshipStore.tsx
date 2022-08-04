import { action, makeAutoObservable, observable } from "mobx";
import { Friend } from "../models/friendship/friendInterface";
import FriendshipService from "../services/friendshipService";

export class FriendshipStore {
    @observable _friendlist: Friend[] | undefined;

    @action
    getFriendList = async (userId: string) => {
        const response = await FriendshipService.getFriendsByUserId(userId)
        this._friendlist = response.data;
    }

    setFriends = (friends: Friend[]) => {
        this._friendlist = friends
}


    constructor() {
        makeAutoObservable(this);
    }
}