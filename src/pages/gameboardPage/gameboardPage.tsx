import {observer} from 'mobx-react-lite'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom';
import Board from '../../components/gameBoard/board/board';
import Player from '../../components/gameBoard/player/player';
import Tiles from '../../components/gameBoard/tiles/tiles';
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import InvertedCornerQ2 from '../../components/shared/invertedCorners/invertedCornerQ2';
import {GameDTO, State} from '../../models/game/gameInterfaces';
import {BoardTileDTO, BoardDTO} from '../../models/tile/tileInterface';
import {useStore} from '../../stores/store';
import './gameboardPage.scss'

const GameboardPage = () => {
    const [tasklistShown, setTasklistShown] = useState(false);
    const [playersShown, setPlayersShown] = useState(false);
    const [winnerFound, setWinnerFound] = useState(false)
    const {gameStore, userStore, popupStore} = useStore();
    const params = useParams();

    useEffect(() => {
        console.log('====================================');
        console.log(params.id);
        console.log('====================================');
        waitForBoard()
        return () => {
            gameStore.game = undefined;
        }
    }, [])


    const waitForBoard = async () => {
        await gameStore.createHubConnection();
        await gameStore.connectToGame(params.id!, async (boardId: string) => {
            if (gameStore.game!.host.id === userStore.user!.id) {
                //player is host
                await gameStore.listenWinnerClaimed(async (board: BoardDTO) => {
                    let winner = await userStore.getUserById(board.userId)
                    popupStore.showConfirmation("Confirm win claim", "check board of " + winner.username + " and conirm or deny win", async () => {
                        await gameStore.confirmWin();
                    }, async () => {
                        await gameStore.denyWin()
                    })

                })
                if (gameStore.game!.state === State.Paused && gameStore.game!.winner != undefined) {
                    popupStore.showConfirmation("Confirm win claim", "check board of " + gameStore.game!.winner!.username + " and conirm or deny win", async () => {
                        await gameStore.confirmWin();
                    }, async () => {
                        await gameStore.denyWin()
                    })
                }

            }
        })
    }

    const toggleTasklist = () => {
        setTasklistShown(!tasklistShown);
    }
    const togglePlayers = () => {
        setPlayersShown(!playersShown);
    }

    return (
        <>
            {(gameStore.game?.winner != undefined && gameStore.game?.state == State.Paused) &&
            <div className='Gameboard_WinnerClaim'>
                <div className='Gameboard_WinnerClaimBox'>
                    <div className='Gameboard_WinnerClaimBoxTitle'>Game Paused!</div>
                    <div className='Gameboard_WinnerClaimBoxContent'>The host i currently confirming a winner claim
                        from {gameStore.game?.winner.username}. Please wait
                    </div>
                </div>
            </div>
            }
            {(gameStore.game?.winner != undefined && gameStore.game?.state == State.Ended) &&
            <div className='Gameboard_WinnerClaim'>
                <div className='Gameboard_WinnerClaimBox'>
                    <div className='Gameboard_WinnerClaimBoxTitle'>Game Ended!</div>
                    <div className='Gameboard_WinnerClaimBoxContent'> {gameStore.game?.winner.username} has Won!
                    </div>
                </div>
            </div>
            }
            <div className='Gameboard_Container'>
                <div className='Gameboard_Wrapper'>
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

                    <div className='Gameboard_GameboardContainer'>
                        <div className='Gameboard_GameboardWrapper'>
                            <Board/>
                        </div>
                    </div>
                    <InvertedCornerQ2/>
                    <div className={`Gameboard_PlayersContainer ${playersShown ? 'shown' : ''}`}>
                        <div onClick={() => togglePlayers()}
                             className={`Gameboard_PlayersTitle ${playersShown ? 'shown' : ''}`}>{playersShown ? 'Players' : 'P'}</div>
                        <div className={`Gameboard_PlayersComponentContainer ${playersShown ? 'shown' : ''}`}>
                            {gameStore.players.map((player: any) => (
                                <>
                                    {player.id !== userStore.user!.id ? <Player player={player}/> : null}
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