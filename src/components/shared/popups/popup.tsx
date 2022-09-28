import React, { useEffect, useState } from 'react'
import { useStore } from '../../../stores/store';
import './popup.scss'

export enum  POPUP_STATES {
    winClaim,
    ConfirmWin,
}
const Popup = ({ isConfirmation, title, errorMessage, handleClose, handleConfirm }: any) => {
    const [isClosing, setIsClosing] = useState(false);
    const {mobileStore} = useStore();

    const close = () => {
        setIsClosing(true);

        setTimeout(() => {
            handleClose()
        }, 200)
    }

    const confirm = () => {
        setIsClosing(true);

        setTimeout(() => {
            handleConfirm()
        }, 200)
    }




    return (
        <>
            <div className={`${isClosing ? 'closing' : 'opening'}`}>
                <div className={`PopUp_Container ${mobileStore.isMobile ? 'PopUp_Mobile' : 'PopUp_Desktop'}`}>
                    <div className='PopUp_Title'>{title}</div>
                    <div className='PopUp_Error'>{errorMessage}</div>
                    <div className='PopUp_ButtonContainer'>
                        {isConfirmation ?
                            <Confirmation handleClose={close} handleConfirm={confirm} /> :
                            <Information handleClose={close} />
                        }
                    </div>
                </div>
                <div className='PopUp_CloseBackground' onClick={!isConfirmation ? close : () => {} }></div>
            </div>
        </>

    )
}

export default Popup

const Information = ({ handleClose }: any) => {

    return (
        <>
            <div className='PopUp_Button' onClick={handleClose}>
                Okay
            </div>
        </>
    )
}

const Confirmation = ({ handleClose, handleConfirm }: any) => {

    return (
        <>
            <div className='PopUp_Button close' onClick={handleClose}>
                No
            </div>
            <div className='PopUp_Button confirm' onClick={handleConfirm}>
                Yes
            </div>
        </>
    )
}