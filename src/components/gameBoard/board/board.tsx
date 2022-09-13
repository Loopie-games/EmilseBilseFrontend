import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { observer } from 'mobx-react-lite';
import './board.scss'
import gameboardPage from '../../../pages/gameboardPage/gameboardPage';
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import { POPUP_STATES } from '../../shared/popups/popup';

const Board = () => {

    const { gameStore, userStore,popupStore } = useStore();
    const [counter, setCounter] = useState(0);
    let triggerTime: number;
    let longPressTime = 200;
    useEffect(() => {
    }, [])

    const completeTile = async (tile: BoardTileDTO) => {
        await gameStore.turnTile(tile.id, (popup : POPUP_STATES| undefined) => {
            if (popup === POPUP_STATES.winClaim) {
                const onConfirmWin = async () => {
                    await gameStore.claimWin(tile.board.id)
                }
                const onCancelWin = async () => {
                    await gameStore.turnTile(tile.id, () => {})
                }
                popupStore.showConfirmation("Claim win", "You have filled the board. Are you sure, that you are done?", onConfirmWin, onCancelWin)
            }
            return
        })
        return
    }



    const handleClick = (e: any) => {
        console.log(getPlayerColor(e.aboutUser.id));

        triggerTime > longPressTime ? completeTile(e) : completeTile(e);
    }

    const handleTouchStart = (e: any) => {
        triggerTime = Date.now();
    }
    const handleTouchEnd = (e: any) => {
        triggerTime = Date.now() - triggerTime;
    }

    const getPlayerColor = (playerId: string) => {
        return gameStore.tiles.find((tile: BoardTileDTO) => tile.aboutUser.id === playerId)?.aboutUser.color;
    }


    return (
        <>
        <div className='GameBoard_Container'>
            <div className='GameBoard_TileContainer'>
                {gameStore.tiles.map((tile, index) => (
                    <>
                        <div style={{ "color": `${getPlayerColor(tile.aboutUser.id)}` }} className={`GameBoard_Tile ${tile.isActivated ? 'active' : ''}`} key={index}
                            onClick={() => handleClick(tile)}
                            onMouseDown={handleTouchStart}
                            onMouseUp={handleTouchEnd}>
                            {index}
                            {tile.isActivated ?
                                <div className='GameBoard_TileShadow' style={{ "boxShadow": `0px 0px 20px ${getPlayerColor(tile.aboutUser.id)}` }} >
                                </div>
                                : null}
                        </div>

                    </>
                ))}
                <div className='GameBoard_Tile active TileFree'> FREE </div>
            </div>
        </div>
        </>
    )
}

export default observer(Board)