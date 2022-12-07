import { HubConnectionState } from '@microsoft/signalr';
import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Board from '../../components/gameBoard/board/board';
import Player from '../../components/gameBoard/player/player';
import Tiles from '../../components/gameBoard/tiles/tiles';
import Winnerscreen from '../../components/gameBoard/winnerscreen/winnerscreen';
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import InvertedCornerQ2 from '../../components/shared/invertedCorners/invertedCornerQ2';
import InvertedCornerQ3 from '../../components/shared/invertedCorners/invertedCornerQ3';
import InvertedCornerQ4 from '../../components/shared/invertedCorners/invertedCornerQ4';
import { GameDTO, State } from '../../models/game/gameInterfaces';
import { BoardTileDTO, BoardDTO } from '../../models/tile/tileInterface';
import { useStore } from '../../stores/store';
import './gameboardPage.scss'

const GameboardPage = () => {
    const [tasklistShown, setTasklistShown] = useState(false);
    const [playersShown, setPlayersShown] = useState(false);
    const [winnerFound, setWinnerFound] = useState(false)
    const { gameStore, userStore, popupStore, mobileStore } = useStore();
    //TODO: Remove after test and design
    const [testWinner, setTestWinner] = useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        connectToGame()
        return () => {
            gameStore.stopConnection();
        }
    }, [])

    useEffect(() => {
        if (gameStore.game?.state === State.Ended) {
            //navigate(`/game/won/${gameStore.game.id}`)
        }
    }, [gameStore.game?.state])

    useEffect(() => {
        console.log(gameStore.game);

    }, [gameStore.game])


    const connectToGame = async () => {
        await gameStore.connectToGame(params.id!)
            .catch(() => {
                //TODO ERROR
                navigate("/")
                return
            }).then(() => {
                autorun(() => {
                    if (gameStore.hubConnection !== null && gameStore.hubConnection.state === HubConnectionState.Connected) {
                        if (gameStore.game === undefined) {
                            //TODO ERROR
                            navigate("/")
                            return;
                        }
                        if (gameStore.boardFilled) {
                            popupStore.showConfirmation("Confirm win", "Are you sure you're done?", () => {
                                gameStore.claimWin()
                                gameStore.boardFilled = false
                            }, () => { gameStore.boardFilled = false })
                        }
                        if (gameStore.game!.host.id === userStore.user!.id) {
                            //player is host
                            console.log("host");
                            console.log();


                            if (gameStore.game!.state === State.Paused && gameStore.game!.winnerId != undefined) {

                                popupStore.showConfirmation("Confirm win claim", " conirm or deny win", async () => {
                                    await gameStore.confirmWin();
                                }, async () => {
                                    await gameStore.denyWin()
                                })
                            }
                        }
                    }
                })
            })
        return
    }

    const toggleTasklist = () => {
        setTasklistShown(!tasklistShown);
    }
    const togglePlayers = () => {
        setPlayersShown(!playersShown);
    }

    return (
        <>
            {(gameStore.game?.winnerId != undefined && gameStore.game?.state == State.Paused) &&

                <div className='Gameboard_WinnerClaim'>
                    <div className='Gameboard_WinnerClaimBox'>
                        <div className='Gameboard_WinnerClaimBoxTitle'>Game Paused!</div>
                        <div className='Gameboard_WinnerClaimBoxContent'>The host is currently confirming a winner claim. Please wait</div>
                    </div>
                </div>
            }
            <div className='Gameboard_Container'>
                <div className='Gameboard_Wrapper'>
                    {/**
                    <div className={`Gameboard_TracklistContainer ${tasklistShown ? 'shown' : ''}`}>
                        <div onClick={() => toggleTasklist()}
                             className={`Gameboard_TracklistTitle ${tasklistShown ? 'shown' : ''}`}>{tasklistShown ? 'Tasklist' : 'T'}</div>
                        <div className={`Gameboard_TracklistComponentContainer ${tasklistShown ? 'shown' : ''}`}>
                            {gameStore.tiles?.map((tile: BoardTileDTO) => (
                                <Tiles {...tile} />
                            ))}
                        </div>
                    </div>

                    <InvertedCornerQ1/>
                    {mobileStore.isMobile && <InvertedCornerQ3/>}
 */}

                    {gameStore.game?.state === State.Ended &&
                        <div className='Gameboard_WinnerOverlayContainer'>
                            <div className='GameBoard_WinnerTitleContainer'>
                                <h1 className='Gameboard_WinnerTitle'>Congratulations</h1>
                            </div>
                            <div className='Gameboard_WinnerParagraphContainer'>
                                <p className='Gameboard_WinnerParagraph'>The game has ended</p>
                            </div>
                        </div>
                    }

                    <h1 className='Gameboard_Title'>{gameStore.game?.name}</h1>
                    <div className='Gameboard_GameboardContainer'>
                        {mobileStore.isMobile &&
                            <div className='GameBoard_MobileBack' onClick={() => navigate('/')}>← Back to home</div>
                        }
                        <div className={`Gameboard_GameboardWrapper ${mobileStore.isMobile ? 'mobile' : 'desktop'}`}>
                            <Board />
                        </div>
                    </div>
                    <InvertedCornerQ2 />
                    {mobileStore.isMobile && <InvertedCornerQ4 />}
                    <div className={`Gameboard_PlayersContainer ${playersShown ? 'shown' : ''}`}>
                        <div onClick={() => togglePlayers()}
                            className={`Gameboard_PlayersTitle ${playersShown ? 'shown' : ''}`}>{playersShown ? 'Players' : 'P'}</div>
                        <div className={`Gameboard_PlayersComponentContainer ${playersShown ? 'shown' : ''}`}>
                            {gameStore.players.map((player: any) => (
                                <>
                                    {player.id !== userStore.user!.id ? <Player player={player} /> : null}
                                </>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(GameboardPage)