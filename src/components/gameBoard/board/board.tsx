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
    useEffect(() => {
        console.log(gameStore.tiles);


    }, [gameStore.tiles])

    const completeTile = async (boardTileDTO: BoardTileDTO) => {
        await gameStore.turnTile(boardTileDTO.id)
        return
    }

    const handleClick = (e: any) => {
        if (e.aboutUser === null) return;
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
        console.log(playerId);

        if (playerId !== ' ') {
            return gameStore.colorMap.get(playerId)
        }
        return 'white'
    }

    return (
        <>
            <div className='GameBoard_Container'>
                <div className={`GameBoard_TileContainer ${mobileStore.isMobile ? 'mobileGab' : 'desktopGab'}`}>

                    {gameStore.tiles.map((boardtile, index) => (
                        <>
                            {index !== 12 ?
                                <div style={{ "color": `${getPlayerColor(boardtile.aboutUser?.id ?? ' ')}` }}
                                    className={`GameBoard_Tile ${boardtile.activatedBy !== null ? 'active' : ''}`} key={index}
                                    onClick={() => handleClick(boardtile)}
                                    onMouseDown={handleTouchStart}
                                    onMouseUp={handleTouchEnd}>
                                    {boardtile.aboutUser?.nickname} {boardtile.tile?.action}

                                    {boardtile.activatedBy !== null ?
                                        <div className='GameBoard_TileShadow'
                                            style={gameStore.game?.state !== State.Ended ? { "boxShadow": `0px 0px 10px 0px ${getPlayerColor(boardtile.activatedBy?.id ?? ' ')}` } : {}}
                                        >
                                        </div>
                                        : null}
                                </div>
                                : null}
                            {index === 12 ?
                                <div style={{ "color": `#fff` }}
                                    className={`GameBoard_Tile active TileFree`} key={index}
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