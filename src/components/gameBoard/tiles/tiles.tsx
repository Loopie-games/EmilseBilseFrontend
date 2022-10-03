import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import './tiles.scss'

const Tiles = (boardTileDTO: BoardTileDTO) => {
    const [color, setColor] = useState('');
    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        setColor(boardTileDTO.aboutUser.color!)
    }, [])

    /**
     * @Description toggles the tilelist shown state
     */
    const handleShow = () => {
        setIsShown(!isShown)
    }

    return (
        <div className={`Tile_Container ${isShown ? 'tileShown' : ''}`} onClick={handleShow}>
            <div className='Tile_IndicatorContainer'>
                <div className='Tile_Indicator' style={{ backgroundColor: color }}>
                    {boardTileDTO.position}
                </div>
            </div>
            <div className='Tile_ActionContainer'>
                <div className={`Tile_Action ${isShown ? 'tileActionShown' : ''}`}>
                    {boardTileDTO.aboutUser.nickname} {boardTileDTO.byTile.tile.action}
                </div>
                {isShown ?
                    <>
                        <div className='Tile_ActionTo'>
                            by: {boardTileDTO.byTile.id}
                        </div>
                    </>
                    : null}
            </div>
        </div>
    )
}

export default observer(Tiles)