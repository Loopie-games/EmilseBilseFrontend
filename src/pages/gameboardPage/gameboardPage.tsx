import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import Board from '../../components/gameBoard/board/board';
import Player from '../../components/gameBoard/player/player';
import Tiles from '../../components/gameBoard/tiles/tiles';
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import InvertedCornerQ2 from '../../components/shared/invertedCorners/invertedCornerQ2';
import { BoardTileDTO } from '../../models/tile/tileInterface';
import { useStore } from '../../stores/store';
import './gameboardPage.scss'

const GameboardPage = () => {
    const [tasklistShown, setTasklistShown] = useState(false);
    const [playersShown, setPlayersShown] = useState(false);
    const { gameStore, userStore } = useStore();
    
    useEffect(() => {
        waitForBoard()
        return () => {
            gameStore.gameId = undefined;
        }
    }, [])


    const waitForBoard = async () => {
        await gameStore.connectToGame(gameStore.gameId!, ()=> {
            
        })
    }

    const toggleTasklist = () => {
        setTasklistShown(!tasklistShown);
    }
    const togglePlayers = () => {
        setPlayersShown(!playersShown);
    }

    return (
        <div className='Gameboard_Container'>
            <div className='Gameboard_Wrapper'>
                <div className={`Gameboard_TracklistContainer ${tasklistShown ? 'shown' : ''}`}>
                    <div onClick={() => toggleTasklist()} className={`Gameboard_TracklistTitle ${tasklistShown ? 'shown' : ''}`}>{tasklistShown ? 'Tasklist' : 'T'}</div>
                    <div className={`Gameboard_TracklistComponentContainer ${tasklistShown ? 'shown' : ''}`}>
                        {gameStore.tiles?.map((tile: BoardTileDTO) => (
                            <Tiles {...tile} />
                        ))}
                    </div>
                </div>

                <InvertedCornerQ1 />

                <div className='Gameboard_GameboardContainer'>
                    <div className='Gameboard_GameboardWrapper'>
                        <Board />
                    </div>
                </div>
                <InvertedCornerQ2 />
                <div className={`Gameboard_PlayersContainer ${playersShown ? 'shown' : ''}`}>
                    <div onClick={() => togglePlayers()} className={`Gameboard_PlayersTitle ${playersShown ? 'shown' : ''}`}>{playersShown ? 'Players' : 'P'}</div>
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
    )
}

export default observer(GameboardPage)