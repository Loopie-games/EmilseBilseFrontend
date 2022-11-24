import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
import { autorun } from 'mobx';
import { HubConnectionState } from '@microsoft/signalr';
import GameSettings from '../../components/Lobby/gameSettings/gameSettings';
import MobileGameSettings from '../../components/Lobby/mobileGameSettings/mobileGameSettings';
import Loader from '../../components/shared/loader/loader';
import { pendingPlayerDto } from '../../models/player/playerInterface';
import { SimpleUserDTO } from '../../models/user/userInterface';
import { TilePackSetting } from "../../models/tile/tileInterface";
import sortService from '../../services/sortService';
import { SORT_TYPE } from '../../models/sortService/sortServiceInterface';

const LobbyPage = () => {
    const { userStore, popupStore, lobbyStore, mobileStore, gameModeStore } = useStore();
    const [tilePacks, setTilePacks] = useState<TilePackSetting[]>([])
    const navigate = useNavigate();
    const params = useParams();
    const [hostActive, setHostActive] = useState<boolean>(false);
    const [t, setT] = useState<SimpleUserDTO>();
    const [sorted, setSorted] = useState<pendingPlayerDto[]>([]);

    useEffect(() => {
        joinLobby()

        return () => {
            lobbyStore.stopConnection()
        }
    }, [])

    useEffect(() => {
        findHost();
        if (getHostAvailability()) {
            setHostActive(true);
        } else {
            setHostActive(false);
        }
        setSorted(sortService.sortArray(lobbyStore.players, SORT_TYPE.Ascending));
    }, [lobbyStore.players])

    const getHostAvailability = () => {
        if (lobbyStore.players.length > 0) {
            const host = lobbyStore.players.find(p => p.isHost);
            return host !== undefined;
        }
    }

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
            let activated = tilePacks.filter(t => t.isActivated).map(t => t.tilePack.id);
            let gamemode = gameModeStore.gameModes.filter(g => g.isActivated)[0].gameMode.name;
            if (gamemode === 'Free For All') {
                if (activated.length < 1) {
                    popupStore.showError("An Error Occured", "Please select at least one tile pack")
                    return;
                }
                await lobbyStore.startFFA({ lobbyId: lobbyStore.lobby!.id, tpIds: activated })
            } else if (gamemode === 'Original Gamemode') {
                await lobbyStore.startGame({ lobbyId: lobbyStore.lobby?.id!, tpIds: activated })
            } else if (gamemode === 'Shared Board') {
                await lobbyStore.startShared({ lobbyId: lobbyStore.lobby?.id!, tpIds: activated })
            }
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

    const findHost = async () => {
        if (lobbyStore.players.length > 0) {
            let t = await userStore.getUserById(lobbyStore.lobby?.host!)
            if (t !== undefined) {
                setT(t)
            }
        }
    }

    return (
        <>
            {isHost() &&
                <>
                    {mobileStore.isMobile ? <MobileGameSettings tilePacks={tilePacks} setTilePacks={(tps: TilePackSetting[]) => setTilePacks(tps)} /> :
                        <GameSettings tilePacks={tilePacks} setTilePacks={(tps: TilePackSetting[]) => setTilePacks(tps)} />
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
                                <Loader />
                            </>
                        }
                    </div>
                    <div className='Lobby_PlayerContainer'>
                        {t !== undefined &&
                            <div style={{ 'opacity': hostActive ? '1' : '.5' }}>
                                <UserComponent {...t!} />
                            </div>
                        }
                        {sorted.map((player) => (<>
                            {player.isHost ? null : <UserComponent key={player.id} {...player.user} />}
                        </>
                        ))}
                    </div>
                </div>
            </div>
        </>

    )
}

export default observer(LobbyPage)