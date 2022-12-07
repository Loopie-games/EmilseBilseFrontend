import React, { useEffect, useState } from 'react'
import { POPUP_STATES } from '../../../models/popup/popupInterface';
import { useStore } from '../../../stores/store';
import Icon from '../icon/Icon';
import './popup.scss'

const Popup = ({ type, title, errorMessage, handleClose, handleConfirm }: any) => {
    const [isClosing, setIsClosing] = useState(false);
    const { mobileStore } = useStore();
    const [inputValue, setInputValue] = useState('');

    const close = () => {
        setIsClosing(true);

        setTimeout(() => {
            handleClose()
            console.log('closing');

        }, 200)
    }

    const confirm = () => {
        setIsClosing(true);

        setTimeout(() => {
            if (type !== POPUP_STATES.Confirmation || type !== POPUP_STATES.Information) {
                handleConfirm(inputValue)
            } else {
                handleConfirm()
            }
        }, 200)
    }

    const autogrow = () => {
        const textarea = document.getElementById('Popup_Textarea');
        if (textarea) {
            textarea.style.height = '5px';
            textarea.style.height = textarea.scrollHeight + 'px';

        }
    }

    return (
        <>
            <div className={`${isClosing ? 'closing' : 'opening'} `}>
                <div className={`PopUp_Container ${mobileStore.isMobile ? 'PopUp_Mobile' : 'PopUp_Desktop'} ${type === POPUP_STATES.Input ? 'Popup_InputContainer' : ''}`}>
                    <div className='PopUp_CloseIconContainer' onClick={handleClose} >
                        <Icon name='cross' />
                    </div>
                    <div className='PopUp_Title'>{title}</div>
                    <div className={`PopUp_Error ${type === POPUP_STATES.Input ? 'Popup_InputBox' : ''}`}>
                        {type === POPUP_STATES.Confirmation && errorMessage}
                        {type === POPUP_STATES.Information && errorMessage}
                        {type === POPUP_STATES.Bug && <>
                            <textarea id='Popup_Textarea' placeholder={errorMessage} value={inputValue} onInput={() => autogrow()} onChange={(e) => setInputValue(e.target.value)} />
                        </>}
                        {type === POPUP_STATES.Feedback && <>
                            <textarea id='Popup_Textarea' placeholder={errorMessage} onInput={() => autogrow()} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </>}
                        {type === POPUP_STATES.Input && <>
                            <input id='Popup_Textarea' placeholder={errorMessage} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </>}

                    </div>
                    <div className='PopUp_ButtonContainer'>
                        {type === POPUP_STATES.Confirmation && <Confirmation handleClose={close} handleConfirm={confirm} />}
                        {type === POPUP_STATES.Information && <Information handleClose={close} />}
                        {type === POPUP_STATES.Bug && <BugFeedback handleClose={close} handleConfirm={confirm} />}
                        {type === POPUP_STATES.Feedback && <BugFeedback handleClose={close} handleConfirm={confirm} />}
                        {type === POPUP_STATES.Input && <Input handleClose={close} handleConfirm={confirm} />}
                    </div>
                </div>
                <div className='PopUp_CloseBackground' onClick={type === POPUP_STATES.Information ? close : () => { }}></div>
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

const BugFeedback = ({ handleClose, handleConfirm }: any) => {

    return (
        <>
            <div className='PopUp_Button close' onClick={handleClose}>
                Cancel
            </div>
            <div className='PopUp_Button confirm' onClick={handleConfirm}>
                Send
            </div>
        </>
    )
}

const Input = ({ handleClose, handleConfirm }: any) => {

    return (
        <>
            <div className='PopUp_Button close' onClick={handleClose}>
                Cancel
            </div>
            <div className='PopUp_Button confirm' onClick={handleConfirm}>
                Add
            </div>
        </>
    )
}