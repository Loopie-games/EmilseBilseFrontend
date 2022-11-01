import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import './shopPage.scss'
import shopBlur from '../../assets/Shared/shopBlur.svg'
import Icon from '../../components/shared/icon/Icon'
import FeaturedItem from '../../components/shop/featured/featuredItem'
import { useStore } from '../../stores/store'
import Membership from '../../components/shop/membership/membership'

const ShopPage = () => {
    const { popupStore } = useStore()
    const [testItems, setTestItems] = useState([
        {
            id: 1,
            name: 'test1',
            price: 100,
            image: 'https://picsum.photos/200/300',
        },
        {
            id: 2,
            name: 'test2',
            price: 200,
            image: 'https://picsum.photos/200/300',
        },
        {
            id: 3,
            name: 'test3',
            price: 300,
            image: 'https://picsum.photos/200/300',
        },
    ])
    const [testMemberships, setTestMemberships] = useState([
        {
            id: 0,
            name: 'free',
            price: 0,
            image: 'https://picsum.photos/200/300',
            features: [
                {
                    id: 1,
                    title: 'feature1',
                    description: 'test1',
                },
                {
                    id: 2,
                    title: 'feature1',
                    description: 'test2',
                },
                {
                    id: 3,
                    title: 'feature1',
                    description: 'test3',
                },
            ],
        },
        {
            id: 1,
            name: 'test1',
            price: 100,
            image: 'https://picsum.photos/200/300',
            features: [
                {
                    id: 1,
                    title: 'feature1',
                    description: 'test1',
                },
                {
                    id: 2,
                    title: 'feature1',
                    description: 'test2',
                },
                {
                    id: 3,
                    title: 'feature1',
                    description: 'test3',
                },
                {
                    id: 4,
                    title: 'feature1',
                    description: 'test3',
                },
                {
                    id: 5,
                    title: 'feature1',
                    description: 'test3',
                },
                {
                    id: 6,
                    title: 'feature1',
                    description: 'test3',
                },
            ],
        },
        {
            id: 2,
            name: 'test2',
            price: 200,
            image: 'https://picsum.photos/200/300',
            features: [
                {
                    id: 1,
                    title: 'feature1',
                    description: 'test1',
                },
                {
                    id: 2,
                    title: 'feature1',
                    description: 'test2',
                },
                {
                    id: 3,
                    title: 'feature1',
                    description: 'test3',
                },
            ],
        },
    ])

    const [cartItems, setCartItems] = useState<any[]>([])
    const [cartTotal, setCartTotal] = useState(0)
    const [cartOpen, setCartOpen] = useState(false)


    useEffect(() => {
        return () => {
            setCartItems([])
            setCartTotal(0)
            setCartOpen(false)
        }
    }, [])


    const addToCart = (item: any) => {
        if (!cartItems.find((cartItem) => cartItem.id === item.id)) {
            setCartItems([...cartItems, item])
            setCartTotal(cartTotal + item.price)
        } else {
            popupStore.showError('Error!', 'Item already in cart')
        }

    }

    const handleClickLeft = () => {

        const firstItem = testItems[0]
        const newItems = testItems.slice(1, testItems.length)
        setTestItems([...newItems, firstItem])
    }

    const handleClickRight = () => {

        const lastItem = testItems[testItems.length - 1]
        const newItems = testItems.slice(0, testItems.length - 1)
        setTestItems([lastItem, ...newItems])
    }

    const removeFromCart = (item: any) => {
        const newCartItems = cartItems.filter(cartItem => cartItem.id !== item.id)
        setCartItems(newCartItems)
        setCartTotal(cartTotal - item.price)
    }

    return (
        <>
            <div className='Shop_Cart_OverlayContainer'>
                <div className='Shop_CartContainer'>
                    <div className='Shop_CartIcon' onClick={() => setCartOpen(!cartOpen)}>
                        <Icon name='shop' />
                        {cartItems.length > 0 && <div className='Shop_CartIcon_Count'>{cartItems.length}</div>}
                    </div>
                    <div className={`Shop_Cart ${cartOpen ? 'CartShown' : ''}`}>

                        <div className='Shop_CartItems'>
                            {cartItems.length <= 0 && <div className='Shop_CartItems_Empty'>Your cart is empty</div>}
                            {cartItems.map((item: any) => (
                                <div key={item.id} className='Shop_CartItemContainer'>
                                    <div className='Shop_CartItemInfo'>{item.name} - €{item.price}</div>
                                    <div onClick={() => removeFromCart(item)} className='Shop_CartRemoveIcon'><Icon name='cross' /></div>
                                </div>
                            ))}
                        </div>
                        <div className='Shop_CartTotal'>
                            <div className='Shop_CartTotalText'>Total:</div>
                            <div className='Shop_CartTotalPrice'>
                                €{cartTotal}
                            </div>
                        </div>
                        <div className='Shop_Checkout'>To Checkout</div>
                    </div>

                </div>
            </div>
            {cartOpen &&
                <div className='Shop_CartItems_Close' onClick={() => setCartOpen(false)}>
                </div>
            }
            <div className='Shop_Container'>
                <div className='Shop_Wrapper'>

                    <img id='shopBlur' src={shopBlur} alt="" />

                    <section className='Shop_FeaturedContainer'>
                        <div className='Shop_FeaturedTitle'>Featured</div>
                        <div className='Shop_FeaturedContentContainer'>
                            <div className='Shop_DisplayContainer'>
                                <div className='Shop_ButtonContainer' onClick={handleClickLeft}>
                                    <Icon name="dropdown-arrow" />
                                </div>
                                {testItems.map((item) => (
                                    <div className='Shop_ItemContainer'>
                                        <FeaturedItem addToCart={() => addToCart(item)} item={item} />
                                    </div>
                                ))}
                                <div className='Shop_ButtonContainer' onClick={handleClickRight}>
                                    <Icon name="dropdown-arrow" />
                                </div>
                            </div>
                            <div className='Shop_IndicatorContainer'>
                                {testItems.map((item) => (
                                    <div className={`Shop_Indicator ${item.id === 2 ? 'Shop_IndicatorActive' : 'Shop_IndicatorInactive'}`}></div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section className='Shop_MembershipContainer'>
                        <div className='Shop_MembershipTitle'>Pro Memberships</div>
                        <div className='Shop_MembershipContentContainer'>
                            {testMemberships.map((item) => (
                                <Membership addToCart={() => addToCart(item)} membership={item} />
                            ))} 
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default observer(ShopPage)

