import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../shared/icon/Icon'
import Popup from '../shared/popups/popup'
import './tilepackComponent.scss'

const TilepackComponent = ({handleDelete}: any , id: string) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/admin/tilepackcreator/edit/' + id)
    }

    return (
            <div className='TilepackComponent_Container'>
                <div className='TilepackComponent_Delete' onClick={handleDelete}><Icon name="cross" /></div>
                <div className='TilepackComponent_Pic'>
                    <img src="https://via.placeholder.com/150" alt="tile pack" />
                </div>
                <div className='TilepackComponent_Name'>NameNameNameNameNameName</div>
                <div className='TilepackComponent_Price'>€5.00</div>
                <div className='TilepackComponent_EditButton' onClick={handleEdit}>Edit</div>
            </div>
    )
}

export default TilepackComponent