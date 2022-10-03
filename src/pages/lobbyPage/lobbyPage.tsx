import React, { useEffect } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { autorun } from 'mobx';
import { HubConnectionState } from '@microsoft/signalr';
import GameSettings from '../../components/Lobby/gameSettings/gameSettings';
import MobileGameSettings from '../../components/Lobby/mobileGameSettings/mobileGameSettings';

const LobbyPage = () => {
    const { userStore, popupStore, lobbyStore, mobileStore } = useStore();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        joinLobby()
        return () => {
            lobbyStore.stopConnection()
        }
    }, [])

    /**
     * @Description Tries to join the lobby with the given pin from the url.
     *              If successful, it will start the connection to the lobby hub and listen for state changes.
     * @returns out of the function if something goes wrong prematurely
     */
    const joinLobby = async () => {
        await lobbyStore.joinLobby(params.pin!)
            .catch(() => {
                popupStore.showError('An Error Occured!', 'Could not connect to the lobby. Please try again later, or submit a bug report if the problem persists.')
                navigate("/")
                return
            }).then(() => {
                autorun(() => {
                    if (lobbyStore.hubConnection !== null && lobbyStore.hubConnection.state === HubConnectionState.Connected) {
                        if (lobbyStore.gameId !== undefined) {
                            navigate("/game/" + lobbyStore.gameId)
                            return;
                        }
                        if (lobbyStore.lobby === undefined) {
                            popupStore.showError('An Error Occured!', 'Could not connect to the lobby. Please try again later, or submit a bug report if the problem persists.')
                            navigate("/")
                            return;
                        }
                    }
                    return;
                })
            })
        return
    }

    /**
     * @Description Saves the pin to the clipboard when input is clicked for easy sharing.
     */
    const savePinToClipboard = () => {
        try {
            navigator.clipboard.writeText(params.pin!);
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * @Description Closes the lobby and navigates back to the landing page.
     * @returns 
     */
    const handleCloseLobby = async () => {
        navigate('/')
        await lobbyStore.closeLobby()
        return
    }

    /**
     * @Description Leaves the lobby open and navigates back to the landing page.
     */
    const handleLeaveLobby = async () => {
        navigate('/')
        return
    }

    /**
     * @Description Starts the game if the user is the host.
     */
    const handleStartGame = async () => {
        try {
            await lobbyStore.startGame({ lobbyId: lobbyStore.lobby?.id!, tpIds: undefined })
        } catch (e: any) {
            popupStore.setErrorMessage(e.message)
            popupStore.show();
        }
    }

    /**
     * @Description Validation check for the start game button.
     */
    const isHost = () => {
        if (lobbyStore.lobby === undefined) {
            return false
        }
        return lobbyStore.lobby.host === userStore.user?.id
    }
    return (
        <>
            {isHost() &&
                <>
                    {mobileStore.isMobile ? <MobileGameSettings /> :
                        <GameSettings />
                    }
                </>
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