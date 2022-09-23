import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { StartGameDto } from '../../models/game/gameInterfaces';
import { autorun } from 'mobx';
import Popup from '../../components/shared/popups/popup';
import lobbyStore from '../../stores/lobbyStore';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import GameSettings from '../../components/Lobby/gameSettings/gameSettings';

const LobbyPage = () => {
    const { userStore, popupStore, lobbyStore } = useStore();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        joinLobby()
        return () => {
            lobbyStore.stopConnection()
        }
    }, [])

    const joinLobby = async () => {
        await lobbyStore.joinLobby(params.pin!)
            .catch(() => {
                //TODO ERROR
                navigate("/")
                return
            }).then(() => {
                autorun(() => {
                    if (lobbyStore.hubConnection !== null && lobbyStore.hubConnection.state === HubConnectionState.Connected) {
                        if (lobbyStore.gameId !== undefined) {
                            //TODO ERROR
                            navigate("/game/" + lobbyStore.gameId)
                            return;
                        }
                        if (lobbyStore.lobby === undefined) {
                            //TODO ERROR
                            navigate("/")
                            return;
                        }
                    }
                    return;
                })
            })
        return
    }

    const savePinToClipboard = () => {
        try {
            navigator.clipboard.writeText(params.pin!);
        } catch (e) {
            console.log(e)
        }
    }

    const handleCloseLobby = async () => {
        navigate('/')
        await lobbyStore.closeLobby()
        return
    }

    const handleLeaveLobby = async () => {
        navigate('/')
        return
    }

    const handleStartGame = async () => {
        try {
            await lobbyStore.startGame()
        } catch (e: any) {
            popupStore.setErrorMessage(e.message)
            popupStore.show();
        }
    }

    const isHost = () => {
        if (lobbyStore.lobby === undefined) {
            return false
        }
        return lobbyStore.lobby.host === userStore.user?.id
    }
    return (
        <>
            {isHost() &&
                <GameSettings />
            }
            <div className='Lobby_Container'>
                <div className='Lobby_Wrapper'>
                    <div className='Lobby_Title'>
                        Lobby
                    </div>
                    <div className='Lobby_InputContainer'>
                        <div className='Lobby_PinCode'>
                            <input type="text" placeholder='Pin Code' maxLength={5} readOnly
                                onClick={() => savePinToClipboard()} value={params.pin} />
                        </div>
                        {lobbyStore.lobby !== undefined ?
                            <div className='Lobby_ButtonsContainer'>
                                {lobbyStore.lobby!.host === userStore.user!.id ?
                                    <div className='Lobby_StartButton' onClick={handleStartGame}> Start</div> : null}
                                <div className='Lobby_StartButton'
                                    onClick={lobbyStore.lobby!.host === userStore.user?.id ? handleCloseLobby : handleLeaveLobby}>{`${lobbyStore.lobby!.host === userStore.user?.id ? 'Close Lobby' : 'Leave Lobby'}`}</div>
                            </div>
                            :
                            <>
                                Loading
                            </>
                        }
                    </div>
                    <div className='Lobby_PlayerContainer'>
                        {lobbyStore.players.map((player) => (
                            <UserComponent {...player} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(LobbyPage)