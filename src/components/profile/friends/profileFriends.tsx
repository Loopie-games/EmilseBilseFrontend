import { observer } from 'mobx-react-lite'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Friend } from '../../../models/friendship/friendInterface'
import Icon from '../../shared/icon/Icon'
import './profileFriends.scss'

const ProfileFriends = ({user}: Friend) => {

    const navigate = useNavigate();

    const checkProfilePicture = () => {
        if (user.profilePicUrl === null || user.profilePicUrl === undefined || user.profilePicUrl === "") {
            return "https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
        } else {
            return user.profilePicUrl
        }
    }



    return (
        <div className='ProfileFriends_Container'>
            <div className='ProfileFriends_Wrapper'>
                <div className='ProfileFriends_ImageContainer'>
                    <div className='ProfileFriends_ImageWrapper'>
                        <img id='ProfileFriends_Image' src={checkProfilePicture()} alt='Friend' />
                    </div>
                </div>
                <div className='ProfileFriends_InfoContainer'>
                    <div className='ProfileFriends_NameContainer'>{user.nickname}</div>
                    <div className='ProfileFriends_UsernameContainer'>{user.username}</div>
                </div>
                <div className='ProfileFriends_GotoProfileContainer' onClick={() => navigate(`/user/profile/${user.id}`)}>
                    <Icon name="profile" />
                </div>
            </div>
        </div>
    )
}

export default observer(ProfileFriends)