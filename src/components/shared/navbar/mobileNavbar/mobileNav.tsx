import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from '../../../../stores/store'
import Icon from '../../icon/Icon'
import './mobileNav.scss'

const MobileNav = () => {
    const navigate = useNavigate()
    const url = window.location.pathname;
    const [showMenu, setShowMenu] = useState(false)

    const [linkShown, setLinkShown] = useState(false);

    const linkSublinks = [
        { name: 'Shop', link: `/shop`, iconName: 'link' },
        { name: 'About us', link: `/aboutus`, iconName: 'link' },
        { name: 'Contact us', link: `/contactus`, iconName: 'link' },
        { name: 'FAQ', link: `/faq`, iconName: 'link' },
        { name: 'Terms of use', link: `/terms`, iconName: 'link' },
        { name: 'Privacy policy', link: `/privacy`, iconName: 'link' },
    ];

    const handleMenuClick = () => {
        setShowMenu(!showMenu)
        showMenu && handleHideAll();
    }

    const handleLinksClick = () => {
        !showMenu && setShowMenu(true);
        setLinkShown(!linkShown);
    }

    const handleHideAll = () => {
        setShowMenu(false);
        setLinkShown(false);
    }

    return (
        <>
            {showMenu &&

                <div className="MobileNav_LinksContainer" >
                    <div className="MobileNav_LinksWrapper">
                        <div className='MobileNav_MenuLinksContainer' onClick={handleLinksClick}>
                            <div className='MobileNav_MenuLinksContainerIcon'><Icon name="link" /></div>
                            <div className='MobileNav_MenuLinksContainerTextTitle'>Links</div>
                        </div>
                        <div className={`MobileNav_MenuComponent ${linkShown ? 'asdasd' : ''}`}>
                            {linkSublinks.map((link, index) => {
                                return (
                                    <div className="MobileNav_MenuLinksContainer" key={index} onClick={() => { setShowMenu(!showMenu); navigate(link.link) }}>
                                        <div className='MobileNav_MenuLinksContainerIcon'><Icon name={link.iconName} /></div>
                                        <div className='MobileNav_MenuLinksContainerText'>{link.name}</div>
                                    </div>
                                )
                            })}
                        </div>
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
                        <Link to={'/login'} onClick={handleHideAll}>
                            <div className='MobileNav_Icon'><Icon name="login" /></div>
                            <div className='MobileNav_Label'>Login</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileNav