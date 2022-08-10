import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
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




    return (
        <div className='Gameboard_Container'>
            <div className='Gameboard_NavBackground'></div>
            <div className='Gameboard_Wrapper'>
                <div className={`Gameboard_TracklistContainer ${tasklistShown ? 'shown' : ''}`} onClick={() => toggleTasklist()}>TRACKLIST</div>

                <div className='test'>
                    <div className='test2'></div>
                </div>

                <div className='Gameboard_GameboardContainer'>
                    <div className='Gameboard_GameboardWrapper'>GAMEBOARD</div>
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