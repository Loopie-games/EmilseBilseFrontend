import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import './tiles.scss'

const Tiles = (boardTileDTO: BoardTileDTO) => {
    const [color, setColor] = useState('');
    const [isShown, setIsShown] = useState(false)
    useEffect(() => {
        //setColor(boardTileDTO.aboutUser.color!)
    }, [])

    const handleShow = () => {
        setIsShown(!isShown)
    }

    return (
        <div className={`Tile_Container ${isShown ? 'tileShown' : ''}`} onClick={handleShow}>
            <div className='Tile_IndicatorContainer'>
                <div className='Tile_Indicator' style={{ backgroundColor: color }}>
                    {boardTileDTO.position + 1}
                </div>
            </div>
        </div>
    )

    /*
    <div className='Tile_ActionContainer'>
                <div className={`Tile_Action ${isShown ? 'tileActionShown' : ''}`}>
                    {boardTileDTO.aboutUser.nickname ?? ''} {boardTileDTO.byTile.tile.action}
                </div>
                {isShown ?
                    <>
                        <div className='Tile_ActionTo'>
                            by: {boardTileDTO.byTile.id}
                        </div>
                    </>
                    : null}
            </div>
     */
}

export default observer(Tiles)