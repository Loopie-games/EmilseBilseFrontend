import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import Board from '../../components/gameBoard/board/board';
import Tiles from '../../components/gameBoard/tiles/tiles';
import './gameboardPage.scss'

const GameboardPage = () => {
    const [tasklistShown, setTasklistShown] = useState(false);
    const [playersShown, setPlayersShown] = useState(false);

    const toggleTasklist = () => {
        setTasklistShown(!tasklistShown);
    }
    const togglePlayers = () => {
        setPlayersShown(!playersShown);
    }

    const [testTasks, setTestTasks] = useState([{ id: 1, action: 'test action', to: 'test to', by: 'test by', shown: false }]);




    return (
        <div className='Gameboard_Container'>
            <div className='Gameboard_NavBackground'></div>
            <div className='Gameboard_Wrapper'>
                <div className={`Gameboard_TracklistContainer ${tasklistShown ? 'shown' : ''}`} onClick={() => toggleTasklist()}>
                    <div className={`Gameboard_TracklistTitle ${tasklistShown ? 'shown' : ''}`}>{tasklistShown ? 'Tasklist' : 'T'}</div>
                    <div className={`Gameboard_TracklistComponentContainer ${tasklistShown ? 'shown' : ''}`}>
                        {testTasks.map((task: any) => (
                            <Tiles tile={task} />
                        ))}
                    </div>
                </div>

                <div className='test'>
                    <div className='test2'></div>
                </div>

                <div className='Gameboard_GameboardContainer'>
                    <div className='Gameboard_GameboardWrapper'>
                        <Board />
                    </div>
                </div>
                <div className='test3'>
                    <div className='test4'></div>
                </div>
                <div className={`Gameboard_PlayersContainer ${playersShown ? 'shown' : ''}`} onClick={() => togglePlayers()}>PLAYERS</div>
            </div>
        </div>
    )
}

export default observer(GameboardPage)