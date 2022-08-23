import { observer } from 'mobx-react-lite';
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import FriendRequest from '../../components/friendsPages/friendRequests/friendRequests';
import Friends from '../../components/friendsPages/friends/friends';
import Icon from '../../components/shared/icon/Icon';
import { useStore } from '../../stores/store';
import './friendRequestPage.scss'

const FriendRequestPage = () => {
    const t2 = [{ r1: "asd", a2: "asd" }, { r1: "a123", a2: "123" }]

    const { friendshipStore, userStore } = useStore();
    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadData = async () => {
            await friendshipStore.getFriendRequests();
            setLoading(false);
        }

        loadData();
    }, [])

    return (
        <div className='FriendsPage-Container'>
            {loading ? <div className='FriendsPage-Loading'>Loading...</div> :
                <div className='FriendsPage-Wrapper'>
                    <div className='FriendsPage-Title'>Friend Requests</div>
                    <div className='FriendsPage-FriendsContainer'>
                        {friendshipStore._friendRequests?.map((t, i) => <FriendRequest key={i} {...t} />)}
                    </div>
                </div>
            }
        </div>
    )
}

export default observer(FriendRequestPage)