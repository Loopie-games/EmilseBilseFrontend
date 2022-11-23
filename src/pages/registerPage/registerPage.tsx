import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/store';
import { CreateUserDTO } from "../../models/user/userInterface";
import securityService from "../../services/securityService";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Icon from "../../components/shared/icon/Icon";
import './registerPage.scss'

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [email, setEmail] = useState('')
    const [birthday, setBirthday] = useState('')
    const [terms, setTerms] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [repeatPasswordError, setRepeatPasswordError] = useState(false)
    const [nicknameError, setNicknameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [birthdayError, setBirthdayError] = useState(false)
    const [termsError, setTermsError] = useState(false)

    const [buttonActive, setButtonActive] = useState(false)

    const navigate = useNavigate();

    const { userStore, popupStore } = useStore();

    useEffect(() => {
        if (username.length > 0 && password.length > 0 && repeatPassword.length > 0 && nickname.length > 0 && email.length > 0 && birthday.length > 0 && terms) {
            setButtonActive(true)
        } else {
            setButtonActive(false)
        }
    }, [username, password, repeatPassword, nickname, email, birthday, terms])

    const validateUsername = () => {
        if (username.length < 3 && username.match(/^[a-zA-Z0-9]+$/) && userStore.validateUsername(username)) {
            setUsernameError(true)
            return false
        }
        setUsernameError(false)
        return true
    }

    const validatePassword = () => {
        if (password.length < 8 && password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm) === null) {
            setPasswordError(true)
            return false
        }
        setPasswordError(false)
        return true
    }

    const validateRepeatPassword = () => {
        if (repeatPassword !== password) {
            setRepeatPasswordError(true)
            return false
        }
        setRepeatPasswordError(false)
        return true
    }

    const validateNickname = () => {
        if (nickname.length < 3 && nickname.match(/^[a-zA-Z]+$/)) {
            setNicknameError(true)
            return false
        }
        setNicknameError(false)
        return true
    }

    const validateEmail = () => {
        if (email.match(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/) === null) {
            setEmailError(true)
            return false
        }
        setEmailError(false)
        return true
    }

    const validateBirthday = () => {
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 13) {
            setBirthdayError(true)
            return false
        }
        setBirthdayError(false)
        return true
    }

    const validateTerms = () => {
        if (!terms) {
            setTermsError(true)
            return false
        }
        setTermsError(false)
        return true
    }



    async function onSubmitNewUser() {
        //if (validateUsername() && validatePassword() && validateRepeatPassword() && validateNickname() && validateEmail() && validateBirthday() && validateTerms()) {

            let user: CreateUserDTO = { userName: username, password: password, nickName: nickname, salt: '', profilePicUrl: '' };
            await userStore.create(user)
            console.log(userStore.user)
            if (userStore.user) {
                navigate('/')
            }
        //} else {
            popupStore.showError('An Error occured', 'Please check your inputs')
        //}
    }

    var tooltips: any = document.querySelectorAll('.tooltip div');

    window.onmousemove = function (e) {
        var x = (e.clientX + 20) + 'px',
            y = (e.clientY + 20) + 'px';
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.top = y;
            tooltips[i].style.left = x;
        }
    };
    return (
        <>
            <div className='Register-Container'>

                <img className='Register-Background' src='https://github.githubassets.com/images/modules/site/codespaces/glow.png'></img>
                <div className='Register-Wrapper' >
                    <div className={`Register-Component ${shouldAnimate ? 'animComponent' : ''}`}>
                        <div className='Register-Title'>Sign up</div>
                        <div className='Register-InputContainer'>
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle'>
                                    Username
                                </div>
                                <div className={`Register-InputFieldWrapper ${username.length > 0 ? 'active' : ''} ${usernameError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="username" /></div>
                                    <input className='Register-InputInput' placeholder='Username' onClick={() => setUsernameError(false)} onChange={(e) => { setUsername(e.target.value); if (e.target.value.length <= 1) { setUsernameError(false) } }} type="text" />
                                </div>
                            </div>
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle'>Password</div>
                                <div className={`Register-InputFieldWrapper ${password.length > 0 ? 'active' : ''}  ${passwordError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="password" /></div>
                                    <input className='Register-InputInput' placeholder='Password' onClick={() => setPasswordError(false)} onChange={(e) => { setPassword(e.target.value); if (e.target.value.length <= 1) { setPasswordError(false) } }} type="Password" />
                                </div>
                            </div>
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle'>Repeat password</div>
                                <div className={`Register-InputFieldWrapper ${repeatPassword.length > 0 ? 'active' : ''}  ${repeatPasswordError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="password" /></div>
                                    <input className='Register-InputInput' placeholder='Repeat password' onClick={() => setRepeatPasswordError(false)} onChange={(e) => { setRepeatPassword(e.target.value); if (e.target.value.length <= 1) { setRepeatPasswordError(false) } }} type="Password" />
                                </div>
                            </div>
                            {/**
                              * NICKNAME
                              */}
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Nickname <div style={{ width: "24px", height: "24px", cursor: "pointer", filter: 'var(--color-icon)' }} className="tooltip"><Icon name="question" /> <div>Your screen name, this is what others will see. <br></br> Can be changed later.</div></div></div>
                                <div className={`Register-InputFieldWrapper ${nickname.length > 0 ? 'active' : ''}  ${nicknameError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="nickname" /></div>
                                    <input className='Register-InputInput' placeholder='Nickname' onClick={() => setNicknameError(false)} onChange={(e) => { setNickname(e.target.value); if (e.target.value.length <= 1) { setNicknameError(false) } }} type="text" />
                                </div>
                            </div>
                            {/**
                             *  EMAIL 
                            */}
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Email </div>
                                <div className={`Register-InputFieldWrapper ${email.length > 0 ? 'active' : ''}  ${emailError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="mail" /></div>
                                    <input className='Register-InputInput' placeholder='Email' onClick={() => setEmailError(false)} onChange={(e) => { setEmail(e.target.value); if (e.target.value.length <= 1) { setEmailError(false) } }} type="text" />
                                </div>
                            </div>
                            {/**
                             * BIRTHDAY
                             */}
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Birthday </div>
                                <div className={`Register-InputFieldWrapper ${birthday.length > 0 ? 'active' : ''}  ${birthdayError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="cake" /></div>
                                    <input className='Register-InputInput' placeholder='Birthday' onClick={() => setBirthdayError(false)} onChange={(e) => { setBirthday(e.target.value); if (e.target.value.length <= 1) { setBirthdayError(false) } }} type="date" />
                                </div>
                            </div>
                            {/**
                             *  TERMS 
                            */}
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Terms</div>
                                <div className={`Register-InputFieldWrapper ${terms ? 'active' : ''}  ${termsError ? 'error' : ''}`}>

                                    <input id='TermsCheck' type="checkbox" onChange={(e) => setTerms(e.target.checked)} />
                                    <div className='Register_TermsContainer'>
                                        I have read and agree to the <Link to={'/terms'} className='Register_TermsLink'> Terms of Service </Link> and <Link to={'/privacy'} className='Register_TermsLink'>Privacy Policy</Link>
                                    </div>
                                </div>
                            </div>
                            <div className='Register-Button' onClick={() => onSubmitNewUser()}>
                                Sign up
                            </div>
                        </div>
                        <div className='Register-NeedAccountWrapper'>
                            <div className='Register-NeedAccountTitle'>Already have an account?</div>
                            <div className='Register-NeedAccountButton'>
                                <Link to={'/login'}>
                                    Go to login
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(RegisterPage)