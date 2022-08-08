import { observer } from 'mobx-react-lite';
import {useEffect, useState } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useStore } from '../../stores/store';

const HomePage = () =>{

    const [loggedUser, setLoggedUser] = useState(false);
    const [friendsLoaded, setLoadedFriends] = useState(false);
    const [tilesLoaded, setTilesLoaded] = useState(false);

    const {userStore, friendshipStore, tileStore} = useStore();

    useEffect(()=>{
        getLoggedUser()
        getFriends()
        getTiles()
    }, [])

    const getLoggedUser = async () =>{
        let u = localStorage.getItem("userId")
        if(u !== null){
            await userStore.getById(u)
            if(userStore.user !== undefined){
                setLoggedUser(true)
            }
        }
    }

    const getFriends = async () => {
        if(userStore.user !== undefined){
            await friendshipStore.getFriendList(userStore.user.id)
            setLoadedFriends(true);
        }
    }

    const getTiles = async() => {
        if(userStore.user !== undefined){
            await tileStore.getAboutUserById_TileForUser(userStore.user.id)
            setTilesLoaded(true);
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
                {tilesLoaded === false ?
                    <div>
                        tiles Loading
                    </div>
                    :
                    <div>
                        <br/>
                        Tiles About you:
                        <ul>{tileStore.tilesAboutUser!.map((tile) =>
                            <li key = {tile.id}>
                                Action = "{tile.action}", 
                                Added by {tile.addedByNickname}
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