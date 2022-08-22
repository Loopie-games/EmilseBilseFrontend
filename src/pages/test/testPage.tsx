import React, { useEffect, useState } from 'react'
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import InvertedCornerQ2 from '../../components/shared/invertedCorners/invertedCornerQ2';
import InvertedCornerQ3 from '../../components/shared/invertedCorners/invertedCornerQ3';
import InvertedCornerQ4 from '../../components/shared/invertedCorners/invertedCornerQ4';
import { useStore } from '../../stores/store';
import './testPage.scss'

const TestPage = () => {
  const [tile, setTile] = useState('');
  const { tileStore, friendshipStore, userStore } = useStore();

  const handleCreateTile = (username: string) => {
    let addedByUserId = userStore.user?.id !== undefined ? userStore.user?.id : '';
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
      <div className='testasdasd2'>
        <div className='testasdasd'>
          <InvertedCornerQ1 />
          <InvertedCornerQ2 />
          <InvertedCornerQ3 />
          <InvertedCornerQ4 />
        </div>
      </div>
    </>
  )
}

export default TestPage