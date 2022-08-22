import { useEffect } from 'react';
import { pendingPlayerDto } from '../../../models/player/playerInterface';
import { SimpleUserDTO } from '../../../models/user/userInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon'
import './userComponent.scss'

const UserComponent = (user: pendingPlayerDto) => {

    const { gameStore } = useStore();

    const kickPlayer = () => {
        gameStore.kickPlayer(user.id);
    }

    const isHost = () => {
        return gameStore.lobby?.host === user.player.id;
    }

    useEffect(() => {
    }, [])

    return (
        <div className='UserComponent-Container'>
            <div className='UserComponent-ImageContainer'>
                {isHost() ?
                    <div className='crown'><Icon name='crown' /></div> : null}
                <img src={user.player.profilePicUrl !== "" && user.player.profilePicUrl !== undefined ? user.player.profilePicUrl : 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="PB" />
            </div>
            <div className='UserComponent-KickContainer' onClick={() => kickPlayer()}><Icon name="cross" /></div>
            <div className='UserComponent-UserDetails'>
                <div className='UserComponent-UserNickName'>
                    {user.player.nickname}
                </div>
                <div className='UserComponent-UserUsername'>
                    {user.player.username}
                </div>
            </div>
        </div>
    )
}

export default UserComponent