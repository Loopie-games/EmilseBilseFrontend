import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import Loader from '../loader/loader';

const RequireLobby = ({ children }: any) => {
    const { gameStore } = useStore();
    const [loaded, setLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * @TODO RIGTIG RINGE MÅDE AT GØRE DET PÅ. MÅ KUNNE FINDES EN BEDRE
     */

    useEffect(() => {
        loadLobby();
    }, [])

    const loadLobby = async () => {
        setLoaded(false);
        if (gameStore.lobby !== undefined) {
            setIsLoggedIn(true);
        }
        setLoaded(true);
    }

    return (
        <>
            {loaded ?
                <>
                    {isLoggedIn ? children : <Navigate to='/' />}
                </>
                : <Loader />}
        </>
    )
}

export default observer(RequireLobby)