import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Friend } from '../../../models/friendship/friendInterface';
import { TileNewFromUser } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import Icon from '../../shared/icon/Icon';
import Loader from '../../shared/loader/loader';
import './friends.scss'

const Friends = (friend: Friend) => {
    const [addShown, setAddShown] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [action, setAction] = useState('');
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const { tileStore, popupStore, userStore } = useStore();
    const navigate = useNavigate();
    const [loaded, setLoaded] = useState(false);

    const handleAddClick = () => {
        try {
            const data: TileNewFromUser = { action: action, aboutUserId: friend.user.id! }
            tileStore.createNewTile_User(data);
            setAddShown(false);
        } catch (error: any) {
            popupStore.setErrorMessage('Error ' + error.message);
            popupStore.show();
        }
    }
    const handleExpand = async () => {
        setExpanded(!expanded);
        if (expanded === true) {
            console.log("asdasdasdsad")
            await tileStore.getTilesCreatedByUser(friend.user.id!, userStore.user!.id!);
            if (tileStore.tilesAboutUserCreatedByYou?.length !== undefined && tileStore.tilesAboutUserCreatedByYou.length > 0) {
                setLoaded(true);
            }
        }
    }

    const getHeight = () => {
        if (expanded && addShown) {
            return '350px';
        }

        if (expanded && !addShown) {
            return '250px';
        }

        if (!expanded && addShown) {
            return '150px';
        }

        return '60px';
    }

    const goToProfile = () => {
        popupStore.showConfirmation('Are you sure?','Do you want to go to ' + friend.user.username + '\'s profile?', () => navigate('/user/profile/' + friend.user.id), () => {});
        
    }

    return (
        <div className='Friends-Container' style={{ "height": getHeight() }}>
            <div className='Friends-Wrapper'>
                <div className='Friends-ChevronContainer' onClick={handleExpand} style={{ 'animation': expanded ? 'openChevron 0.2s forwards ease-in' : 'closeChevron 0.2s forwards ease-out' }}><Icon name="dropdown-arrow" /></div>
                <div className='Friends-ProfilePicContainer' onClick={() => goToProfile()}><img className='LoggedInUser-UserProfilePic' src={defaultPic} /></div>
                <div className='Friends-UserInfoContainer'>
                    <div className='Friends-UserInfoNickname'>{friend.user.nickname}</div>
                    <div className='Friends-UserInfoUsername'>{friend.user.username}</div>
                </div>
                <div className='Friends-IconContainer' onClick={() => setAddShown(!addShown)} style={{ 'animation': addShown ? 'openAdd 0.2s forwards ease-in' : 'closeAdd 0.2s forwards ease-out' }}> <Icon name="add-circle" /> </div>
                <div className='Friends-IconContainer'> <Icon name="cross-blue" /> </div>
            </div>
            {addShown ?
                <div className='Friends-AddTileContainer ' >
                    <div className='Friends-AddTileTitle'>Add title</div>
                    <div className='Friends-AddTileInputContainer'>
                        <div className='Friends-AddTileInput'>
                            <input type="text" onChange={(e) => setAction(e.target.value)} />
                        </div>
                        <div className='Friends-AddTileButton' onClick={handleAddClick}>Add</div>
                    </div>
                </div>
                : null}
            {expanded ?
                <div className='Friends-TilesMadeContainer' >
                    {loaded ?
                        <>
                            <div className='Friends-TilesMadeTitle'>Tiles Made By You</div>
                            <div className='Friends-TilesMadeGrid'>
                                {tileStore.tilesAboutUserCreatedByYou!.map((tile) => (
                                    <div className='Friends-TilesMadeTile'>
                                        <div className='Friends-TilesMadeAction'>{tile.action}</div>
                                        <div className='Friends-TilesMadeDelete'><Icon name='cross-blue' /></div>
                                    </div>
                                ))}
                            </div>
                            <div className='Friends-TilesMadeShowAll'>Show all</div>
                        </>
                        : <Loader />
                    }
                </div>
                : null}
        </div >
    )
}

export default Friends