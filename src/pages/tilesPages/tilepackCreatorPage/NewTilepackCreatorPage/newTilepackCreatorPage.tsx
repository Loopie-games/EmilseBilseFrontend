import {useStripe} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Icon from '../../../../components/shared/icon/Icon'
import newTile, { NTcom } from '../../../../components/tilepackCreator/newTilepackCreator/newTile'
import NewTile from '../../../../components/tilepackCreator/newTilepackCreator/newTile'
import httpCommon from '../../../../http-common'
import {Tile} from '../../../../models/tile/tileInterface'
import {useStore} from '../../../../stores/store'
import './newTilepackCreatorPage.scss'

const NewTilepackCreatorPage = () => {
    const {popupStore, tileStore} = useStore();
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [availableTiles, setAvailableTiles] = useState<Tile[]>([])
    const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])

    const navigate = useNavigate();


    useEffect(()=>{
        initTiles()
    }, [])


    const initTiles = async () => {
        setAvailableTiles(await tileStore.getAll())
    }

    const handleCancel = () => {
        setName('')
        setPrice('')
        setDiscount('')
        navigate('/admin/tilepackcreator')
    }

    const handleCreate = async () => {
        console.log(name);
        console.log(selectedTiles);
    }

    const addTile = (tile: Tile, index: number) => {
        if (tile.action.length > 0) {
            setSelectedTiles([...selectedTiles, tile])
            setAvailableTiles((prev)=>prev.filter(t=> t.id !== tile.id));
        } else {
            popupStore.showError('Error', 'Please enter a valid action')
        }
        return
    }

    const removeTile = (tile: Tile, index:number) => {
        availableTiles.push(tile)
        setAvailableTiles(availableTiles)
        console.log("i: "+index)
        delete selectedTiles[index]
        console.log(selectedTiles.length)
        setSelectedTiles(selectedTiles)
        console.log(selectedTiles.length)
        return
    }

    const addNewTile = () => {
        setAvailableTiles([...availableTiles, {
            id: (availableTiles.length + selectedTiles.length + 1).toString(),
            action: ''
        }])
    }

    const handleEditTileAction = (tile: Tile, action: string) => {
        tile.action = action
    }


    return (
        <div className='NewTilePack_Container'>
            <div className='NewTilePack_Wrapper'>
                {/* Info side / Left side */}
                <div className='NewTilePack_InfoContainer'>
                    <div className='NewTilePack_InfoImage'><Icon name="plus"/></div>
                    <div className={`NewTilePack_InfoStateContainer ${name.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter"/></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => {
                            }} onChange={e => setName(e.target.value)} value={name} placeholder="Pack name"/>
                        </div>
                    </div>
                    <div className={`NewTilePack_InfoStateContainer ${price.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter"/></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => {
                            }} onChange={e => setPrice(e.target.value)} value={price} placeholder="€ Price"/>
                        </div>
                    </div>
                    {/* TODO DISCOUNT

                    <div className={`NewTilePack_InfoStateContainer ${discount.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter" /></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => { }} onChange={e => setDiscount(e.target.value)} value={discount} maxLength={2} placeholder="Discount %" />
                        </div>
                    </div>
                    */}
                </div>
                {/* Tilepack creator side / Right side */}
                <div className='NewTilePack_CreatorContainer'>
                    <div className='NewTilePack_CreatorWrapper'>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Available tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>
                                <div className='NewTilePack_NewTileButton' onClick={addNewTile}>
                                    <Icon name="plus"/>
                                </div>
                                {availableTiles.map((mtile: Tile, i) =>
                                        <NewTile {...{tile: mtile, callBack: ()=> {
                                                addTile(mtile, i)
                                            }, icon:"rightArrow"}}/>
                                    )}
                            </div>
                        </div>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Selected tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>
                                {selectedTiles.map((mtile: Tile, i) =>
                                    <NewTile {...{tile: mtile, callBack: ()=> {
                                            removeTile(mtile, i)
                                        }, icon:"leftArrow"}}/>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='NewTilePack_CreatorButtonContainer'>
                        <div className='NewTilePack_CreatorButtonWrapper'>
                            <div className='NewTilePack_CancelButton' onClick={handleCancel}>Cancel</div>
                            <div className='NewTilePack_CreatorButton' onClick={handleCreate}>Create</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewTilepackCreatorPage