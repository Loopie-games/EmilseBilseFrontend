import React, { useState } from 'react'
import Icon from '../../../../components/shared/icon/Icon'
import './newTilepackCreatorPage.scss'

const NewTilepackCreatorPage = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')

    return (
        <div className='NewTilePack_Container'>
            <div className='NewTilePack_Wrapper'>
                {/* Info side / Left side */}
                <div className='NewTilePack_InfoContainer'>
                    <div className='NewTilePack_InfoImage'><Icon name="plus" /> </div>
                    <div className={`NewTilePack_InfoStateContainer ${name.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter" /></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => { }} onChange={e => setName(e.target.value)} value={name} placeholder="Pack name" />
                        </div>
                    </div>
                    <div className={`NewTilePack_InfoStateContainer ${price.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter" /></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => { }} onChange={e => setPrice(e.target.value)} value={price} placeholder="€ Price" />
                        </div>
                    </div>
                    <div className={`NewTilePack_InfoStateContainer ${discount.length > 0 ? 'active' : ''}`}>
                        <div className='NewTilePack_Icon'><Icon name="filter" /></div>
                        <div className='NewTilePack_SearchInput'>
                            <input type="text" onKeyUp={e => { }} onChange={e => setDiscount(e.target.value)} value={discount} maxLength={2} placeholder="Discount %" />
                        </div>
                    </div>
                </div>
                {/* Tilepack creator side / Right side */}
                <div className='NewTilePack_CreatorContainer'>
                    <div className='NewTilePack_CreatorWrapper'>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Available tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>
                                action container
                                <div className='NewTilePack_NewTileButton'>
                                    <Icon name="plus" />
                                </div>
                            </div>
                        </div>
                        <div className='NewTilePack_TileContainer'>
                            <div className='NewTilePack_CreatorTitle'>Selected tiles</div>
                            <div className='NewTilePack_CreatorActionContainer'>action container</div>
                        </div>
                    </div>
                    <div className='NewTilePack_CreatorButtonContainer'>
                        <div className='NewTilePack_CreatorButtonWrapper'>
                            <div className='NewTilePack_CancelButton'>Cancel</div>
                            <div className='NewTilePack_CreatorButton'>Create</div>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default NewTilepackCreatorPage