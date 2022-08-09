import React from 'react'
import { UserDTO } from '../../../models/user/userInterface'
import './userComponent.scss'

const userComponent = (user: any) => {


    return (
        <div>
            <div><img src={user.profilePicture !== undefined ? user.profilePicture : 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'} alt="PB" /></div>
            <div>X</div>
            <div>
                <div>
                    {user.nickname}
                </div>
                <div>
                    {user.username}
                </div>
            </div>
        </div>
    )
}

export default userComponent