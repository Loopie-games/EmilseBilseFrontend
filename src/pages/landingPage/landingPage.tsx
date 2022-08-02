import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/store';
import './landingPage.scss'

const LandingPage = () => {
    const [loaded, setLoaded] = useState(false);
    /**
     * Example of how to use the store context
     */
    const { authStore } = useStore();

    useEffect(() => {
        loadTestData();
        setLoaded(true);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const loadTestData = async () => {
        setLoaded(false);
        await authStore.test();
    }

    return (
        <>
            {!loaded ? <div>Loading...</div> :
                <div className='LandingPage-Container '>
                    <div className='LandingPage-Wrapper'>
                        <div className='LandingPage-JoinWrapper'>
                            <div className='LandingPage-JoinLabel'>
                                Join Room {authStore.t !== undefined ? authStore.t[0].username : ''}
                            </div>
                            <div className='LandingPage-JoinInput'>
                                <input type="text" placeholder='Pin Code' />
                            </div>
                            <div className='LandingPage-JoinButton' onClick={loadTestData}>Join</div>
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