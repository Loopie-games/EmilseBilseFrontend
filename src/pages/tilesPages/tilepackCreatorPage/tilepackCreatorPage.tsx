import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/shared/icon/Icon';
import Popup from '../../../components/shared/popups/popup';
import TilePackComponent from '../../../components/tilepackCreator/tilePackComponent';
import { TilePack } from '../../../models/tile/tileInterface';
import { useStore } from '../../../stores/store';
import './tilepackCreatorPage.scss'

const TilepackCreatorPage = () => {
    const {tileStore, popupStore } = useStore();
    const [search, setSearch] = useState('');
    const [tilePacks, setTilePacks] = useState <TilePack[]>([]);
    const [showPopup, setShowPopup] = useState(false)
    const navigate = useNavigate();
    const message = "Are you sure you want to delete this tilepack? This action is irreversable."

    useEffect(()=>{
        initTP()
    },[])

    const initTP = async () => {
        setTilePacks(await tileStore.getAllTilepacks())
    }

    const handleClearSearch = () => {
        setSearch('');
    }

    const handleAddTilePack = () => {
        navigate('/admin/tilepackcreator/addnew');
    }

    const handleDelete = async (id: string) => {
        await tileStore.deleteTilePack(id)
        await initTP()
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
                    <div className='TilepackCreator_NewPack' onClick={handleAddTilePack}><Icon name="plus" /></div>
                    {tilePacks.map((t: TilePack) => <TilePackComponent {...{tilePack: t, removeTp:()=>handleDelete(t.id!)}} />)}
                </div>
            </div>
        </div>
        </>
    )
}

export default TilepackCreatorPage