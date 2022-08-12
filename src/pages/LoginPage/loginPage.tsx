import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useStore } from '../../stores/store';
import { LoginDTO } from "../../models/user/userInterface";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './loginPage.scss'
import Icon from '../../components/shared/icon/Icon';

const LoginPage = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [incorrect, setIncorrect] = useState(false)
    const [shouldAnimate, setShouldAnimate] = useState(false)

    const { userStore } = useStore();
    const navigate = useNavigate()


    useEffect(() => {
        setShouldAnimate(true)
    }, [])

    const onLogin = async () => {
        let user: LoginDTO = { username, password };
        await userStore.login(user).then( res => {
                if (localStorage.getItem("token") !== null && localStorage.getItem("token") !== undefined) {
                    console.log('jwt: ' + localStorage.getItem("token"))
                    setLoggedIn(true)
                    navigate('/')
                    return
                } else {
                    setIncorrect(true)
                    return;
                }
            }
        )
    }



    return (
        <>
            <div className='Login-Container'>

                <img className='Login-Background' src='https://github.githubassets.com/images/modules/site/codespaces/glow.png'></img>
                <div className='Login-Wrapper' >
                    <div className={`Login-Component ${shouldAnimate ? 'animComponent' : ''}`}>
                        <div className='Login-Title'>Login</div>
                        <div style={{ color: 'red' }}>{incorrect ? 'Incorrect username or password' : ''}</div>
                        <div className='Login-InputContainer'>
                            <div className='Login-InputWrapper'>
                                <div className='Login-InputTitle'>
                                    Username
                                </div>
                                <div className={`Login-InputFieldWrapper ${username.length > 0 ? 'active' : ''}`}>
                                    <div className='Login-InputIcon'><Icon name="username" /></div>
                                    <input className='Login-InputInput' placeholder='Username' onClick={() => setIncorrect(false)} onChange={(e) => { setUsername(e.target.value); if (e.target.value.length <= 1) { setIncorrect(false) } }} type="text" />
                                </div>
                            </div>
                            <div className='Login-InputWrapper'>
                                <div className='Login-InputTitle'>Password</div>
                                <div className={`Login-InputFieldWrapper ${password.length > 0 ? 'active' : ''}`}>
                                    <div className='Login-InputIcon'><Icon name="password" /></div>
                                    <input className='Login-InputInput' placeholder='Password' onClick={() => setIncorrect(false)} onChange={(e) => { setPassword(e.target.value); if (e.target.value.length <= 1) { setIncorrect(false) } }} type="Password" />
                                </div>
                            </div>
                            <div className='Login-Button' onClick={() => onLogin()}>
                                Log In
                            </div>
                        </div>
                        <div className='Login-NeedAccountWrapper'>
                            <div className='Login-NeedAccountTitle'>Need an account?</div>
                            <div className='Login-NeedAccountButton'>
                                <Link to={'/register'}>
                                    Sign up for free!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(LoginPage)