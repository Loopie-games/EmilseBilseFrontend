import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { StartGameDto } from '../../models/game/gameInterfaces';

const LobbyPage = () => {
    const { gameStore, userStore } = useStore();

    const navigate = useNavigate();

    useEffect(() => {
        listenForGameStarting()
        /*
        return () => {
            gameStore.leaveLobby(gameStore.lobby!.id, userStore.user!.id)
        }
         */
    }, [])

    const listenForGameStarting = async() => {
        await gameStore.gameStarting(()=>{
            navigate('/game')
        });
    }

    const savePinToClipboard = () => {
        navigator.clipboard.writeText(gameStore.lobby!.pin);
    }

    const handleCloseLobby = async () => {
        await gameStore.leaveLobby(gameStore.lobby!.id, userStore.user!.id)
        navigate('/')
    }

    const handleStartGame = async () => {
        let sg: StartGameDto = {userId: userStore.user!.id, lobbyId: gameStore.lobby!.id}
        await gameStore.startGame(sg, ()=>{
           navigate('/game')
        })
    }

    return (
        <div className='Lobby_Container'>
            <div className='Lobby_Wrapper'>
                <div className='Lobby_Title'>
                    Lobby
                </div>
                <div className='Lobby_InputContainer'>
                    <div className='Lobby_PinCode' >
                        <input type="text" placeholder='Pin Code' maxLength={5} readOnly onClick={() => savePinToClipboard()} value={gameStore.lobby?.pin} />
                    </div>
                    <div className='Lobby_ButtonsContainer'>
                        <div className='Lobby_StartButton' onClick={handleStartGame}> Start</div>
                        <div className='Lobby_StartButton' onClick={handleCloseLobby}> Close my lobby</div>
                    </div>
                </div>
                <div className='Lobby_PlayerContainer'>
                    {gameStore.lobbyPlayers.map((player) => (
                        <UserComponent {...player} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(LobbyPage)