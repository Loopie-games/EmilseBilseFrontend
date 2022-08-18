import React, { useEffect, useState } from 'react'
import { useStore } from '../../stores/store';
import './testPage.scss'

const TestPage = () => {
  const [tile, setTile] = useState('');
  const { tileStore, friendshipStore, userStore } = useStore();

  const handleCreateTile = (username: string) => {
    let addedByUserId = userStore.user?.id !== undefined ? userStore.user?.id : '';
    tileStore.createNewTile_User({ addedByUserId: addedByUserId, action: tile, aboutUsername: username });
  }

  const loadFriends = async () => {
    await friendshipStore.getFriendList(userStore.user?.id ? userStore.user.id : '');
  }
  useEffect(() => {
    loadFriends();
    console.log("asdasdasd");

    console.log(friendshipStore._friendlist);

  }, [])

  return (
    <>
      <div> ASDASDASD</div>
    </>
  )
}

export default TestPage