import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { TileForUser } from '../../models/tile/tileInterface'
import { useStore } from '../../stores/store';
import Icon from '../shared/icon/Icon'
import './userCreatedTile.scss'

const UserCreatedTile = (tile: TileForUser) => {
    const params = useParams();
    const { userStore, tileStore } = useStore();
    const [isLoggedInUser, setIsLoggedInUser] = useState(false);

    useEffect(() => {
        setIsLoggedInUser(userStore.user?.id === params.id);

    }, [userStore, params.id])

    const deleteTile = async () => {
        await tileStore.deleteTile(tile.id);
    }

    return (
        <div className='Tile_Container'>
            <div className='Tile_TileInfoContainer'>
                <div className='Tile_TileInfo Action'>{tile.action}</div>
                <div className='Tile_TileInfo NickName'>Added by: {tile.addedByNickname}</div>
            </div>
            {isLoggedInUser ?
                <div className='Tile_TileInfoIcon' onClick={deleteTile}><Icon name="cross" /></div>
                : null}
        </div>
    )
}

export default UserCreatedTile