import { observer } from 'mobx-react-lite';

const RegisterPage = () =>{

    return(
        <>
            Username:
        <input type="text" placeholder='Username'/>
            Password:
        <input type="text" placeholder='Password'/>
            Nickename:
        <input type="text" placeholder='Nickname'/>
            <button>Submit</button>
        </>
    )
}

export default observer(RegisterPage)