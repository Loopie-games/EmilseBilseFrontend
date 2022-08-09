import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useStore } from '../../../../stores/store';
import Icon from '../../icon/Icon';
import './LoggedInNavbar.scss'
const LoggedInNavbar = () => {
    const location = useLocation();
    const { userStore } = useStore();
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'

    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        userStore.logout();
    }

    const getProfilePic = () => {
        console.log(userStore.user?.profilePicture !== undefined ? userStore.user?.profilePicture : defaultPic);

        return userStore.user?.profilePicture !== undefined ? userStore.user?.profilePicture : defaultPic;
    }

    return (
        <>
            <Link className={`LoggedInNavbar-Link ${location.pathname === '/' ? 'LinkActive' : ''}`} to={'/'}>Home</Link>
            <Link className={`LoggedInNavbar-Link ${location.pathname === '/host' ? 'LinkActive' : ''}`} to={'/host'}>Host a game</Link>
            <Link className={`LoggedInNavbar-Link ${location.pathname === '/join' ? 'LinkActive' : ''}`} to={'/join'}>Join a game</Link>
            <Link className={`LoggedInNavbar-Link ${location.pathname === '/features/upgrade' ? 'LinkActive' : ''}`} to={'/features/upgrade'}>Go Pro!</Link>


            <div className='LoggedInNavbar-UserContainer'>
                <div className='LoggedInNavbar-UserWrapper'>
                    <div className='LoggedInNavbar-UserNickName'>{userStore.user?.nickname}</div>
                    <div onClick={() => setIsOpen(!isOpen)} style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                        <div className='LoggedInNavbar-UserAvatarContainer'>
                            <img className='LoggedInUser-UserProfilePic' src={getProfilePic()} alt="Profile pic"></img>
                        </div>
                        <div className='LoggedInNavbar-UserDropdownContainer'><Icon name="dropdown-arrow" /></div>
                    </div>
                </div>
                <div className={`LoggedInNavbar-DropDownContainer ${isOpen ? 'show' : ''}`}>
                    <div className='LoggedInNavbar-DropDownItem'>
                        <div className='LoggedInNavbar-DropDownItemIcon'>
                            <Icon name="profile" />
                        </div>
                        <div className='LoggedInNavbar-DropDownItemText'>
                            <Link to={`/user/profile/${userStore.user?.id}`}>Profile</Link>
                        </div>
                    </div>
                    <div className='LoggedInNavbar-DropDownItem'>
                        <div className='LoggedInNavbar-DropDownItemIcon'>
                            <Icon name="friendslist" />
                        </div>
                        <div className='LoggedInNavbar-DropDownItemText'>
                            <Link to={'/user/friendslist'}>Friendslist</Link>
                        </div>
                    </div>
                    <div className='LoggedInNavbar-DropDownItem'>
                        <div className='LoggedInNavbar-DropDownItemIcon'>
                            <Icon name="settings" />
                        </div>
                        <div className='LoggedInNavbar-DropDownItemText'>
                            <Link to={'/user/settings'}>Settings</Link>
                        </div>
                    </div>
                    <div className='LoggedInNavbar-DropDownItem' onClick={() => handleLogout()}>
                        <div className='LoggedInNavbar-DropDownItemIcon'>
                            <Icon name="logout" />
                        </div>
                        <div className='LoggedInNavbar-DropDownItemText'>
                            Log out
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoggedInNavbar