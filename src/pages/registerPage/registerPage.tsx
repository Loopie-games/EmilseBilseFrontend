import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../stores/store';
import {CreateUserDTO } from "../../models/user/userInterface";

const RegisterPage = () =>{

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')

    const {userStore} = useStore();



    async function onSubmitNewUser() {
        let user: CreateUserDTO = {username, password, nickname};
        await userStore.create(user)
        console.log(userStore.user)
    }

    return(
        <>
            Username:
        <input onChange={event => setUsername(event.target.value)} type="text" placeholder='Username'/>
            Password:
        <input onChange={event => setPassword(event.target.value)} type="text" placeholder='Password'/>
            Nickname:
        <input onChange={event => setNickname(event.target.value)} type="text" placeholder='Nickname'/>
            <button onClick={onSubmitNewUser} type="submit">Submit</button>
        </>
    )
}

export default observer(RegisterPage)