import React, { useState } from 'react'
import Icon from '../../shared/icon/Icon'
import './newTile.scss'

const NewTile = (tile: any) => {
    const [action, setAction] = useState(tile.action)
    const [isEditable, setIsEditable] = useState(false)

    const handleEdit = () => {
        setIsEditable(true)
        console.log('edit');
        
    }

    const handleSaveEdit = () => {
        setIsEditable(false)
        console.log('save edit');
        
    }

    const handleDelete = () => {
        console.log('delete');
    }

    const editTileAction = (action: string) => {
        tile.action = action
    }

  return (
    <div className='NewTile_Container'>
        <div className='NewTile_Ikon'>
            <Icon name="move" />
        </div>
        <div className='NewTile_InputContainer'>
            <input type="text" onChange={(e) => editTileAction(e.target.value)} disabled={!isEditable} placeholder="Tile action"/>
        </div>
        <div className='NewTile_Ikon' onClick={!isEditable ? handleEdit : handleSaveEdit}>
            <Icon name={isEditable ?  'check': 'edit'} /></div>
        <div className='NewTile_Ikon'>
            <Icon name="cross" />
        </div>
    </div>
  )
}

export default NewTile