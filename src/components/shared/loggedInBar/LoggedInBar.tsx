import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import Icon from '../icon/Icon';
import './LoggedInBar.scss'

const LoggedInBar = () => {
    const { userStore } = useStore();
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const profileSubLinks = [{ name: 'Your Profile', link: `/user/profile/${userStore.user?.id}` }];
    const friendlistSubLinks = [{ name: 'Friendlist', link: `/user/friendlist/${userStore.user?.id}` }, { name: 'Add Friend', link: `/user/addfriend/` }, { name: 'Friend Requests', link: `/user/friendrequests/` }];
    const tileSubLinks = [{ name: 'Your Tiles', link: `/user/tiles/${userStore.user?.id}` }, { name: 'Tiles created by you', link: `/user/tilesby/${userStore.user?.id}` }];


    const barBlacklistRoutes = ['/register', '/login', '/lobby'];


    const checkIfBlacklistedRoute = (path: string) => {
        return barBlacklistRoutes.some(route => route === path);
    }


    return (
        <>
            {checkIfBlacklistedRoute(window.location.pathname) ? null :
                <>
                    <div className={`LoggedInBar-Container ${isShown ? 'shown' : ''}`} onClick={() => setIsShown(!isShown)}>
                        <div className={`LoggedInBar-Wrapper ${isShown ? 'asdasdasd ' : ''}`}>
                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''}`}>
                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="profile" /></div>
                                <div className='LoggedInBar-ComponentTitleText shown'>Profile</div>
                            </div>
                            <div className={`LoggedInBar-ComponentContainer ${isShown ? 'asdasd' : ''}`}>
                                {
                                    profileSubLinks.map((subLink, index) => {
                                        return (
                                            <div className={`LoggedInBar-ComponentTitle ${isShown ? 'shown' : ''}`} key={index} onClick={() => navigate(subLink.link)}>
                                                <div className='LoggedInBar-ComponentTitleIcon'><Icon name="profile" /></div>
                                                <div className='LoggedInBar-ComponentTitleText shown'>{subLink.name}</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div>FriendList</div>
                        <div>Tiles</div>
                        <div>Settings</div>
                        <div>Logout</div>
                    </div>
                    <div className='test1'>
                        <div className='test2'></div>
                    </div>
                </>
            }
        </>
    )
}

export default LoggedInBar