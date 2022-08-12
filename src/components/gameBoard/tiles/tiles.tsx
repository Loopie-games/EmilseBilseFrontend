import React, { useState } from 'react'
import { useStore } from '../../../stores/store';
import './tiles.scss'

const Tiles = ({ tile }: any) => {
    const [shown, setShown] = useState(false);
    const { gameStore } = useStore();



    return (
        <div className='Tile_Container'>
            <div className='Tile_IndicatorContainer'>
                <div className='Tile_Indicator'>
                    {tile.id}
                </div>
            </div>
            <div className='Tile_ActionContainer'>
                <div className='Tile_Action'>
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

export default Tiles