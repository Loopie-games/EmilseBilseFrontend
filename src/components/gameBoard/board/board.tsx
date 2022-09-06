import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { observer } from 'mobx-react-lite';
import './board.scss'
import gameboardPage from '../../../pages/gameboardPage/gameboardPage';
import { BoardTileDTO } from '../../../models/tile/tileInterface';

const Board = () => {

    const { gameStore, userStore,popupStore } = useStore();
    const [counter, setCounter] = useState(0);
    let triggerTime: number;
    let longPressTime = 200;
    useEffect(() => {
        console.log(gameStore.tiles);
        console.log(gameStore.players);


    }, [])

    const completeTile = (tile: BoardTileDTO) => {
        gameStore.turnTile(tile.id, ()=>{

        })
        gameStore.needsConfirmation ? console.log("needs confirmation") : console.log("no confirmation needed");
        popupStore.setErrorMessage("Lorem Ipsum");
        popupStore.setTitle("Lorem Ipsum");
        popupStore.setOnConfirm(async () => {
            console.log("confirmed");
            popupStore.hide();
            await gameStore.claimWin(tile.board.id)
        })
        popupStore.setOnCancel(async () => {
            console.log("cancelled");
            popupStore.hide();
            await gameStore.turnTile(tile.id, () => {})
        })
        popupStore.setConfirmation(true);
        popupStore.show();
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
    )
}

export default observer(Board)