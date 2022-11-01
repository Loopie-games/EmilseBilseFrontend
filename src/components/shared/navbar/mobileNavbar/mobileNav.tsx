import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { POPUP_STATES } from '../../../../models/popup/popupInterface'
import { MobileStore } from '../../../../stores/mobileStore'
import { useStore } from '../../../../stores/store'
import Icon from '../../icon/Icon'
import './mobileNav.scss'

const MobileNav = () => {
    const navigate = useNavigate()
    const url = window.location.pathname;

    const { userStore, themeStore, popupStore } = useStore()

    const blacklistedUrls = ['/game']

    const checkIfBlacklistedRoute = (path: string) => {
        let t = false;
        blacklistedUrls.forEach((route) => {
            if (path.includes(route)) {
                t = true;
                return t;
            }
        })
        return t;

    }

    const [showMenu, setShowMenu] = useState(false)

    const [linkShown, setLinkShown] = useState(false);
    const [profileShown, setProfileShown] = useState(false);
    const [friendsShown, setFriendsShown] = useState(false);
    const [tilesShown, setTilesShown] = useState(false);
    const [settingsShown, setSettingsShown] = useState(false);
    const [logOutShown, setLogOutShown] = useState(false);

    const linkSublinks = [
        { name: 'Shop', link: `/shop`, iconName: 'link' },
        { name: 'About us', link: `/aboutus`, iconName: 'link' },
        { name: 'Contact us', link: `/contactus`, iconName: 'link' },
        { name: 'FAQ', link: `/faq`, iconName: 'link' },
        { name: 'Terms of use', link: `/terms`, iconName: 'link' },
        { name: 'Privacy policy', link: `/privacy`, iconName: 'link' },
    ];

    const profileSubLinks = [{ name: 'Your Profile', link: `/user/profile/${userStore.user?.id}`, iconName: 'profile' }];
    const friendlistSubLinks = [{ name: 'Friendlist', link: `/user/friendlist/${userStore.user?.id}`, iconName: 'friendslist' }, { name: 'Add Friend', link: `/user/addfriend/`, iconName: 'add_friend' }, { name: 'Friend Requests', link: `/user/friendrequests/`, iconName: 'friend_requests' }];
    const tileSubLinks = [{ name: 'Your Tiles', link: `/user/tiles/${userStore.user?.id}`, iconName: 'tiles_user' }, { name: 'Tiles created by you', link: `/user/tilesby/${userStore.user?.id}`, iconName: 'tiles_byUser' }];
    const UserInteractionSubLinks: any[] = [
        { name: 'Bug Report', type: POPUP_STATES.Bug, iconName: 'bug' },
        { name: 'Feedback', type: POPUP_STATES.Feedback, iconName: 'feedback' },
        { name: 'Newsletter', link: `/newsletter`, iconName: 'mail' },
    ];
    const logoutSublinks: any[] = [];

    const handleMenuClick = () => {
        setShowMenu(!showMenu)
        showMenu && handleHideAll();
    }

    const handleLinksClick = () => {
        !showMenu && setShowMenu(true);
        setLinkShown(!linkShown);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
        setProfileShown(false);
    }

    const handleProfileClick = () => {
        !showMenu && setShowMenu(true);
        setProfileShown(!profileShown);
        setLinkShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }

    const handleFriendsClick = () => {
        !showMenu && setShowMenu(true);
        setFriendsShown(!friendsShown);
        setProfileShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }
    const handleTilesClick = () => {
        !showMenu && setShowMenu(true);
        setTilesShown(!tilesShown);
        setProfileShown(false);
        setFriendsShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }
    const handleSettingsClick = () => {
        !showMenu && setShowMenu(true);
        setSettingsShown(!settingsShown);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setLogOutShown(false);
    }
    const handleUserInteractionClick = () => {
        !showMenu && setShowMenu(true);
        setSettingsShown(!settingsShown);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setLogOutShown(false);
        setLinkShown(false);
    }
    const handleLogOutClick = () => {
        !showMenu && setShowMenu(true);
        setLogOutShown(!logOutShown);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
    }
    const handleLogOut = () => {
        popupStore.showConfirmation(
            'Are you sure you want to log out?',
            'You\'re about to log out of your account. Are you sure you want to do this?',
            () => {
                userStore.logout();
                navigate('/');
            },
            () => { }
        );
    }

    const handleHideAll = () => {
        setShowMenu(false);
        setLinkShown(false);
        setProfileShown(false);
        setFriendsShown(false);
        setTilesShown(false);
        setSettingsShown(false);
        setLogOutShown(false);
    }

    const handleToggleTheme = () => {
        themeStore.toggleTheme();
    }

    const handleUserInteraction = (subLink: any) => {
        if (subLink.link !== undefined) {
            navigate(subLink.link);
            setShowMenu(false);
        } else {
            switch (subLink.type) {
                case POPUP_STATES.Bug:
                    setShowMenu(false);
                    popupStore.showBug('Bug Report', 
                    'Oh no, looks like you found a bug! Please describe the bug in detail and we will try to fix it as soon as possible.'
                    , (e:string) => {console.log(e) });
                    break;
                case POPUP_STATES.Feedback:
                    setShowMenu(false);
                    popupStore.showFeedback('Feedback',
                     'We would love to hear your feedback! Please describe your feedback in detail and we will try to implement it as soon as possible.'
                     , (e:string) => {console.log(e)});
                    break;
                default:
                    break;

            }
        }

    }

    return (
        <>
            {checkIfBlacklistedRoute(url) ? null :
                <>
                    {showMenu &&

                        <div className="MobileNav_LinksContainer" >
                            <div className="MobileNav_LinksWrapper">
                                <div className={`MobileNav_MenuLinksContainer`} onClick={handleToggleTheme}>
                                    <div className='MobileNav_MenuLinksContainerIcon'><Icon name={`${themeStore.theme === 'light' ? 'moon' : 'sun'}`} /></div>
                                    <div className='MobileNav_MenuLinksContainerTextTitle'>Toggle Theme</div>
                                </div>

                                <div className={`MobileNav_MenuLinksContainer ${linkShown ? 'active' : ''}`} onClick={handleLinksClick}>
                                    <div className='MobileNav_MenuLinksContainerIcon'><Icon name="link" /></div>
                                    <div className='MobileNav_MenuLinksContainerTextTitle'>Links</div>
                                </div>
                                <div className={`MobileNav_MenuComponent ${linkShown ? 'asdasd' : ''}`}>
                                    {linkSublinks.map((link, index) => {
                                        return (
                                            <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                                <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                            </div>
                                        )
                                    })}
                                </div>
                                {userStore.user &&
                                    <>
                                        {/** 
                                 * Profile
                                */}
                                        <div className={`MobileNav_MenuLinksContainer ${profileShown ? 'active' : ''}`} onClick={handleProfileClick}>
                                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="profile" /></div>
                                            <div className='MobileNav_MenuLinksContainerTextTitle'>Profile</div>
                                        </div>
                                        <div className={`MobileNav_MenuComponent ${profileShown ? 'asdasd' : ''}`}>
                                            {profileSubLinks.map((link, index) => {
                                                return (
                                                    <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/** 
                                 * Friends
                                */}
                                        <div className={`MobileNav_MenuLinksContainer ${friendsShown ? 'active' : ''}`} onClick={handleFriendsClick}>
                                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="friendslist" /></div>
                                            <div className='MobileNav_MenuLinksContainerTextTitle'>Friendslist</div>
                                        </div>
                                        <div className={`MobileNav_MenuComponent ${friendsShown ? 'asdasd' : ''}`}>
                                            {friendlistSubLinks.map((link, index) => {
                                                return (
                                                    <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/** 
                                 * Tiles
                                */}
                                        <div className={`MobileNav_MenuLinksContainer ${tilesShown ? 'active' : ''}`} onClick={handleTilesClick}>
                                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="tiles" /></div>
                                            <div className='MobileNav_MenuLinksContainerTextTitle'>Tiles</div>
                                        </div>
                                        <div className={`MobileNav_MenuComponent ${tilesShown ? 'asdasd' : ''}`}>
                                            {tileSubLinks.map((link, index) => {
                                                return (
                                                    <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/** 
                                 * Settings
                                */}
                                        <div className={`MobileNav_MenuLinksContainer ${settingsShown ? 'active' : ''}`} onClick={handleUserInteractionClick}>
                                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="heart" /></div>
                                            <div className='MobileNav_MenuLinksContainerTextTitle'>User Interaction</div>
                                        </div>
                                        <div className={`MobileNav_MenuComponent ${settingsShown ? 'asdasd' : ''}`}>
                                            {UserInteractionSubLinks.map((link, index) => {
                                                return (
                                                    <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { handleUserInteraction(link) }}>
                                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        {/** 
                                 * Logut
                                */}
                                        <div className={`MobileNav_MenuLinksContainer ${logOutShown ? 'active' : ''}`} onClick={handleLogOut}>
                                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="logout" /></div>
                                            <div className='MobileNav_MenuLinksContainerTextTitle'>Log out</div>
                                        </div>
                                        <div className={`MobileNav_MenuComponent ${logOutShown ? 'asdasd' : ''}`}>
                                            {logoutSublinks.map((link, index) => {
                                                return (
                                                    <div className={`MobileNav_MenuLinksContainer ${url === link.link ? 'active' : ''}`} key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>

                                    </>}
                            </div>
                        </div>
                    }


                    <div className='MobileNav_Container'>
                        <div className='MobileNav_Wrapper'>
                            <div className='MobileNav_Component'>
                                <Link to={'/'} onClick={handleHideAll}>
                                    <div className='MobileNav_Icon'><Icon name="home" /></div>
                                    <div className='MobileNav_Label'>Home</div>
                                </Link>
                            </div>
                            <div className='MobileNav_Component' onClick={handleMenuClick}>
                                <div className='MobileNav_MenuIcon'><Icon name={showMenu ? 'cross' : 'hamburger'} /></div>
                                <div className='MobileNav_MenuLabel'>Menu</div>
                            </div>
                            <div className='MobileNav_Component'>
                                {userStore.user ?
                                    <Link to={'/Shop'} onClick={handleHideAll}>
                                        <div className='MobileNav_Icon'><Icon name="shop" /></div>
                                        <div className='MobileNav_Label'>Shop</div>
                                    </Link>
                                    :
                                    <Link to={'/login'} onClick={handleHideAll}>
                                        <div className='MobileNav_Icon'><Icon name="login" /></div>
                                        <div className='MobileNav_Label'>Login</div>
                                    </Link>
                                }
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}

export default observer(MobileNav)