import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { StartGameDto } from '../../models/game/gameInterfaces';
import { observe } from 'mobx';
import Popup from '../../components/shared/popups/popup';

const LobbyPage = () => {
    const { gameStore, userStore, popupStore } = useStore();
    const navigate = useNavigate();



    useEffect(() => {
        listenForGameStarting()
        /*
        return () => {
            gameStore.leaveLobby(gameStore.lobby!.id, userStore.user!.id)
        }
         */


    }, [])

    const listenForGameStarting = async () => {
        try {
            await gameStore.gameStarting(() => {
                navigate('/game')
            });
        } catch (e) {
            console.log(e)
        }
    }

    const savePinToClipboard = () => {
        try {
            navigator.clipboard.writeText(gameStore.lobby!.pin);
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseLobby = async () => {
        await gameStore.leaveLobby(gameStore.lobby!.id, userStore.user!.id)
        navigate('/')
    }

    const handleStartGame = async () => {
        if (gameStore.lobbyPlayers.length >= 2) {
            let sg: StartGameDto = { userId: userStore.user!.id, lobbyId: gameStore.lobby!.id }
            await gameStore.startGame(sg, () => {
                navigate('/game')
            })
            return
        }
    
        popupStore.setErrorMessage('You need at least 2 players to start the game')
        popupStore.show();

    }

    return (
        <>
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
                            {gameStore.lobby?.host === userStore.user!.id ?
                                <div className='Lobby_StartButton' onClick={handleStartGame}> Start</div> : null}
                            <div className='Lobby_StartButton' onClick={handleCloseLobby}>{`${gameStore.lobby?.host === userStore.user?.id ? 'Close Lobby' : 'Leave Lobby'}`}</div>
                        </div>
                    </div>
                    <div className='Lobby_PlayerContainer'>
                        {gameStore.lobbyPlayers.map((player) => (
                            <UserComponent {...player} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(LobbyPage)