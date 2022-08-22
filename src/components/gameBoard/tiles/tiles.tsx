import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import colorLookupService from '../../../services/colorLookupService';
import { useStore } from '../../../stores/store';
import './tiles.scss'

const Tiles = (tile: BoardTileDTO) => {
    const { gameStore } = useStore();
    const [color, setColor] = useState('');
    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        setColor(colorLookupService.generateRandomAppropriateColor());
    }, [])

    const handleShow = () => {
        setIsShown(!isShown)
    }

    return (
        <div className={`Tile_Container ${isShown ? 'tileShown' : ''}`} onClick={handleShow}>
            <div className='Tile_IndicatorContainer'>
                <div className='Tile_Indicator' style={{ backgroundColor: color }}>
                    {tile.position}
                </div>
            </div>
            <div className='Tile_ActionContainer'>
                <div className={`Tile_Action ${isShown ? 'tileActionShown' : ''}`}>
                    {tile.tile.user.nickname} {tile.tile.action}
                </div>
                {isShown ?
                    <>
                        <div className='Tile_ActionTo'>
                            To whoom: {tile.tile.user.username}
                        </div>
                        <div className='Tile_ActionBy'>
                            by whoom: {tile.tile.addedBy.nickname}
                        </div>
                    </>
                    : null}
            </div>
        </div>
    )
}

export default observer(Tiles)