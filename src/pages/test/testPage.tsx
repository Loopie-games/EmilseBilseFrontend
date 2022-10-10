import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react'
import Loader from '../../components/shared/loader/loader';
import Popup from '../../components/shared/popups/popup';
import { useStore } from '../../stores/store';
import './testPage.scss'

const TestPage = () => {
  const {popupStore} = useStore();

  const t = () => {
    popupStore.showInput('Test', 'Test', (e: string) => {console.log(e)}, () => {console.log('asdasd2')})
  }

  return (
    <>
      <div className='Test_Container'>
          <div onClick={t}>aaaaaaaaaaaaaa</div>
      </div>
    </>
  )
}

export default TestPage