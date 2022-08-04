import { observer } from 'mobx-react-lite';
import {useEffect, useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';

const HomePage = () =>{

    const [loggedUser, setLoggedUser] = useState(false);
    const [friendsLoaded, setLoadedFriends] = useState(false);

    const {userStore, friendshipStore} = useStore();

    useEffect(()=>{
        getLoggedUser()
        getFriends()
    })

    const getLoggedUser = async () =>{
        let u = localStorage.getItem("userId")
        if(u !== null){
            await userStore.getById(u)
        }
    }

    const getFriends = async () => {
        if(userStore.user !== undefined){
            setLoggedUser(true)

            await friendshipStore.getFriendList(userStore.user.id)
            setLoadedFriends(true);
        }
    }


    return(
        <>
            {loggedUser === false ?
            <div>
                You need to
                <Link to={'/login'}>log in</Link>
            </div>
            :
            <div>
                Welcome {userStore.user?.username} aka. {userStore.user?.nickname}

                {friendsLoaded === false ?
                    <div>
                        friends Loading
                    </div>
                    :
                    <div>
                        <br/>
                        Friends:
                        <ul>{friendshipStore._friendlist!.map((friend) =>
                        <li key = {friend.id}>
                            {friend.nickname}
                        </li>
                        )}</ul>
                        <br/>
                    </div>
                }
            </div>
            }
        </>
    )
}

export default observer(HomePage)