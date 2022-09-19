import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TilePack } from '../../models/tile/tileInterface'
import Icon from '../shared/icon/Icon'
import Popup from '../shared/popups/popup'
import './tilepackComponent.scss'

const TilepackComponent = (tp: TilePack) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/admin/tilepackcreator/edit/' + tp.id)
    }
    const handleDelete = () =>{
        console.log("handle delete")
    }

    return (
            <div className='TilepackComponent_Container'>
                <div className='TilepackComponent_Delete' onClick={handleDelete}><Icon name="cross" /></div>
                <div className='TilepackComponent_Pic'>
                    <img src="https://via.placeholder.com/150" alt="tile pack" />
                </div>
                <div className='TilepackComponent_Name'>{tp.name}</div>
                <div className='TilepackComponent_Price'>€{(tp.price / 100).toFixed(2)}</div>
                <div className='TilepackComponent_EditButton' onClick={handleEdit}>Edit</div>
            </div>
    )
}

export default TilepackComponent