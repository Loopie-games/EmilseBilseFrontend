import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import { observer } from 'mobx-react-lite';
import './board.scss'
import { BoardTileDTO } from '../../../models/tile/tileInterface';

const Board = () => {

    const { gameStore, mobileStore } = useStore();

    let triggerTime: number;
    let longPressTime = 200;

    /**
     * @Description completes the tile if it is not already completed
     * @param boardTileDTO the tile to complete
     * @returns out of the function
     */
    const completeTile = async (boardTileDTO: BoardTileDTO) => {
        await gameStore.turnTile(boardTileDTO.id)
        return
    }

    /**
     * @Description completes the tile if it is not already completed
     */
    const handleClick = (e: any) => {
        triggerTime > longPressTime ? completeTile(e) : completeTile(e);
    }

    /**
     * @Description starts the timer for the long press
     */
    const handleTouchStart = () => {
        triggerTime = Date.now();
    }

    /**
     * @Description ends the timer for the long press
     */
    const handleTouchEnd = () => {
        triggerTime = Date.now() - triggerTime;
    }

    /**
     * @Description gets the player color for the tile
     * @param playerId the id of the player to get the color for
     * @returns the color of the player
     */
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
                                {index}
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