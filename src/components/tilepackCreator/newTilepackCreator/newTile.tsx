import React, { useEffect, useState } from 'react'
import Icon from '../../shared/icon/Icon'
import './newTile.scss'

const NewTile = ({onAdd, tile, iconName}:any  )=> {
    const [action, setAction] = useState("")
    const [isEditable, setIsEditable] = useState(false)


    useEffect(() => {
        setAction(tile.action);

    }, [])

    const handleEdit = () => {
        setIsEditable(true)
        console.log('edit');
    }

    const handleSaveEdit = () => {
        setAction(action);
        setIsEditable(false)
        console.log('save edit');
    }

  return (
    <div className='NewTile_Container'>
        <div className='NewTile_Ikon' onClick={() =>onAdd()}>
            <Icon name={`${iconName}`} />
        </div>
        <div className='NewTile_InputContainer'>
            <input type="text" onChange={(e) => setAction(e.target.value)} disabled={!isEditable} placeholder="Tile action" value={action}/>
        </div>

        {/* TODO EDIT AND DELETE BASETILES  --> nok ikke smart her fordi tiles kan være i mere end en packtile/usertile og det virker farligt.
        <div className='NewTile_Ikon' onClick={!isEditable ? handleEdit : handleSaveEdit}>
            <Icon name={isEditable ? 'check' : 'edit'}/></div>
            <div className='NewTile_Ikon' onClick={() => onDelete()}>
            <Icon name="cross" />
            </div>*/}
    </div>
  )
}

export default NewTile