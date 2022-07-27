import React from 'react'
import './landingPage.scss'

const LandingPage = () => {
    return (
        <div className='LandingPage-Container '>
            <div className='LandingPage-Wrapper'>
                <div className='LandingPage-JoinWrapper'>
                    <div className='LandingPage-JoinLabel'>
                        Join Room
                    </div>
                    <div className='LandingPage-JoinInput'>
                        <input type="text" placeholder='Pin Code' />
                    </div>
                    <div className='LandingPage-JoinButton'>Join</div>
                </div>
                <div className='LandingPage-CreateRoom'>
                    Create Room
                </div>
            </div>
        </div>
    )
}

export default LandingPage