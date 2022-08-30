import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { observer } from 'mobx-react-lite';
import './board.scss'
import gameboardPage from '../../../pages/gameboardPage/gameboardPage';
import { BoardTileDTO } from '../../../models/tile/tileInterface';

const Board = () => {

    const { gameStore, userStore } = useStore();
    const [testData, setTestData] = useState<any[]>([{ id: 1, completed: false }, { id: 2, completed: false }, { id: 3, completed: false }, { id: 4, completed: false }, { id: 5, completed: false }, { id: 6, completed: false }, { id: 7, completed: false }, { id: 8, completed: false }, { id: 9, completed: false }, { id: 10, completed: false }, { id: 11, completed: false }, { id: 12, completed: false }, { id: 13, completed: false }, { id: 14, completed: false }, { id: 15, completed: false }, { id: 16, completed: false }, { id: 17, completed: false }, { id: 18, completed: false }, { id: 19, completed: false }, { id: 20, completed: false }, { id: 21, completed: false }, { id: 22, completed: false }, { id: 23, completed: false }, { id: 24, completed: false },]);
    const [counter, setCounter] = useState(0);
    let triggerTime: number;
    let longPressTime = 200;
    useEffect(() => {
    }, [])

    const completeTile = (tile: BoardTileDTO) => {
        gameStore.tiles.find((t: any) => t.id === tile.id)!.isActivated = !gameStore.tiles.find((t: any) => t.id === tile.id)?.isActivated;
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

    const hslToHex = (h: number, s: number, l: number) => {
        l /= 100;
        const a = s * Math.min(l, 1 - l) / 100;
        const f = (n: number) => {
            const k = (n + h / 30) % 12;
            const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
            return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
        };
        return `#${f(0)}${f(8)}${f(4)}`;
    }

    const getColor = (tile: BoardTileDTO) => {
        let color;

        gameStore.players.forEach(player => {


            if (player.id === tile.aboutUser.id) {
                const t = player.color.substring(4, 17)
                t.split(',')
                const h = parseInt(t[0])
                const s = parseInt(t[1])
                const l = parseInt(t[2])
                color = hslToHex(h, s, l)
            }
        })
        console.log(color);

        return color;
    }


    return (
        <div className='GameBoard_Container'>
            <div className='GameBoard_TileContainer'>
                {gameStore.tiles.map((tile, index) => (
                    <>
                        <div className={`GameBoard_Tile ${tile.isActivated ? 'active' : ''}`} key={index}
                            onClick={() => handleClick(tile)}
                            onMouseDown={handleTouchStart}
                            onMouseUp={handleTouchEnd}>
                            {index}
                            {tile.isActivated ?
                                <div className='GameBoard_TileShadow' style={{ "boxShadow": `0px 0px 100px ${getColor(tile)}` }} >
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