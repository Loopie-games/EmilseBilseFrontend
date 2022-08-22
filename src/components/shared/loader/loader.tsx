import React from 'react'
import './loader.scss'

const Loader = () => {
    return (
        <div className='Loader'>
            <div className='facespinner'>
                <div className='facespinner__eye'></div>
            </div>
            LOADING...
        </div>
    )
}

export default Loader