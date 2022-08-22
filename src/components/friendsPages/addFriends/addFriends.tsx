import {useEffect, useState } from 'react'
import { Friend } from '../../../models/friendship/friendInterface';
import { TileNewFromUser } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import './addFriends.scss'

const AddFriend = (friend: Friend) => {
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const { friendshipStore } = useStore();
    const [added, setAdded] = useState((friend.id !== null && friend.id !== ''));

    const handleAddClick = async () => {
        if(!added){
            let friendRequest = await friendshipStore.addFriend(friend.user.id!);
            if(friendRequest != null){
                setAdded(true);
            }
        }
    }

    return (
        <div className='FriendRequest-Container'>
            <div className='FriendRequest-Wrapper'>
                <div className='FriendRequest-ProfilePicContainer'><img className='LoggedInUser-UserProfilePic' src={defaultPic} /></div>
                <div className='FriendRequest-UserInfoContainer'>
                    <div className='FriendRequest-UserInfoNickname'>{friend.user.nickname}</div>
                    <div className='FriendRequest-UserInfoUsername'>{friend.user.username}</div>
                </div>
                <div className='FriendRequest-IconContainer' onClick={() => handleAddClick()}> {!added ? <Icon name="add_friend" /> : <Icon name="accept_request" /> } </div>
            </div>
        </div>
    )
}

export default AddFriend