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
        listenForLobbyClosing()
        window.addEventListener("beforeunload", (ev) => {
            ev.preventDefault();
            onExit()
            return
        });
        return () => {
            /*
            if (gameStore.game === undefined) {
                onExit()
            }
           
             */
        }
    }, [])

    const onExit = () => {
        if (gameStore.lobby?.id !== undefined) {
            if (gameStore.lobby.host === userStore.user!.id) {
                handleCloseLobby()
            }
            else {
                handleLeaveLobby()
            }
        }
    }

    const listenForGameStarting = async () => {
        try {
            await gameStore.gameStarting((gameId: string) => {
                navigate('/game/' + gameId)
            });
        } catch (e) {
            console.log(e)
        }
    }

    const listenForLobbyClosing = async () => {
        await gameStore.lobbyClosing(() => {
            navigate('/')
            return
        })
    }

    const savePinToClipboard = () => {
        try {
            navigator.clipboard.writeText(gameStore.lobby!.pin);
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseLobby = async () => {
        await gameStore.closeLobby(gameStore.lobby!.id)
    }

    const handleLeaveLobby = async () => {
        await gameStore.leaveLobby(gameStore.lobby!.id)
        navigate('/')
    }

    const handleStartGame = async () => {
        if (gameStore.lobbyPlayers.length >= 2) {
            await gameStore.startGame(gameStore.lobby!.id, () => { })
            return
        } else {

            popupStore.setErrorMessage('You need at least 2 players to start the game')
            popupStore.show();
        }

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
                            <div className='Lobby_StartButton' onClick={gameStore.lobby?.host === userStore.user?.id ? handleCloseLobby : handleLeaveLobby}>{`${gameStore.lobby?.host === userStore.user?.id ? 'Close Lobby' : 'Leave Lobby'}`}</div>
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