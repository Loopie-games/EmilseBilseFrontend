import React, { useEffect, useState } from 'react'
import UserComponent from '../../components/Lobby/userComponent/userComponent';
import './lobbyPage.scss'
import { useStore } from '../../stores/store'
import { UserDTO } from '../../models/user/userInterface';
import { observer } from 'mobx-react-lite';

const LobbyPage = () => {
    const { gameStore } = useStore();
    const user = {
        id: '1', username: 'Test', nickname: 'Hovedskovasddasdas'
    }
    const [testData, setTestData] = useState<UserDTO[]>();
    const [Pin, setPin] = useState('');
    useEffect(() => {
        setPin('69420');
        setTestData([user, user, user, user, user, user, user, user, user, user, user, user, user, user, user, user, user, user, user, user]);
    }, [])

    const savePinToClipboard = () => {
        navigator.clipboard.writeText(Pin);
    }

    return (
        <div className='Lobby_Container'>
            <div className='Lobby_NavBackground'></div>
            <div className='Lobby_Wrapper'>
                <div className='Lobby_Title'>
                    Lobby
                </div>
                <div className='Lobby_InputContainer'>
                    <div className='Lobby_PinCode' >
                        <input type="text" placeholder='Pin Code' maxLength={5} readOnly onClick={() => savePinToClipboard()} value={gameStore.lobby?.pin} />
                    </div>
                    <div className='Lobby_StartButton'> Start</div>
                </div>
                <div className='Lobby_PlayerContainer'>
                    {gameStore.lobbyPlayers.map((player) => (
                        <UserComponent user={player} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default observer(LobbyPage)