import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import colorLookupService from '../../../services/colorLookupService';
import { useStore } from '../../../stores/store';
import './tiles.scss'

const Tiles = ({ tile }: any) => {
    const { gameStore } = useStore();
    const [color, setColor] = useState('');
    useEffect(() => {
        setColor(colorLookupService.generateRandomAppropriateColor());
    }, [])

    const handleShow = () => {
        tile.shown = !tile.shown;
    }

    return (
        <div className={`Tile_Container ${tile.shown ? 'shown' : ''}`} onClick={handleShow}>
            <div className='Tile_IndicatorContainer'>
                <div className='Tile_Indicator' style={{ backgroundColor: color }}>
                    {tile.id}
                </div>
            </div>
            <div className='Tile_ActionContainer'>
                <div className={`Tile_Action ${tile.shown ? 'shown' : ''}`}>
                    {tile.action}
                </div>
                {tile.shown ?
                    <>
                        <div className='Tile_ActionTo'>
                            To whoom: {tile.to}
                        </div>
                        <div className='Tile_ActionBy'>
                            by whoom: {tile.by}
                        </div>
                    </>
                    : null}
            </div>
        </div>
    )
}

export default observer(Tiles)