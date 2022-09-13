import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/shared/icon/Icon';
import Popup from '../../../components/shared/popups/popup';
import TilepackComponent from '../../../components/tilepackCreator/tilepackComponent';
import './tilepackCreatorPage.scss'

const TilepackCreatorPage = () => {
    const [search, setSearch] = useState('');
    const [showPopup, setShowPopup] = useState(false)
    const navigate = useNavigate();    
    const message = "Are you sure you want to delete this tilepack? This action is irreversable."

    const handleClearSearch = () => {
        setSearch('');
    }

    const handleAddTilePack = () => {
        console.log('add tile pack');
        navigate('/admin/tilepackcreator/addnew');
    }

    const handleDelete = () => {
        setShowPopup(true)
    }
    const handleClosePopup = () => {
        setShowPopup(false)
    }
    const handleConfirmPopup = () => {
        setShowPopup(false)
    }
    

    return (
        <>
        {showPopup ? <Popup isConfirmation={true} title="Are you sure?" errorMessage={message} handleClose={handleClosePopup} handleConfirm={handleConfirmPopup} /> : null}
          
        <div className='TilepackCreator_Container'>
            <div className='TilepackCreator_Wrapper'>
                <div className='TilepackCreator_Title'>Tile Pack Creator</div>
                <div className='TilepackCreator_Search'>
                    <div className={`TilepackCreator_SearchContainer ${search.length > 0 ? 'active' : ''}`}>
                        <div className='TilepackCreator_SearchIcon'><Icon name="filter" /></div>
                        <div className='TilepackCreator_SearchInput'>
                            <input type="text" onKeyUp={e => { }} onChange={e => setSearch(e.target.value)} value={search} placeholder="Filter Tile packs" />
                        </div>
                        {search.length > 0 ? <div className='TilepackCreator_SearchIcon' onClick={handleClearSearch}><Icon name="cross" /></div> : null}
                    </div>
                </div>
                <div className='TilepackCreator_PackContainer'>
                    <TilepackComponent handleDelete={handleDelete} />
                    <div className='TilepackCreator_NewPack' onClick={handleAddTilePack}><Icon name="plus" /></div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TilepackCreatorPage