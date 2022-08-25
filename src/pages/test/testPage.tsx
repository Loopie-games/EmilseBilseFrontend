import React, { useEffect, useState } from 'react'
import Loader from '../../components/shared/loader/loader';
import Popup from '../../components/shared/popups/popup';
import { useStore } from '../../stores/store';
import './testPage.scss'

const TestPage = () => {
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
  }, [])

  const t = false

  const handleClose = () => {
    setShouldShow(false);
    console.log('closed');
  }
  const handleConfirm = () => {
    setShouldShow(false);
    console.log('confirmed');
  }

  const message = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo natus eos est sunt. Fugiat aperiam error recusandae perspiciatis est assumenda, officia dolor tempora sunt et? Blanditiis consequatur repellat voluptates corporis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo natus eos est sunt. Fugiat aperiam error recusandae perspiciatis est assumenda, officia dolor tempora sunt et? Blanditiis consequatur repellat voluptates corporis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Explicabo natus eos est sunt. Fugiat aperiam error recusandae perspiciatis est assumenda, officia dolor tempora sunt et? Blanditiis consequatur repellat voluptates corporis?'


  return (
    <>
      <div className='Test_Container'>
        <button onClick={() => setShouldShow(true)}>Show Popup</button>
        {shouldShow ? <Popup isConfirmation={t} title="Title" errorMessage={message} handleClose={handleClose} handleConfirm={handleConfirm} /> : null}
      </div>
    </>
  )
}

export default TestPage