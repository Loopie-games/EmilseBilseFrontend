import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { UserTile } from '../../models/tile/tileInterface'
import { useStore } from '../../stores/store';
import Icon from '../shared/icon/Icon'
import './userCreatedTile.scss'

const UserCreatedTile = (tile: UserTile) => {
    const params = useParams();
    const { userStore, tileStore, popupStore } = useStore();
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    useEffect(() => {
        setIsLoggedInUser(userStore.user?.id === params.id);

    }, [userStore, params.id])

    const deleteTile = async () => {
        try {
            await tileStore.deleteTile(tile.id);
        } catch (e: any) {
            popupStore.setErrorMessage(e.message);
            popupStore.show();
        }
    }

    return (
        <div className='UserCreatedTile_Container'>
            <div className='UserCreatedTile_TileInfoContainer'>
                <div className='UserCreatedTile_TileInfo Action'>{tile.action}</div>
                <div className='UserCreatedTile_TileInfo NickName'>Added by: {tile.addedBy}</div>
            </div>
            {isLoggedInUser ?
                <div className='UserCreatedTile_TileInfoIcon' onClick={deleteTile}><Icon name="cross" /></div>
                : null}
        </div>
    )
}

export default UserCreatedTile