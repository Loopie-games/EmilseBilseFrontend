import React, { createRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import './profilePage.scss'
import { useStore } from '../../stores/store';
import { useParams } from 'react-router-dom';
import Icon from '../../components/shared/icon/Icon';
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import { UserDTO } from '../../models/user/userInterface';
import ProfilePageMobile from './profilePageMobile/profilePageMobile';


const inputFile = createRef<HTMLInputElement>();

const ProfilePage = () => {
    const [isOwner, setIsOwner] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [showing, setShowing] = useState('overview');
    const [user, setUser] = useState<UserDTO>();
    const params = useParams();
    const [testPB, setTestPB] = useState("");

    const { userStore, mobileStore } = useStore();
    useEffect(() => {
        if (userStore.user?.id === params.id) {
            setIsOwner(true);
            setUser(userStore.user);
        } else {
            setIsOwner(false);
            getUser();
        }
        return () => {
            setIsOwner(false);
            setUser(undefined);
        }
    }, [])

    const getUser = async () => {
        const user = await userStore.getUserById(params.id!);
        setUser(user);
    }

    const edit = () => {
        if (isInEditMode) {
            //TODO save changes when endpoint is done
            setIsInEditMode(false);
        } else {
            setIsInEditMode(true);
        }
    }

    const selectPB = () => {
        if (inputFile.current !== null && inputFile.current !== undefined) {
            inputFile.current.click();
        }
    }

    const uploadProfilePic = async (event: any) => {
        const file = event[0]
        const response = await userStore.updateProfilePic(file);
        setTestPB(response);
    }



    return (
        <>
            {mobileStore.isMobile ? <ProfilePageMobile /> :
                <div className='ProfilePage_Container'>
                    <input type="file" ref={inputFile} style={{ display: 'none' }} onChange={(e) => uploadProfilePic(e.target.files)} />
                    <div className='ProfilePage_Wrapper'>
                        {/*
                    LEFT SIDE
                */}
                        <div className='ProfilePage_UserContainer'>
                            <div className='ProfilePage_UserWrapper'>
                                <div className='ProfilePage_UserPic'>
                                    <div className='ProfilePage_UserPicContainer'>
                                        <img src={`${testPB}`} alt='userpic' />
                                        {isOwner && <div className='ProfilePage_UserPicEdit' onClick={selectPB}><Icon name="cross" /></div>}
                                    </div>
                                </div>
                                {isOwner &&
                                    <div className='ProfilePage_EditUser' onClick={edit}>
                                        {isInEditMode ? "Save Changes" : "Edit User"}
                                    </div>
                                }
                                <div className='ProfilePage_Name'>
                                    <div className='ProfilePage_NameContainer'>
                                        <input type='text' placeholder='Name' value={user?.username} disabled={true} />

                                    </div>
                                    <div className='ProfilePage_NicknameContainer'>
                                        <input type='text' placeholder='Nickname' value={user?.nickname} disabled={!isInEditMode} />
                                    </div>
                                </div>
                                <div className='ProfilePage_Description'>
                                    <div className='ProfilePage_DescriptionContainer'>
                                        <textarea placeholder='Description' disabled={!isInEditMode} />
                                    </div>
                                </div>
                                <div className='ProfilePage_Friends'>
                                    <div className='ProfilePage_FriendsTitle'>
                                        Friends - 207
                                    </div>
                                    <div className='ProfilePage_FriendsContainer'>
                                        AAAAA
                                    </div>
                                </div>
                                <div className='ProfilePage_Achievements'>
                                    <div className='ProfilePage_AchievementsTitle'>
                                        Achievements - 207
                                    </div>
                                    <div className='ProfilePage_AchievementsContainer'>
                                        AAAAA
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*
                    RIGHT SIDE
                */}
                        <div className='ProfilePage_RightSideContainer'>
                            <div className='ProfilePage_BannerImageContainer'>
                                <img id='banner' src='https://i.imgur.com/4ZQ3Z4u.png' alt='banner' />
                                {isOwner && <div className='ProfilePage_BannerImageEdit'><Icon name="cross" /></div>}
                            </div>
                            <InvertedCornerQ1 />
                            <div className='ProfilePage_MainSection'>
                                <div className='ProfilePage_MainSectionNavbar'>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'overview' ? 'active' : ''}`} onClick={() => setShowing('overview')}>
                                        Overview
                                    </div>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'achievements' ? 'active' : ''}`} onClick={() => setShowing('achievements')}>
                                        Achievements
                                    </div>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'friends' ? 'active' : ''}`} onClick={() => setShowing('friends')}>
                                        Friends
                                    </div>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'tiles' ? 'active' : ''}`} onClick={() => setShowing('tiles')}>
                                        Tiles
                                    </div>
                                </div>
                                <div className='ProfilePage_MainSectionContent'>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default observer(ProfilePage)