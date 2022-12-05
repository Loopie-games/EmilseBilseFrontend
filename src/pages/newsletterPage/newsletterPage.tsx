import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '../../components/shared/icon/Icon'
import Loader from '../../components/shared/loader/loader'
import { useStore } from '../../stores/store'
import './newsletterPage.scss'

const NewsletterPage = () => {
  const { popupStore } = useStore();
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem('newsletter') !== null) {
      setShowSuccess(true);
    }
    setLoading(false);


    return () => {
      setEmail('')
      setShowSuccess(false)
    }
  }, [])


  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return re.test(String(email).toLowerCase())
  }

  const onSignupNewsletter = () => {
    if (!validateEmail(email)) {
      popupStore.showError("An error occured!", "Please enter a valid email address and try again.", () => { })
      return;
    }

    setShowSuccess(true);
    localStorage.setItem('newsletter', 'true');
  }

  const onBack = () => {
    navigate("/")
  }




  return (
    <>

      <div className='Newsletter_Container'>
        {loading ? <Loader /> :
          <div className='Newsletter_Wrapper'>
            <div className='Newsletter_ComponentContainer'>
              <div className='Newsletter_ComponentWrapper'>
                {!showSuccess ?
                  <>
                    <div className='Newsletter_ComponentTitle'>Sign up to our newsletter!</div>
                    <div className='Newsletter_ComponentContent'>For all of your loopie needs, we recommend you to join our newsletter. It’s completely free, and you’ll be able to get notified about new updates, goodies and what ever we’re working on next.</div>

                    <div className='Newsletter_InputContainer'>
                      <div className={`Newsletter_InputWrapper ${email.length > 0 ? 'active' : ''}`}>
                        <div className='Newsletter_InputIcon'><Icon name="mail" /></div>
                        <input className='Newsletter_InputField' type="text" placeholder='Email address' value={email} onChange={(e) => setEmail(e.target.value)} />
                        {email.length > 0 &&
                          <div className='Newsletter_InputIcon' onClick={() => setEmail('')}><Icon name="cross" /></div>
                        }
                      </div>
                    </div>
                    <div className='Newsletter_SignupContainer'>
                      <div className='Newsletter_SignupWrapper' onClick={onSignupNewsletter}>
                        Sign me up!
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div className='Newsletter_ComponentTitle'>Thank you!</div>
                    <div>
                      <svg id='Newsletter_SuccessIcon' xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none">
                        <path d="M43.333 67.7084L59.583 83.9584L86.6663 51.4584" stroke="black" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M64.9997 119.167C94.9151 119.167 119.166 94.9155 119.166 65C119.166 35.0846 94.9151 10.8334 64.9997 10.8334C35.0843 10.8334 10.833 35.0846 10.833 65C10.833 94.9155 35.0843 119.167 64.9997 119.167Z" stroke="black" stroke-width="6" />
                      </svg>
                    </div>
                    <div className='Newsletter_ComponentContent Newsletter_Success'>We hope we don’t dissapoint!
                      <br /><br />
                      Remember, you can always unsubscribe at anytime. </div>
                    <div className='Newsletter_SignupContainerSuccess'>
                      <div className='Newsletter_SignupWrapperSuccess' onClick={onBack}>
                        Back
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default observer(NewsletterPage)