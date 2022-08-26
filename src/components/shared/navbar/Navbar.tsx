import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Shared/loopie_logo_white.svg'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.scss'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import LoggedInNavbar from './loggedInNavbar/LoggedInNavbar'
import Loader from '../loader/loader'

const Navbar = () => {
    const [loaded, setLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const location = useLocation();
    const { userStore } = useStore();
    useEffect(() => {
        setLoaded(false);
        userStore.user !== undefined ? setIsLoggedIn(true) : setIsLoggedIn(false);
        console.log(isLoggedIn);

        setLoaded(true);
    }, [])


    return (
        <>
            {loaded ?
                <div className='Navbar-Container'>
                    <div className='Navbar-Wrapper'>
                        <div className='Navbar-Logo'>
                            <Link to='/' style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={logo} alt="Logo" />
                                Loopie
                            </Link>
                        </div>
                        <div className='Navbar-Button-Container'>
                            <div className='Navbar-Button-Wrapper'>
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