import React from 'react'
import './membership.scss'

const Membership = ({ addToCart, membership }: any) => {

    return (
        <div className='Membership_Container'>
            <div className='Membership_Wrapper'>
                <div className='Membership_Image'><img src={membership.image} alt="" /></div>
                <div className='Membership_Name'>{membership.name}</div>
                <div className='Membership_Price'>€{membership.price} / month</div>
                <div className='Membership_Featurelist'>
                    {membership.features.map((feature: any) => (
                        <>
                            <div className='Membership_FeatureContainer'>
                                <div key={feature.id} className='Membership_FeatureTitle'>
                                    {feature.title}
                                </div>
                                <div key={feature.id} className='Membership_Feature'>
                                    {feature.description}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                {membership.id !== 0 &&
                    <div onClick={() => addToCart()} className='Membership_Buy'>buy now</div>
                }
            </div>
        </div>
    )
}

export default Membership