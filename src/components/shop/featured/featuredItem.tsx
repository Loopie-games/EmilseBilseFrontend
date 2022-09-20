import React from 'react'
import './featuredItem.scss'


const FeaturedItem = ({addToCart, item}: any) => {
  return (
    <div className='FeaturedItem_Container'>
        <div className='FeaturedItem_Wrapper'>
            <div className='FeaturedItem_Image'>
                <img src={item.image} alt="item" />
            </div>
            <div className='FeaturedItem_Name'>{item.name}</div>
            <div className='FeaturedItem_Price'>€{item.price}</div>
            <div className='FeaturedItem_Buy' onClick={() => addToCart()}>Buy</div>
        </div>
    </div>
  )
}

export default FeaturedItem