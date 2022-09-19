import React from 'react'
import './mobileLogoBar.scss'
import logo from '../../../../assets/Shared/logo.svg'

const MobileLogoBar = () => {

    const url = window.location.pathname;

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

    return (
        <>
            {checkIfBlacklistedRoute(url) ? null :
                <div className='MobileLogoBar_Container'>
                    <div className='MobileLogoBar_Wrapper'>
                            <img id='logo' src={logo} alt="Logo" />
                    </div>
                </div>
            }

        </>
    )
}

export default MobileLogoBar