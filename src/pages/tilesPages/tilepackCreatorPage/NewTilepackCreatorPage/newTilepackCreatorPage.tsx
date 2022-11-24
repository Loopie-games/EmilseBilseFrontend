import React, {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Icon from '../../../../components/shared/icon/Icon'
import {idkTile, TilePack} from '../../../../models/tile/tileInterface'
import {useStore} from '../../../../stores/store'
import './newTilepackCreatorPage.scss'


const NewTilepackCreatorPage = () => {
    const {tileStore} = useStore();
    const [name, setName] = useState('')
    const [price, setPrice] = useState<number>(0)
    const [discount, setDiscount] = useState('')
    const [tilePack, setTilePack] = useState<TilePack>()
    const [availableTiles, setAvailableTiles] = useState<idkTile[]>([])
    const [selectedTiles, setSelectedTiles] = useState<idkTile[]>([])

    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        initTilePack()
    }, [])

    useEffect(() => {
        initTilePack()

    }, [params.id])


    const initTilePack = async () => {
        if (params.id !== undefined) {
            try {
                let tp = await tileStore.getTilePackById(params.id)
                setTilePack(tp)
                if (tp.name !== undefined) {
                    setName(tp.name)
                }
                let selected = await tileStore.getPackTilesbyPackId(params.id)
                setSelectedTiles([...selected.map(pt => pt.tile)])
                let all = await tileStore.getAll()
                setAvailableTiles(() => [...all.filter((t: { action: any }) => !selected.some((f) => f.tile.action === t.action))])
            } catch (e) {
                console.log("no tilepack with given id")
            }
        }

    }

    const handleCancel = () => {
        setName('')
        setPrice(0)
        setDiscount('')
        navigate('/admin/tilepackcreator')
    }

    const handleSave = async () => {
        if (tilePack?.id) {
            tilePack.price = price*100;
            await tileStore.updateTilePack(tilePack)
            await tileStore.clearPack(tilePack.id)
            for (const st of selectedTiles) {
                await tileStore.addToTilePack({tileId: st.id, packId: tilePack.id});
            }
            navigate("/admin/tilepackcreator")
        }
    }

    const addTile = (tile: idkTile) => {
        setAvailableTiles(prev => prev.filter(t => t !== tile));
        setSelectedTiles(() => [...selectedTiles, tile])
        return
    }

    const removeTile = (tile: idkTile) => {
        setAvailableTiles(() => [...availableTiles, tile])
        setSelectedTiles(prev => prev.filter(t => t !== tile));
        return
    }

    const addNewTile = () => {
        setAvailableTiles([...availableTiles, {
            id: (availableTiles.length + selectedTiles.length + 1).toString(),
            action: ''
        }])
    }
    const handleCreateTilePack = async () => {
        if (name.length > 3) {
            try {
                let tp = await tileStore.createTilePack({name: name, price: price})
                navigate("/admin/tilepackcreator/edit/" + tp.id!)
                return
            } catch (e) {
                console.log(e)
            }
        } else {
            //TODO ERROR
            console.log("Enter valid tilepackname")
        }

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
                            <input type="text" onKeyUp={() => {
                            }} onChange={e => setName(e.target.value)} value={name}
                                   placeholder={name ?? "Pack name"}/>
                        </div>
                    </div>
                    <div className={`NewTilePack_InfoStateContainer ${price > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter"/></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="number" onKeyUp={() => {
                            }} onChange={e => setPrice(e.target.valueAsNumber)} value={price} placeholder="€ Price"/>
                        </div>
                    </div>
                    {tilePack === undefined ? <button onClick={() => handleCreateTilePack()}>{"Create"}</button>
                        : <></>

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
                                    {availableTiles.sort(function (a, b) {
                                        if (a.action.toLowerCase() < b.action.toLowerCase()) {
                                            return -1;
                                        }
                                        if (a.action.toLowerCase() > b.action.toLowerCase()) {
                                            return 1;
                                        }
                                        return 0;
                                    }).map((tile: idkTile) =>
                                        <div className='NewTile_Container'>
                                            <div className='NewTile_Ikon' onClick={() => addTile(tile)}>
                                                <Icon name={"rightArrow"}/>
                                            </div>
                                            <div className='NewTile_InputContainer'>
                                                {tile.action}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='NewTilePack_TileContainer'>
                                <div className='NewTilePack_CreatorTitle'>Selected tiles</div>
                                <div className='NewTilePack_CreatorActionContainer'>
                                    {selectedTiles.sort(function (a, b) {
                                        if (a.action.toLowerCase()< b.action.toLowerCase()) {
                                            return -1;
                                        }
                                        if (a.action.toLowerCase() > b.action.toLowerCase()) {
                                            return 1;
                                        }
                                        return 0;
                                    }).map((mtile: idkTile) =>
                                        <div className='NewTile_Container'>
                                            <div className='NewTile_Ikon' onClick={() => removeTile(mtile)}>
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
                                <div className='NewTilePack_CreatorButton' onClick={handleSave}>Save</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default NewTilepackCreatorPage

