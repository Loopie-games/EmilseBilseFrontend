import React from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'

const LobbyPage = () => {
    const { gameStore } = useStore();


    return (
        <div>
            <div>
                <div>
                    Lobby
                </div>
                <div>
                    <div className={`LandingPage-JoinInput`} >
                        <input type="text" placeholder='Pin Code' maxLength={5} readOnly value={gameStore.lobby?.pin} />
                    </div>
                </div>
                <div> Start</div>
                <div>
                    {gameStore.lobby?.players.map((player) => (
                        <UserComponent user={player} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LobbyPage