import { observer } from 'mobx-react-lite'
import React from 'react'

const ProfilePageMobile = () => {
    return (
        <div>
            <div>Banner</div>
            <div>Wrapper
                <div>UserInfo Container</div>
                <div>Achievements and friends container</div>
                <div>Content Container</div>
            </div>
        </div>
    )
}

export default observer(ProfilePageMobile)