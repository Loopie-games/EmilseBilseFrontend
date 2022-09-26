import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { BoardTileDTO } from '../../../models/tile/tileInterface';
import colorLookupService from '../../../services/colorLookupService';
import { useStore } from '../../../stores/store';
import './player.scss'

const Player = ({ player }: any) => {
    const { gameStore } = useStore();
    const [color, setColor] = useState('');

    useEffect(() => {
        gameStore.tiles.forEach((tile: BoardTileDTO) => {
            if (tile.aboutUser.id === player.id) {
                setColor(tile.aboutUser.color!)
            }
        })
    }, [])

    return (
        <div className='Player_Container'>
            <div className='Player_IndicatorContainer'>
                <div className='Player_Indicator' style={{ backgroundColor: color }}></div>
            </div>
            <div className='Player_InfoContainer'>
                <div className='Player_InfoNickname'>
                    {player.nickname}
                </div>
                <div className='Player_InfoUsername'>
                    {player.username}
                </div>
            </div>
        </div>
    )
}

export default observer(Player)