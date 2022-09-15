import { useEffect } from 'react';
import { pendingPlayerDto } from '../../../models/player/playerInterface';
import { SimpleUserDTO } from '../../../models/user/userInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon'
import './userComponent.scss'

const UserComponent = (player: pendingPlayerDto) => {

    const kickPlayer = () => {
        //TODO
    }

    useEffect(() => {

    }, [])

    return (
        <div className='UserComponent-Container'>
            <div className='UserComponent-ImageContainer'>
                {player.isHost ?
                    <div className='crown'><Icon name='crown' /></div> : null}
                <img src={player.user.profilePicUrl !== "" && player.user.profilePicUrl !== undefined ? player.user.profilePicUrl : 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="PB" />
            </div>
            <div className='UserComponent-KickContainer' onClick={() => kickPlayer()}><Icon name="cross" /></div>
            <div className='UserComponent-UserDetails'>
                <div className='UserComponent-UserNickName'>
                    {player.user.nickname}
                </div>
                <div className='UserComponent-UserUsername'>
                    {player.user.username}
                </div>
            </div>
        </div>
    )
}

export default UserComponent