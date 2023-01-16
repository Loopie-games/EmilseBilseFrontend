import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import './board.scss'
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import { State } from '../../../models/game/gameInterfaces';

const Board = () => {
    const { gameStore, mobileStore } = useStore();
    let triggerTime: number;
    let longPressTime = 200;

    const completeTile = async (boardTileDTO: BoardTileDTO) => {
        console.log('completeTile');
        
        await gameStore.turnTile(boardTileDTO.id)
        return
    }

    const handleClick = (e: any) => {
        if (e.tile === null) return;
        triggerTime > longPressTime ? completeTile(e) : completeTile(e);
        console.log(e);

    }

    const handleTouchStart = () => {
        triggerTime = Date.now();
    }
    const handleTouchEnd = () => {
        triggerTime = Date.now() - triggerTime;
    }

    const getPlayerColor = (playerId: string) => {
        if (playerId !== ' ') {
            return gameStore.colorMap.get(playerId)
        }
        
        return 'white'
    }

    const getTextColor = (boardTile: BoardTileDTO) => {
        return boardTile.aboutUser !== null ? boardTile.aboutUser?.id! : ' '
    }

    const getActivatedColor = (boardTile: BoardTileDTO) => {
        if (boardTile.aboutUser !== null) return boardTile.aboutUser?.id!

        return boardTile.activatedBy !== null ? boardTile.activatedBy?.id! : ' '
    }


    return (
        <>
            <div className='GameBoard_Container'>
                <div className={`GameBoard_TileContainer ${mobileStore.isMobile ? 'mobileGab' : 'desktopGab'}`}>

                    {gameStore.tiles.map((boardtile, index) => (
                        <>
                            {index !== 12 ?
                                <div style={{ "color": `${getPlayerColor(getTextColor(boardtile))}` }}
                                    className={`GameBoard_Tile ${boardtile.activatedBy !== null ? 'active' : ''}`} key={boardtile.tile?.id}
                                    onClick={() => handleClick(boardtile)}
                                    onMouseDown={handleTouchStart}
                                    onMouseUp={handleTouchEnd}>
                                    <span>{boardtile.aboutUser?.nickname} {boardtile.tile?.action}</span>

                                    {boardtile.activatedBy !== null ?
                                        <div className='GameBoard_TileShadow'
                                            style={gameStore.game?.state !== State.Ended ? { "boxShadow": `0px 0px 10px 0px ${getPlayerColor(getActivatedColor(boardtile))}` } : {}}
                                        >
                                        </div>
                                        : null}
                                </div>
                                : null}
                            {index === 12 ?
                                <div style={{ "color": `#fff` }}
                                    className={`GameBoard_Tile active TileFree`} key={boardtile.tile?.id}
                                > FREE

                                    <div className='GameBoard_TileShadow'
                                        style={gameStore.game?.state !== State.Ended ? { "boxShadow": `0px 0px 10px 0px #fff` } : {}}
                                    >
                                    </div>
                                </div>
                                : null}
                        </>
                    ))}
                </div>
            </div>
        </>
    )

    /*

     */
}

export default observer(Board)