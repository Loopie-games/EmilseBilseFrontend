import { wait } from '@testing-library/user-event/dist/utils';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import Icon from '../icon/Icon';
import InvertedCornerQ1 from '../invertedCorners/invertedCornerQ1';
import './LoggedInBar.scss'

const LoggedInBar = () => {
    const { userStore } = useStore();
    const navigate = useNavigate();
    const url = window.location.pathname;
    const [isShown, setIsShown] = useState(false);
    const [profileShown, setProfileShown] = useState(false);
    const [friendsShown, setFriendsShown] = useState(false);
    const [tilesShown, setTilesShown] = useState(false);
    const [settingsShown, setSettingsShown] = useState(false);
    const [logOutShown, setLogOutShown] = useState(false);

    const profileSubLinks = [{ name: 'Your Profile', link: `/user/profile/${userStore.user?.id}`, iconName: 'profile' }];
    const friendlistSubLinks = [{ name: 'Friendlist', link: `/user/friendlist/${userStore.user?.id}`, iconName: 'friendslist' }, { name: 'Add Friend', link: `/user/addfriend/`, iconName: 'add_friend' }, { name: 'Friend Requests', link: `/user/friendrequests/`, iconName: 'friend_requests' }];
    const tileSubLinks = [{ name: 'Your Tiles', link: `/user/tiles/${userStore.user?.id}`, iconName: 'tiles_user' }, { name: 'Tiles created by you', link: `/user/tilesby/${userStore.user?.id}`, iconName: 'tiles_byUser' }];
    const settingsSubLinks: any[] = [];
    const logoutSublinks: any[] = [];

    const barBlacklistRoutes = ['/register', '/login', '/lobby', '/game'];


    const checkIfBlacklistedRoute = (path: string) => {
        let t = false;
        barBlacklistRoutes.forEach((route) => {
            if (path.includes(route)) {
                t = true;
                return t;
            }
        })
        return t;
    
    }

    const handleProfileClick = () => {
        !isShown && setIsShown(true);
        setProfileShown(!profileShown);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }
    const handleFriendsClick = () => {
        !isShown ? setIsShown(true) : () => { };
        setFriendsShown(!friendsShown);
        setProfileShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }
    const handleTilesClick = () => {
        !isShown ? setIsShown(true) : () => { };
        setTilesShown(!tilesShown);
        setProfileShown(false);
        setFriendsShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }
    const handleSettingsClick = () => {
        !isShown ? setIsShown(true) : () => { };
        setSettingsShown(!settingsShown);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setLogOutShown(false);
    }
    const handleSettings = () => {
        navigate('/user/settings')
    }
    const handleLogOutClick = () => {
        !isShown ? setIsShown(true) : () => { };
        setLogOutShown(!logOutShown);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
    }
    const handleLogOut = () => {
        userStore.logout();
        navigate('/');
    }

    const handleCloseAll = () => {
        setIsShown(false);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }


    return (
        <>
            {checkIfBlacklistedRoute(url) ? null :
                <>
                    <div className={`LoggedInBar-Container ${isShown ? 'shown' : ''}`}>
                        <div className={`LoggedInBar-Wrapper ${profileShown ? 'asdasdasd ' : ''}`} onClick={handleProfileClick}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${profileShown ? 'activated' : ''}`}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="profile" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Profile</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${profileShown ? 'asdasd' : ''}`}>
                                {
                                    profileSubLinks.map((subLink, index) => {
                                        return (
                                            <div className={`LoggedInBar-ComponentTitle ${profileShown ? 'shown' : ''} ${url === subLink.link ? 'activated' : ''}`} key={index} onClick={() => { setIsShown(!isShown); navigate(subLink.link); console.log(isShown) }}>
                                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name={subLink.iconName} /></div>
                                                <div className='LoggedInBar-SubComponentTitleText shown'>{subLink.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`LoggedInBar-Wrapper ${friendsShown ? 'asdasdasd ' : ''}`} onClick={handleFriendsClick}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${friendsShown ? 'activated' : ''}`}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="friendslist" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Friendlist</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${friendsShown ? 'asdasd' : ''}`}>
                                {
                                    friendlistSubLinks.map((subLink, index) => {
                                        return (
                                            <div className={`LoggedInBar-ComponentTitle ${friendsShown ? 'shown' : ''} ${url === subLink.link ? 'activated' : ''}`} key={index} onClick={() => { navigate(subLink.link); setIsShown(false) }}>
                                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name={subLink.iconName} /></div>
                                                <div className='LoggedInBar-SubComponentTitleText shown'>{subLink.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`LoggedInBar-Wrapper ${tilesShown ? 'asdasdasd ' : ''}`} onClick={handleTilesClick}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${tilesShown ? 'activated' : ''} `}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="tiles" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Tiles</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${tilesShown ? 'asdasd' : ''}`}>
                                {
                                    tileSubLinks.map((subLink, index) => {
                                        return (
                                            <div className={`LoggedInBar-ComponentTitle ${tilesShown ? 'shown' : ''} ${url === subLink.link ? 'activated' : ''}`} key={index} onClick={() => { navigate(subLink.link); setIsShown(false) }}>
                                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name={subLink.iconName} /></div>
                                                <div className='LoggedInBar-SubComponentTitleText shown'>{subLink.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`LoggedInBar-Wrapper ${settingsShown ? 'asdasdasd ' : ''}`} onClick={handleSettingsClick}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${settingsShown ? 'activated' : ''}`} onClick={isShown ? handleSettings : () => { }}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="settings" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Settings</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${settingsShown ? 'asdasd' : ''}`}>
                                {
                                    settingsSubLinks.map((subLink, index) => {
                                        return (
                                            <div className={`LoggedInBar-ComponentTitle ${settingsShown ? 'shown' : ''} ${url === subLink.link ? 'activated' : ''}`} key={index} onClick={() => { navigate(subLink.link); setIsShown(false) }}>
                                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="profile" /></div>
                                                <div className='LoggedInBar-SubComponentTitleText shown'>{subLink.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className={`LoggedInBar-Wrapper ${logOutShown ? 'asdasdasd ' : ''}`} onClick={handleLogOutClick}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''} ${logOutShown ? 'activated' : ''}`} onClick={isShown ? handleLogOut : () => { }}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="logout" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Log Out</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${logOutShown ? 'asdasd' : ''}`}>

                            </div>
                        </div>
                        <div className='LoggedInBar-CloseContainer' onClick={() => setIsShown(!isShown)}></div>
                    </div>
                    <InvertedCornerQ1 />
                    {isShown ?
                        <div className='closeOverlay' onClick={handleCloseAll}>

                        </div>
                        : null}
                </>
            }
        </>
    )
}

export default observer(LoggedInBar)