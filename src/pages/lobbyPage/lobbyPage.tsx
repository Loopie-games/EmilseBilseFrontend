import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const LobbyPage = () => {
    const { gameStore, userStore } = useStore();

    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const savePinToClipboard = () => {
        navigator.clipboard.writeText(gameStore.lobby!.pin);
    }

    const handleCloseLobby = async () => {
        await gameStore.closeLobby(gameStore.lobby!.id, userStore.user!.id)
        navigate('/')
    }

    return (
        <div className='Lobby_Container'>
            <div className='Lobby_NavBackground'></div>
            <div className='Lobby_Wrapper'>
                <div className='Lobby_Title'>
                    Lobby
                </div>
                <div className='Lobby_InputContainer'>
                    <div className='Lobby_PinCode' >
                        <input type="text" placeholder='Pin Code' maxLength={5} readOnly onClick={() => savePinToClipboard()} value={gameStore.lobby?.pin} />
                    </div>
                    <div className='Lobby_ButtonsContainer'>
                        <div className='Lobby_StartButton'> Start</div>
                        <div className='Lobby_StartButton' onClick={handleCloseLobby}> Close my lobby</div>
                    </div>
                </div>
                <div className='Lobby_PlayerContainer'>
                    {gameStore.lobbyPlayers.map((player) => (
                        <UserComponent user={player} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(LobbyPage)