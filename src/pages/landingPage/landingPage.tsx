import { autorun } from 'mobx';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Loader from '../../components/shared/loader/loader';
import { Lobby } from '../../models/game/gameInterfaces';
import lobbyStore from '../../stores/lobbyStore';

import {useStore} from '../../stores/store';
import './landingPage.scss'

const LandingPage = () => {
    const [loaded, setLoaded] = useState(false);
    const [hasPin, setHasPin] = useState(false);
    const [pinValue, setPinValue] = useState('');
    const navigate = useNavigate();

    const {userStore, popupStore, lobbyStore} = useStore();

    useEffect(() => {
        setLoaded(true);
        return () => {
        }
    }, []);

    /**
     * @Description sets the pin state to the value from the input field
     * @param e the event from the input field
     */
    const handlePinChange = (e: any) => {
        setPinValue(e.target.value);
    }

    /**
     *  @Description sets the hasPin state to true if the pin input has a value
     */
    const checkPinLength = () => {
        setHasPin(pinValue.length > 0);
    }

    /**
     * @Description if the user is undefined I.E not logged in, it will redirect to the login page, 
     *              otherwise it will navigate to the lobby page for the given pin
     */
    const handleJoinClick = async () => {
        if (userStore.user === undefined) {
            navigate('/login');
        } else {
            try {
                navigate('/lobby/' + pinValue)
            } catch (e: any) {
                popupStore.setErrorMessage(e.message);
                popupStore.show();
            }
        }
        return
    }

    /**
     * @Description if the user is undefined I.E not logged in, it will redirect to the login page,
     *             otherwise it will create a lobby and redirect to the lobby page with the generated pin
     */
    const handleHostClick = async () => {
        if (userStore.user === undefined) {
            navigate('/login');
        } else {
            try {
                let l : Lobby = await lobbyStore.createlobby()
                navigate('/lobby/' + l.pin)
            } catch (e: any) {
                popupStore.setErrorMessage(e.message);
                popupStore.show();
            }
        }
        return
    }

    return (
        <>
            {!loaded ? <Loader/> :
                <div className='LandingPage-Container '>
                    <img src='https://github.githubassets.com/images/modules/site/codespaces/glow.png'
                         alt={"glow img"}></img>
                    <div className='LandingPage-Wrapper'>
                        <div className='LandingPage-JoinWrapper'>
                            <div className='LandingPage-JoinLabel'>
                                Join Room
                            </div>
                            <div className={`LandingPage-JoinInput ${hasPin ? "active" : ""}`}>
                                <input type="text" placeholder='Pin Code' maxLength={5}
                                       onChange={(e) => handlePinChange(e)} onKeyUp={() => checkPinLength()}/>
                            </div>
                            <div className='LandingPage-JoinButton' onClick={() => handleJoinClick()}>Join</div>
                        </div>
                        <div className='LandingPage-CreateRoom' onClick={() => handleHostClick()}>
                            Create Room
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(LandingPage)