import { useEffect, useState } from 'react'
import { Friend } from '../../../models/friendship/friendInterface';
import { TileNewFromUser } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import Popup from '../../shared/popups/popup';
import './addFriends.scss'

const AddFriend = (friend: Friend) => {
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const { friendshipStore, popupStore } = useStore();
    const [added, setAdded] = useState((friend.id !== null && friend.id !== ''));

    /**
     * @Description Accepts a friend request
     */
    const handleAddClick = async () => {
        if (!added) {
            try {
                await friendshipStore.addFriend(friend.user.id);
                setAdded(true);
            } catch (error: any) {
                popupStore.setErrorMessage('Error '+ error.message);
                popupStore.show();
            }
        } else {
            popupStore.setErrorMessage('You have already added this user');
            popupStore.show();
        }
    }

    return (
        <>
            <div className='FriendRequest-Container'>
                <div className='FriendRequest-Wrapper'>
                    <div className='FriendRequest-ProfilePicContainer'><img className='LoggedInUser-UserProfilePic' src={defaultPic} /></div>
                    <div className='FriendRequest-UserInfoContainer'>
                        <div className='FriendRequest-UserInfoNickname'>{friend.user.nickname}</div>
                        <div className='FriendRequest-UserInfoUsername'>{friend.user.username}</div>
                    </div>
                    <div className='FriendRequest-IconContainer' onClick={() => handleAddClick()}> {!added ? <Icon name="add_friend" /> : <Icon name="accept_request" />} </div>
                </div>
            </div>
        </>
    )
}

export default AddFriend