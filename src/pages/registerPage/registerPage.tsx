import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../stores/store';
import { CreateUserDTO } from "../../models/user/userInterface";
import securityService from "../../services/securityService";
import { Link } from 'react-router-dom';
import Icon from "../../components/shared/icon/Icon";
import './registerPage.scss'

const RegisterPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [shouldAnimate, setShouldAnimate] = useState(false)

    const [usernameError, setUsernameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [repeatPasswordError, setRepeatPasswordError] = useState(false)
    const [nicknameError, setNicknameError] = useState(false)


    const { userStore } = useStore();

    async function onSubmitNewUser() {
        if (username.length < 8 && username.match(/^[a-zA-Z0-9]+$/) === null) {
            setUsernameError(true)
        }
        if (password.length < 8 && password.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/) === null) {
            setPasswordError(true)
        }
        if (repeatPassword !== password || repeatPassword.match(/^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/) === null) {
            setRepeatPasswordError(true)
        }
        if (nickname.length < 3 && nickname.match(/^[a-zA-Z]+$/) === null) {
            setNicknameError(true)
        }
        if (!usernameError || !passwordError || !repeatPasswordError || !nicknameError) {
            let user: CreateUserDTO = { userName: username, password: password, nickName: nickname, salt: '', profilePicUrl: 'asdasd' };
            await userStore.create(user)
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
                            <div className='Register-InputWrapper'>
                                <div className='Register-InputTitle' style={{ display: "flex", flexDirection: "row" }}>Nickname <div style={{ width: "24px", height: "24px", cursor: "pointer" }} className="tooltip"><Icon name="question" /> <div>Your screen name, this is what others will see. <br></br> Can be changed later.</div></div></div>
                                <div className={`Register-InputFieldWrapper ${nickname.length > 0 ? 'active' : ''}  ${nicknameError ? 'error' : ''}`}>
                                    <div className='Register-InputIcon'><Icon name="nickname" /></div>
                                    <input className='Register-InputInput' placeholder='Nickname' onClick={() => setNicknameError(false)} onChange={(e) => { setNickname(e.target.value); if (e.target.value.length <= 1) { setNicknameError(false) } }} type="text" />
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