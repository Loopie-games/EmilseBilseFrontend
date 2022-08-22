import { action, makeAutoObservable, observable } from "mobx";
import { Friend } from "../models/friendship/friendInterface";
import FriendshipService from "../services/friendshipService";

export class FriendshipStore {

    @observable _friendlist: Friend[] | undefined;
    @observable _friendRequests: Friend[] | undefined;
    @observable _searchResults: Friend[] | undefined;    

    @action
    getFriendList = async (userId: string) => {
        const response = await FriendshipService.getFriendsByUserId(userId)
        this._friendlist = response.data;
        return response.data;
    }

    @action
    setFriends = (friends: Friend[]) => {
        this._friendlist = friends
    }

    //todo: implement search for users
    @action
    searchForUsers = async (search: string) => {
        const response = await FriendshipService.searchUsers(search)
        this._searchResults = response.data;
        return response.data
    }

    //todo: Send Request to User
    @action
    addFriend = async (friendId: string) => {
        const response = await FriendshipService.sendFriendRequest(friendId)
        return response.data
    }

    //todo: Remove friend from your friendlist
    @action
    removeFriend = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    //todo: accept friend request
    @action
    acceptFriendRequest = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    //todo: Decline friend request
    @action
    declineFriendRequest = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    //todo: get friendrequests
    @action
    getFriendRequests = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    constructor() {
        makeAutoObservable(this);
    }
}