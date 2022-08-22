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

    
    @action
    searchForUsers = async (search: string) => {
        const response = await FriendshipService.searchUsers(search)
        this._searchResults = response.data;
        return response.data
    }

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


    @action
    acceptFriendRequest = async (friendshipId: string) => {
        const response = await  FriendshipService.acceptFriendRequest(friendshipId)
        return response.data;
    }

    //todo: Decline friend request
    @action
    declineFriendRequest = async (userId: string) => {
        throw new Error('Method not implemented.');
    }


    @action
    getFriendRequests = async () => {
        this._friendRequests = [];
        const response = await FriendshipService.getFriendRequests()
        this._friendRequests = response.data
        return this._friendRequests;
    }

    constructor() {
        makeAutoObservable(this);
    }
}