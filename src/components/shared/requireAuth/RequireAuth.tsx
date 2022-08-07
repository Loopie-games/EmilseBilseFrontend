import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { useStore } from '../../../stores/store';

const RequireAuth = ({ children }: any) => {
    const { userStore } = useStore();

    return (
        userStore.user ? children : <Navigate to='/login' />
    )
}

export default observer(RequireAuth)