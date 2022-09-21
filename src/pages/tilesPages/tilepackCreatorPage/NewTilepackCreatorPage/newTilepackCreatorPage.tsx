import {useStripe} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Icon from '../../../../components/shared/icon/Icon'
import newTile, {NTcom} from '../../../../components/tilepackCreator/newTilepackCreator/newTile'
import NewTile from '../../../../components/tilepackCreator/newTilepackCreator/newTile'
import httpCommon from '../../../../http-common'
import {Tile, TilePack} from '../../../../models/tile/tileInterface'
import {useStore} from '../../../../stores/store'
import './newTilepackCreatorPage.scss'

const NewTilepackCreatorPage = () => {
    const {popupStore, tileStore} = useStore();
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [tilePack, setTilePack] = useState<TilePack>()
    const [availableTiles, setAvailableTiles] = useState<Tile[]>([])
    const [selectedTiles, setSelectedTiles] = useState<Tile[]>([])

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        initTilePack()
    }, [])

    const initTilePack = async () => {
        if (params.id !== undefined) {
            try {
                setTilePack(await tileStore.getTilePackById(params.id))
                let selected =await  tileStore.getPackTilesbyPackId(params.id)
                console.log(selected.length)
                setSelectedTiles([...selected])
                let all = await tileStore.getAll()
                let rest = all.filter(t => !selected.some(f => f.action ===t.action))
                console.log(all.length)
                console.log(rest.length)
                setAvailableTiles(prev => [...rest])

            } catch (e) {
                console.log("no tilepack with given id")
            }
        }

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
        setAvailableTiles(prev => prev.filter(t => t !== tile));
        setSelectedTiles((prev) => [...selectedTiles, tile])
        return
    }

    const removeTile = (tile: Tile, index: number) => {
        setAvailableTiles((prev) => [...availableTiles, tile])
        setSelectedTiles(prev => prev.filter(t => t !== tile));
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

    const handleCreateTilePack = async () => {
        if (name.length > 3) {
            try {
                let tp = await tileStore.createTilePack({name: name})
                navigate(tp.id!)
                console.log(tp)
            } catch (e) {
                console.log(e)
            }
        } else {
            //TODO ERROR
            console.log("Enter valid tilepackname")
        }

    }
    const handleUpdateTilePack = async () => {
        //TODO
        console.log("not implemented")
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
                            }} onChange={e => setName(e.target.value)} value={name}
                                   placeholder={tilePack?.name ?? "Pack name"}/>
                        </div>
                    </div>
                    <div className={`NewTilePack_InfoStateContainer ${price.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter"/></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => {
                            }} onChange={e => setPrice(e.target.value)} value={price} placeholder="€ Price"/>
                        </div>
                    </div>
                    {tilePack === undefined ? <button onClick={() => handleCreateTilePack()}>{"Create"}</button>
                        :
                        <button onClick={() => handleUpdateTilePack()}>{"Update"}</button>
                    }

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
                {tilePack === undefined ? "create tile pack" :
                <div className='NewTilePack_CreatorContainer'>
                    <div className='NewTilePack_CreatorWrapper'>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Available tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>
                                <div className='NewTilePack_NewTileButton' onClick={addNewTile}>
                                    <Icon name="plus"/>
                                </div>
                                {availableTiles.map((mtile: Tile, i) =>
                                    <div className='NewTile_Container'>
                                        <div className='NewTile_Ikon' onClick={() => addTile(mtile, i)}>
                                            <Icon name={"rightArrow"}/>
                                        </div>
                                        <div className='NewTile_InputContainer'>
                                            {mtile.action}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Selected tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>
                                {selectedTiles.map((mtile: Tile, i) =>
                                    <div className='NewTile_Container'>
                                        <div className='NewTile_Ikon' onClick={() => removeTile(mtile, i)}>
                                            <Icon name={"leftArrow"}/>
                                        </div>
                                        <div className='NewTile_InputContainer'>
                                            {mtile.action}
                                        </div>
                                    </div>
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
                }
            </div>
        </div>
    )
}

export default NewTilepackCreatorPage

