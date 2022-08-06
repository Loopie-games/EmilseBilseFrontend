import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/store';
import './landingPage.scss'

const LandingPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [hasPin, setHasPin] = useState(false);
    const [pinValue, setPinValue] = useState('');
    /**
     * Example of how to use the store context
     */
    const { authStore } = useStore();

    useEffect(() => {
        setLoaded(true);
    }, []);

    const handlePinChange = (e: any) => {
        setPinValue(e.target.value);
        console.log(pinValue);
    }

    const checkPinLength = () => {
        setHasPin(pinValue.length > 0);
    }

    return (
        <>
            {!loaded ? <div>Loading...</div> :
                <div className='LandingPage-Container '>
                    <img src='https://github.githubassets.com/images/modules/site/codespaces/glow.png'></img>
                    <div className='LandingPage-Wrapper'>
                        <div className='LandingPage-JoinWrapper'>
                            <div className='LandingPage-JoinLabel'>
                                Join Room
                            </div>
                            <div className={`LandingPage-JoinInput ${hasPin ? "active" : ""}`} >
                                <input type="text" placeholder='Pin Code' maxLength={5} onChange={(e) => handlePinChange(e)} onKeyUp={() => checkPinLength()} />
                            </div>
                            <div className='LandingPage-JoinButton'>Join</div>
                        </div>
                        <div className='LandingPage-CreateRoom'>
                            Create Room
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(LandingPage)