import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { observer } from 'mobx-react-lite';
import './board.scss'
import gameboardPage from '../../../pages/gameboardPage/gameboardPage';
import { BoardTileDTO, TileDTO } from '../../../models/tile/tileInterface';

const Board = () => {

    const { gameStore, userStore } = useStore();
    const [testData, setTestData] = useState<any[]>([{ id: 1, completed: false }, { id: 2, completed: false }, { id: 3, completed: false }, { id: 4, completed: false }, { id: 5, completed: false }, { id: 6, completed: false }, { id: 7, completed: false }, { id: 8, completed: false }, { id: 9, completed: false }, { id: 10, completed: false }, { id: 11, completed: false }, { id: 12, completed: false }, { id: 13, completed: false }, { id: 14, completed: false }, { id: 15, completed: false }, { id: 16, completed: false }, { id: 17, completed: false }, { id: 18, completed: false }, { id: 19, completed: false }, { id: 20, completed: false }, { id: 21, completed: false }, { id: 22, completed: false }, { id: 23, completed: false }, { id: 24, completed: false },]);
    const [counter, setCounter] = useState(0);
    let triggerTime: number;
    let longPressTime = 200;
    useEffect(() => {
    }, [])

    const completeTile = (tile: any) => {
        testData.find(x => x.id === tile.id).completed = !testData.find(x => x.id === tile.id).completed;
        setTestData([...testData]);

        console.log(tile.completed);

    }

    const test = (tile: any) => {
        gameStore.tiles![0].isActivated = !gameStore.tiles![0].isActivated;
    }

    const handleClick = (e: any) => {
        triggerTime > longPressTime ? test(e) : completeTile(e);
    }

    const handleTouchStart = (e: any) => {
        triggerTime = Date.now();
    }
    const handleTouchEnd = (e: any) => {
        triggerTime = Date.now() - triggerTime;
    }

    const getColor = (tile: BoardTileDTO) => {
        gameStore.players.forEach(player => {

            if (player.id === tile.tile.user.id) {
                return player.color;
            }
        })
        return '#000000';
    }


    return (
        <div className='GameBoard_Container'>
            <div className='GameBoard_TileContainer'>
                {gameStore.tiles.map((tile, index) => (
                    <div style={{ "boxShadow": tile.isActivated ? `0px 0px 4px ${getColor(tile)};` : '' }} className={`GameBoard_Tile ${tile.isActivated ? 'active' : ''}`} key={index}
                        onClick={() => handleClick(tile)}
                        onMouseDown={handleTouchStart}
                        onMouseUp={handleTouchEnd}>
                        {index}
                    </div>
                ))}
                <div className='GameBoard_Tile active TileFree'> FREE </div>
            </div>
        </div>
    )
}

export default observer(Board)