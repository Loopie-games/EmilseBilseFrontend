import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';
import Loader from '../loader/loader';

const RequireAuth = ({ children }: any) => {
    const { userStore } = useStore();
    const [loaded, setLoaded] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    /**
     * @TODO RIGTIG RINGE MÅDE AT GØRE DET PÅ. MÅ KUNNE FINDES EN BEDRE
     */

    useEffect(() => {
        loadUser();
    }, [])

    const loadUser = async () => {
        setLoaded(false);
        const t = localStorage.getItem("userId");
        console.log(t);

        if (t !== null) {
            await userStore.getLogged();
            setIsLoggedIn(true);
        }
        setLoaded(true);
    }

    return (
        <>
            {loaded ?
                <>
                    {isLoggedIn ? children : <Navigate to='/login' />}
                </>
                : <Loader />}
        </>
    )
}

export default observer(RequireAuth)