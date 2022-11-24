import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Shared/LoopieLogo.png'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import LoggedInNavbar from './loggedInNavbar/LoggedInNavbar'
import Loader from '../loader/loader'
import Icon from '../icon/Icon'
import Searchbar from '../searchbar/searchbar'

const Navbar = () => {
    const [loaded, setLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation();
    const { userStore, themeStore } = useStore();
    useEffect(() => {
        setLoaded(false);
        userStore.user !== undefined ? setIsLoggedIn(true) : setIsLoggedIn(false);
        

        setLoaded(true);
    }, [])

    useEffect(() => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.getElementsByTagName('head')[0].appendChild(link);
        }
        link.href = themeStore.theme === 'light' ? 'https://res.cloudinary.com/moonbaboon/image/upload/v1664217277/favicon_dark_vngfd4.ico' : 'https://res.cloudinary.com/moonbaboon/image/upload/v1664217277/favicon_o1ay03.ico';
      }, [themeStore.theme]);

    const handleToggleTheme = () => {
        themeStore.toggleTheme();
    }

    return (
        <>
            {loaded ?
                <div className='Navbar-Container'>
                    <div className='Navbar-Wrapper'>
                        <div className='Navbar-Logo'>
                            <Link to='/' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img id='logo' src={logo} alt="Logo" />
                            </Link>
                        </div>
                        <div className='Navbar-SearchContainer'>
                            <Searchbar />
                        </div>
                        <div className='Navbar-Button-Container'>
                            <div className='Navbar-Button-Wrapper'>
                                <div className='Navbar-ToggleTheme' onClick={handleToggleTheme}>
                                    <Icon name={`${themeStore.theme === 'light' ? 'sun' : 'moon'}`} />
                                </div>
                                <Link className={`LoggedInNavbar-Link ${location.pathname === '/aboutUs' ? 'LinkActive' : ''}`} to={'/aboutUs'}>About us</Link>

                                {userStore.user?.id === undefined || userStore.user?.id === '' ?
                                    <>
                                        <Link className='Navbar-Button' to={'/register'}>Sign Up</Link>
                                        <Link className='Navbar-Button' to={'/login'}>Log In</Link>
                                    </>
                                    : <LoggedInNavbar />}
                            </div>
                        </div>
                    </div>
                </div>
                : <Loader />}
        </>
    )
}

export default observer(Navbar)