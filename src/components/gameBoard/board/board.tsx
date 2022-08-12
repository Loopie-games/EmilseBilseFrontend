import React, { useEffect, useRef, useState } from 'react'
import { useStore } from '../../../stores/store';
import logo from '../../../assets/Shared/EmilseBilseBingo_Logo.png'
import { observer } from 'mobx-react-lite';
import './board.scss'

const Board = () => {

    const { gameStore, userStore } = useStore();
    const [testData, setTestData] = useState<any[]>([{ id: 1, completed: false }, { id: 2, completed: false }, { id: 3, completed: false }, { id: 4, completed: false }, { id: 5, completed: false }, { id: 6, completed: false }, { id: 7, completed: false }, { id: 8, completed: false }, { id: 9, completed: false }, { id: 10, completed: false }, { id: 11, completed: false }, { id: 12, completed: false }, { id: 13, completed: false }, { id: 14, completed: false }, { id: 15, completed: false }, { id: 16, completed: false }, { id: 17, completed: false }, { id: 18, completed: false }, { id: 19, completed: false }, { id: 20, completed: false }, { id: 21, completed: false }, { id: 22, completed: false }, { id: 23, completed: false }, { id: 24, completed: false },]);
    const [counter, setCounter] = useState(0);
    let triggerTime: number;
    let longPressTime = 1000;
    useEffect(() => {
    }, [])

    const completeTile = (tile: any) => {
        testData.find(x => x.id === tile.id).completed = !testData.find(x => x.id === tile.id).completed;
        setTestData([...testData]);

        console.log(tile.completed);

    }

    const handleClick = (e: any) => {
        triggerTime > longPressTime ? console.log('long press') : completeTile(e);
    }

    const handleTouchStart = (e: any) => {
        triggerTime = Date.now();
    }
    const handleTouchEnd = (e: any) => {
        triggerTime = Date.now() - triggerTime;
    }


    return (
        <div className='GameBoard_Container'>
            <div className='GameBoard_Title'><img src={logo} alt="Logo"></img></div>
            <div className='GameBoard_TileContainer'>
                {testData.map((tile, index) => (
                    <div className={`GameBoard_Tile ${tile.completed ? 'active' : ''}`} key={index}
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