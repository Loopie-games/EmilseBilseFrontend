import React from 'react'
import { useNavigate } from 'react-router-dom'
import './pageNotFound.scss'

const PageNotFound = () => {
    const navigate = useNavigate()

    /**
     * @Description redirects to the home page
     */
    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <div className='PageNotFound_Container'>
            <div className='PageNotFound_404Container'>
                <div className='PageNotFound_4_1'>4</div>
                <div className='PageNotFound_0'>0</div>
                <div className='PageNotFound_4_2'>4</div>
            </div>
            <div className='PageNotFound_Face'>( ⚆ _ ⚆ )</div>
            <div className='PageNotFound_Text'>
                Looks like you're lost!
            </div>
            <div className='PageNotFound_Back' onClick={handleHomeClick}>
                Back to Business!
            </div>

        </div>
    )
}

export default PageNotFound