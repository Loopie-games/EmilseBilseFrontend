import { useState } from 'react'
import { Friend } from '../../../models/friendship/friendInterface';
import { TileNewFromUser } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import './friendRequests.scss'

const FriendRequest = (friend: Friend) => {
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const { friendshipStore } = useStore();

    const handleAddClick = () => {
        friendshipStore.acceptFriendRequest(friend.user.id!);
    }

    const handleDeclineClick = () => {
        friendshipStore.declineFriendRequest(friend.user.id!);
    }

    return (
        <div className='FriendRequest-Container'>
            <div className='FriendRequest-Wrapper'>
                <div className='FriendRequest-ProfilePicContainer'><img className='LoggedInUser-UserProfilePic' src={defaultPic} /></div>
                <div className='FriendRequest-UserInfoContainer'>
                    <div className='FriendRequest-UserInfoNickname'>{friend.user.nickname}</div>
                    <div className='FriendRequest-UserInfoUsername'>{friend.user.username}</div>
                </div>
                <div className='FriendRequest-IconContainer' onClick={() => handleAddClick()}> <Icon name="accept_request" /> </div>
                <div className='FriendRequest-IconContainer' onClick={() => handleDeclineClick()}> <Icon name="decline_request" /> </div>
            </div>
        </div>
    )
}

export default FriendRequest