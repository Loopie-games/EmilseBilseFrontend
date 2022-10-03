import { observer } from 'mobx-react-lite';
import { useState } from 'react';
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

    const navigate = useNavigate();

    const { userStore, popupStore } = useStore();

    /**
     * @Description Registers the user with the given information
     */
    const onSubmitNewUser = async () => {
        if (username.length < 8 && username.match(/^[a-zA-Z0-9]+$/) === null) {
            setUsernameError(true)
            return;
        }
        if (password.length < 8 && password.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/) === null) {
            setPasswordError(true)
            return;
        }
        if (repeatPassword !== password || repeatPassword.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/) === null) {
            setRepeatPasswordError(true)
            return;
        }
        if (nickname.length < 3 && nickname.match(/^[a-zA-Z]+$/) === null) {
            setNicknameError(true)
            return;
        }

        if (email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) === null) {
            setEmailError(true)
            return;
        }

        //check if user is more than 13 years old
        const today = new Date();
        const birthDate = new Date(birthday);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 13) {
            setBirthdayError(true)
        }

        if (!terms) {
            setTermsError(true)
        }

        if (!usernameError && !passwordError && !repeatPasswordError && !nicknameError && !emailError && !birthdayError && !termsError) {
            let user: CreateUserDTO = { userName: username, password: password, nickName: nickname, salt: '', profilePicUrl: '' };
            await userStore.create(user)
            console.log(userStore.user)
            if (userStore.user) {
                navigate('/')
            }

        } else {
            popupStore.showError('An Error occured', 'Please check your inputs')
        }
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
                                    <div className='Register-InputIcon'><Icon name="nickname" /></div>
                                    <input className='Register-InputInput' placeholder='Email' onClick={() => setEmailError(false)} onChange={(e) => { setEmail(e.target.value); if (e.target.value.length <= 1) { setEmailError(false) } }} type="text" />
                                </div>
                            </div>
                            {/**
                             * BIRTHDAY
                             */}
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Birthday </div>
                                <div className={`Register-InputFieldWrapper ${birthday.length > 0 ? 'active' : ''}  ${birthdayError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="nickname" /></div>
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