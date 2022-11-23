import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import './board.scss'
import { BoardTileDTO } from '../../../models/tile/tileInterface';

const Board = () => {
    const { gameStore, mobileStore } = useStore();
    let triggerTime: number;
    let longPressTime = 200;
    useEffect(() => {

    }, [])

    const completeTile = async (boardTileDTO: BoardTileDTO) => {
        await gameStore.turnTile(boardTileDTO.id)
        return
    }

    const handleClick = (e: any) => {
        triggerTime > longPressTime ? completeTile(e) : completeTile(e);
    }

    const handleTouchStart = () => {
        triggerTime = Date.now();
    }
    const handleTouchEnd = () => {
        triggerTime = Date.now() - triggerTime;
    }

    const getPlayerColor = (playerId: string) => {
        return gameStore.tiles.find((tile: BoardTileDTO) => tile.ActivatedBy?.id! === playerId)?.ActivatedBy?.color;
    }

    return (
        <>
            <div className='GameBoard_Container'>
                <div className={`GameBoard_TileContainer ${mobileStore.isMobile ? 'mobileGab' : 'desktopGab'}`}>
                    {gameStore.tiles.map((boardtile, index) => (
                        <>
                            <div style={{ "color": `${getPlayerColor(boardtile.ActivatedBy?.id ?? ' ') }` }}
                                 className={`GameBoard_Tile ${boardtile.ActivatedBy !== undefined ? 'active' : ''}`} key={index}
                                 onClick={() => handleClick(boardtile)}
                                 onMouseDown={handleTouchStart}
                                 onMouseUp={handleTouchEnd}>
                                {boardtile.aboutUser?.nickname ?? ''} {boardtile.tile?.action ?? 'FREE'}

                                {boardtile.ActivatedBy !== undefined ?
                                    <div className='GameBoard_TileShadow'
                                         style={{ "boxShadow": `0px 0px 20px ${getPlayerColor(boardtile.ActivatedBy.id ?? ' ')}` }}>
                                    </div>
                                    : null}
                            </div>
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