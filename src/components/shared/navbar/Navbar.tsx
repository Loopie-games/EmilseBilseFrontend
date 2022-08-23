import React, { useEffect, useState } from 'react'
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { Link } from 'react-router-dom'
import './Navbar.scss'
import { useStore } from '../../../stores/store'
import { observer } from 'mobx-react-lite'
import LoggedInNavbar from './loggedInNavbar/LoggedInNavbar'

const Navbar = () => {
    const [loaded, setLoaded] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

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
                            </Link>
                        </div>
                        <div className='Navbar-Button-Container'>
                            <div className='Navbar-Button-Wrapper'>
                                {userStore.user?.id === undefined || userStore.user?.id === '' ?
                                    <>
                                        <Link className='Navbar-Button' to={'/register'}>SIGN UP</Link>
                                        <Link className='Navbar-Button' to={'/login'}>LOG IN</Link>
                                    </>
                                    : <LoggedInNavbar/>}
                            </div>
                        </div>
                    </div>
                </div>
                : null}
        </>
    )
}

export default observer(Navbar)