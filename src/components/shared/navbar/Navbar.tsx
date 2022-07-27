import React from 'react'
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { Link } from 'react-router-dom'
import './Navbar.scss'

const Navbar = () => {
    return (
        <div className='Navbar-Container'>
            <div className='Navbar-Wrapper'>
                <div className='Navbar-Logo'>
                    <img src={logo} alt="Logo" />
                </div>
                <div className='Navbar-Button-Container'>
                    <div className='Navbar-Button-Wrapper'>
                        <div className='Navbar-ButtononWrapper-NoBorder'>
                            <Link className='Navbar-Button-Text' to={'/'}>SIGN UP</Link>
                        </div>
                        <div className='Navbar-ButtononWrapper-Border'>
                            <Link className='Navbar-Button-Text' to={'/'}>LOG IN</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar