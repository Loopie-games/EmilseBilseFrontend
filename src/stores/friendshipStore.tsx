import { action, makeAutoObservable, observable } from "mobx";
import { Friend } from "../models/friendship/friendInterface";
import FriendshipService from "../services/friendshipService";

export class FriendshipStore {
    @observable _friendlist: Friend[] | undefined;
    @observable _friendRequests: Friend[] | undefined;
    @observable _searchResults: Friend[] | undefined;    

    /**
     * @Description Gets the friendlist of the userID
     * @param userId the userID of the user to get the friendlist of
     * @returns the response from the server
     */
    @action
    getFriendList = async (userId: string) => {
        const response = await FriendshipService.getFriendsByUserId(userId)
        this._friendlist = response.data;
        return response.data;
    }

    /**
     * @Description Sets the friends state to the given array of friends 
     * @param friends The array of friends to set the state to
     */
    @action
    setFriends = (friends: Friend[]) => {
        this._friendlist = friends
    }

    /**
     * @Description Searches for friends with the given query
     * @param search The query to search for
     * @returns the response from the server
     */
    @action
    searchForUsers = async (search: string) => {
        const response = await FriendshipService.searchUsers(search)
        this._searchResults = response.data;
        return response.data
    }

    /**
     * @Description Adds a friend to the friendlist
     * @param friendId The id of the friend to add
     * @returns the response from the server
     */
    @action
    addFriend = async (friendId: string) => {
        const response = await FriendshipService.sendFriendRequest(friendId)
        return response.data
    }

    //todo: Remove friend from your friendlist
    /**
     * @Description Removes a friend from the friendlist
     * @param userId The id of the friend to remove
     */
    @action
    removeFriend = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    /**
     * @Description Accepts a friend request
     * @param friendshipId The id of the friendship to accept
     * @returns the response from the server
     */
    @action
    acceptFriendRequest = async (friendshipId: string) => {
        const response = await  FriendshipService.acceptFriendRequest(friendshipId)
        return response.data;
    }

    //todo: Decline friend request
    /**
     * @Description Declines a friend request
     * @param userId The id of the user to decline the request from
     */
    @action
    declineFriendRequest = async (userId: string) => {
        throw new Error('Method not implemented.');
    }

    /**
     * @Description Gets the list of friend requests
     * @returns the friend requests observable
     */
    @action
    getFriendRequests = async () => {
        this._friendRequests = [];
        const response = await FriendshipService.getFriendRequests()
        this._friendRequests = response.data
        return this._friendRequests;
    }

    /**
     * @Description clears the search results
     */
    @action 
    clearSearchResults = () => {
        this._searchResults = [];
    }

    constructor() {
        makeAutoObservable(this);
    }
}