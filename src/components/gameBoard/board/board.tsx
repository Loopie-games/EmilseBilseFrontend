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
        return gameStore.tiles.find((tile: BoardTileDTO) => tile.aboutUser.id === playerId)?.aboutUser.color;
    }

    return (
        <>
            <div className='GameBoard_Container'>
                <div className={`GameBoard_TileContainer ${mobileStore.isMobile ? 'mobileGab' : 'desktopGab'}`}>
                    {gameStore.tiles.map((tile, index) => (
                        <>
                            <div style={{ "color": `${getPlayerColor(tile.aboutUser.id)}` }}
                                className={`GameBoard_Tile ${tile.isActivated ? 'active' : ''}`} key={index}
                                onClick={() => handleClick(tile)}
                                onMouseDown={handleTouchStart}
                                onMouseUp={handleTouchEnd}>
                                    {tile.aboutUser.nickname} {tile.byTile.tile.action}
                                
                                {tile.isActivated ?
                                    <div className='GameBoard_TileShadow'
                                        style={{ "boxShadow": `0px 0px 20px ${getPlayerColor(tile.aboutUser.id)}` }}>
                                    </div>
                                    : null}
                            </div>
                        </>
                    ))}
                    <div className='GameBoard_Tile active TileFree'> FREE</div>
                </div>
            </div>
        </>
    )
}

export default observer(Board)