import React from 'react'
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='Navbar-Container'>
            <div className='Navbar-Wrapper'>
                <div className='Navbar-Logo'>
                    <Link to='/' style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <div className='Navbar-Button-Container'>
                    <div className='Navbar-Button-Wrapper'>
                        <div className='Navbar-ButtonWrapper'>
                            <Link className='Navbar-Button-Text' to={'/Signup'}>SIGN UP</Link>
                        </div>
                        <div className='Navbar-ButtonWrapper'>
                            <Link className='Navbar-Button-Text' to={'/Login'}>LOG IN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar