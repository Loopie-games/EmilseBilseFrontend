import React, {useEffect, useState} from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import {useStore} from '../../stores/store'
import {UserDTO} from '../../models/user/userInterface';
import {observer} from 'mobx-react-lite';
import {useNavigate, useParams} from 'react-router-dom';
import {StartGameDto} from '../../models/game/gameInterfaces';
import {autorun, observe} from 'mobx';
import Popup from '../../components/shared/popups/popup';
import lobbyStore from '../../stores/lobbyStore';

const LobbyPage = () => {
    const {userStore, popupStore, lobbyStore} = useStore();
    const navigate = useNavigate();
    const params = useParams();

    const joinLobby = async () => {
        await lobbyStore.joinLobby(params.pin!).catch(() => {
            navigate("/")
            return
        }).then(()=>{
            autorun(() => {
                if(lobbyStore.gameId !== undefined){
                    navigate("/game/" + lobbyStore.gameId)
                    return;
                }
                if(lobbyStore.lobby ===undefined){
                    navigate("/")
                    return;
                }
            })
        })
    }

    useEffect(() => {
        joinLobby()
        return () => {
            lobbyStore.stopConnection()
        }
    }, [])


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
        if (lobbyStore.players.length >= 2) {
            try {
                await lobbyStore.startGame()
            }
            catch (e: any){
                popupStore.setErrorMessage(e.message)
                popupStore.show();
            }
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
                        <div className='Lobby_PinCode'>
                            <input type="text" placeholder='Pin Code' maxLength={5} readOnly
                                   onClick={() => savePinToClipboard()} value={params.pin}/>
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