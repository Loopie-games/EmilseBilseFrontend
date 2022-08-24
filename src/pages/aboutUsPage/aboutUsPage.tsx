import React from 'react'
import aboutus1 from '../../assets/aboutUs/aboutus1.svg'
import aboutus2 from '../../assets/aboutUs/aboutus2.svg'
import './aboutUsPage.scss'
const AboutUsPage = () => {
    return (
        <div className='AboutUs_Container'>
            <img src={aboutus1} alt="bagground1" />
            <div>
                <div>Title</div>
                <div>Tekst</div>
            </div>
            <img src={aboutus2} alt="" />
        </div>
    )
}

export default AboutUsPage