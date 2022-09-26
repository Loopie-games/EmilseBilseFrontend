import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { UserTile } from '../../../models/tile/tileInterface'
import { useStore } from '../../../stores/store'
import Icon from '../../shared/icon/Icon'
import './profileTiles.scss'

const ProfileTiles = (tile: UserTile) => {
    const { userStore, tileStore, popupStore } = useStore()

    useEffect(() => {
        console.log(tile);
    }, [tile])

    const isOwner = () => {
        return tile.user.id === userStore.user?.id || tile.addedByUser.id === userStore.user?.id;
    }

    const deleteTile = async () => {
        try {
            await tileStore.deleteTile(tile.id);
        } catch (e: any) {

            popupStore.showError("Something went wrong!",e.message);
        }
    }

    return (
        <div className='ProfileTiles_Container'>
            <div className='ProfileTiles_Wrapper'>
                <div className='ProfileTiles_TileContainer'>
                    <div className='ProfileTiles_TileAction'>
                        {tile.user.username} {tile.action}
                    </div>
                    <div className='ProfileTiles_TileBy'>
                        By: {tile.addedBy}
                    </div>
                </div>
                {isOwner() &&
                    <div className='ProfileTiles_TileIcon' onClick={() => deleteTile()}>
                        <Icon name='cross' />
                    </div>
                }
            </div>
        </div>
    )
}

export default observer(ProfileTiles)