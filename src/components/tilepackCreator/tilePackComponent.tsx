import React from 'react'
import { useNavigate } from 'react-router-dom'
import { TilePack } from '../../models/tile/tileInterface'
import Icon from '../shared/icon/Icon'
import './tilepackComponent.scss'

const TilePackComponent = (tp: TpCom) => {
    const navigate = useNavigate();
    const handleEdit = () => {
        navigate('/admin/tilepackcreator/edit/' + tp.tilePack.id)
    }

    return (
            <div className='TilepackComponent_Container'>
                <div className='TilepackComponent_Delete' onClick={()=>tp.removeTp()}><Icon name="cross" /></div>
                <div className='TilepackComponent_Pic'>
                    <img src="https://via.placeholder.com/150" alt="tile pack" />
                </div>
                <div className='TilepackComponent_Name'>{tp.tilePack.name}</div>
                <div className='TilepackComponent_Price'>€{(tp.tilePack.price! / 100).toFixed(2)}</div>
                <div className='TilepackComponent_EditButton' onClick={handleEdit}>Edit</div>
            </div>
    )
}

export default TilePackComponent

export interface TpCom {
    tilePack: TilePack
    removeTp: ()=>{}
}