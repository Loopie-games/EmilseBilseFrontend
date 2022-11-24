import React, { createRef, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite';
import './profilePage.scss'
import { useStore } from '../../stores/store';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../../components/shared/icon/Icon';
import InvertedCornerQ1 from '../../components/shared/invertedCorners/invertedCornerQ1';
import { UserDTO } from '../../models/user/userInterface';
import ProfilePageMobile from './profilePageMobile/profilePageMobile';
import ProfileFriends from '../../components/profile/friends/profileFriends';
import Loader from '../../components/shared/loader/loader';
import filterService from '../../services/filterService';
import Filter from '../../components/shared/filter/filter';
import ProfileTiles from '../../components/profile/tiles/profileTiles';
import ProfileAchievements from '../../components/profile/achievements/profileAchievements';
import { Friend } from '../../models/friendship/friendInterface';
const inputFile = createRef<HTMLInputElement>();

const ProfilePage = () => {
    const [isOwner, setIsOwner] = useState(false);
    const [isInEditMode, setIsInEditMode] = useState(false);
    const [showing, setShowing] = useState('overview');
    const [user, setUser] = useState<UserDTO>();
    const params = useParams();

    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');

    const navigate = useNavigate();
    const [testPB, setTestPB] = useState("");
    const [loading, setLoading] = useState(false);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [placeholder, setPlaceholder] = useState('');
    const defaultPic = 'https://as2.ftcdn.net/v2/jpg/02/15/84/43/1000_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg'
    const [testAchievements, setTestAchievements] = useState<any[]>([
        {
            achievement: {
                id: 1,
                title: "First achievement",
                description: "First achievement description",
            }
        },
        {
            achievement: {
                id: 2,
                title: "Second achievement",
                description: "Second achievement description",
            }
        },
        {
            achievement: {
                id: 3,
                title: "Third achievement",
                description: "Third achievement description",
            }
        },
    ]);

    const { userStore, mobileStore, friendshipStore, tileStore } = useStore();
    useEffect(() => {
        if (userStore.user?.id === params.id) {
            setIsOwner(true);
            setNickname(userStore.user!.nickname);
            setUser(userStore.user);
        } else {
            setIsOwner(false);
            getUser();
        }

        if (showing === 'friends') {
            getFriendList();
        }

        const loadFriends = async () => {
            await friendshipStore.getFriendList(params.id!);
        }
        const loadTiles = async () => {
            await tileStore.getTilesAboutUser(params.id!);
        }
        loadTiles();
        loadFriends();

        return () => {
            setIsOwner(false);
            setUser(undefined);
        }

    }, [params.id])

    const getUser = async () => {
        const user = await userStore.getUserById(params.id!);
        setUser(user);
    }

    const getFriendList = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('friends');
        if (friendshipStore._friendlist === undefined) {
            await friendshipStore.getFriendList(params.id!);
        } else {
            setFiltered(friendshipStore._friendlist!);
        }
        setLoading(false);
    }

    const getTilesAboutUser = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('tiles');
        if (tileStore.tilesAboutUser?.length === undefined) {
            await tileStore.getTilesAboutUser(params.id!);
        } else {
            setFiltered(tileStore.tilesAboutUser!);
        }
        setLoading(false);
    }

    const getAchievements = async () => {
        setFiltered([]);
        setLoading(true);
        setShowing('achievements');

        // await userStore.getAchievements(params.id!);
        if (testAchievements.length === 0) {
            //await userStore.getAchievements(params.id!);
        } else {
            setFiltered(testAchievements);
        }
        setLoading(false);
    }


    const edit = () => {
        if (isInEditMode) {
            //TODO save changes when endpoint is done

            //Create object to send to db for handling
            let data: UserDTO = {
                id: user!.id,
                username: user!.username,
                nickname: nickname,
                profilePicture: user!.profilePicture!
            }

            userStore.update(data).then(res=>{
                
            })
            
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

    const filterInAchievements = (query: string) => {
        if (testAchievements !== undefined) {
            setFiltered(filterService.filterInAchievements(query, testAchievements));
        }
    }

    const filterInFriends = (query: string) => {
        if (friendshipStore._friendlist !== undefined) {
            setFiltered(filterService.filterForFriends(query, friendshipStore._friendlist));
        }
    }

    const filterInTiles = (query: string) => {
        if (tileStore.tilesAboutUser !== undefined) {
            setFiltered(filterService.filterForTiles(query, tileStore.tilesAboutUser));
        }
    }

    const filter = (query: string) => {

        switch (showing) {
            case 'achievements':
                filterInAchievements(query);
                break;
            case 'friends':
                filterInFriends(query);
                break;
            case 'tiles':
                filterInTiles(query);
                break;
            default:
                break;
        }
    }

    const getPlaceholderText = () => {
        switch (showing) {
            case 'achievements':
                return 'Search for achievements';
            case 'friends':
                return 'Search for friends';
            case 'tiles':
                return 'Search for tiles';
            default:
                return '';
        }
    }

    useEffect(() => {
        filter('');
        setPlaceholder(getPlaceholderText());
    }, [showing, friendshipStore._friendlist, tileStore.tilesAboutUser])

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
                                        <input id='nicknameChange' type='text' placeholder='Nickname' value={/*user?.nickname*/nickname} disabled={!isInEditMode} onChange={(e)=> {setNickname(e.target.value)}} />
                                    </div>
                                </div>
                                <div className='ProfilePage_Description'>
                                    <div className='ProfilePage_DescriptionContainer'>
                                        <textarea id='descriptionChange' placeholder='Description' disabled={!isInEditMode} onChange={(e)=>{setDescription(e.target.value)}} />
                                    </div>
                                </div>
                                <div className='ProfilePage_Friends'>
                                    <div className='ProfilePage_FriendsTitle'>
                                        Friends - {friendshipStore._friendlist?.length}
                                    </div>
                                    <div className='ProfilePage_FriendsContainer'>
                                        {
                                            friendshipStore._friendlist?.slice(0, 3).map((friend: Friend) => (
                                                <div className='ProfilePage_FriendPics' key={friend.id}>
                                                    <img id='ProfilePage_FriendsPic' src={defaultPic} alt='friendpic' onClick={() => navigate(`/user/profile/${friend.user.id}`)} />
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='ProfilePage_Achievements'>
                                    <div className='ProfilePage_AchievementsTitle'>
                                        Achievements - {testAchievements?.length}
                                    </div>
                                    <div className='ProfilePage_AchievementsContainer'>
                                        {testAchievements?.slice(0, 3).map((achievement: any) => (
                                            <div className='ProfilePage_Achievement' key={achievement.achievement.id}>
                                                <img id='ProfilePage_Achievement' src='https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png' alt='achievement' />
                                            </div>
                                        ))}
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
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'achievements' ? 'active' : ''}`} onClick={() => getAchievements()}>
                                        Achievements
                                    </div>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'friends' ? 'active' : ''}`} onClick={() => getFriendList()}>
                                        Friends
                                    </div>
                                    <div className={`ProfilePage_MainSectionNavbarButton ${showing === 'tiles' ? 'active' : ''}`} onClick={() => getTilesAboutUser()}>
                                        Tiles
                                    </div>
                                </div>
                                <div className='ProfilePage_MainSectionContent'>
                                    {showing !== 'overview' &&
                                        <div className='ProfilePage_FilterContainer'>
                                            <div className='ProfilePage_FilterWrapper'>
                                                <Filter filter={(e: string) => filter(e)} placeholder={placeholder} />
                                            </div>
                                        </div>
                                    }
                                    {showing === 'friends' && <>
                                        {loading ? <Loader /> :
                                            <div className='ProfilePage_ContentContainer'>
                                                {filtered.map((friend) => (
                                                    <ProfileFriends key={friend.id} {...friend} />
                                                ))}
                                            </div>
                                        }
                                    </>
                                    }
                                    {showing === 'tiles' && <>
                                        {loading ? <Loader /> :
                                            <div className='ProfilePage_ContentContainer'>
                                                {filtered.map((tile) => (
                                                    <ProfileTiles key={tile.id} {...tile} />
                                                ))}
                                            </div>
                                        }
                                    </>
                                    }
                                    {showing === 'achievements' && <>
                                        {loading ? <Loader /> :
                                            <div className='ProfilePage_ContentContainer'>
                                                {filtered.map((achievement) => (
                                                    <ProfileAchievements key={achievement.id} {...achievement} />
                                                ))}
                                            </div>
                                        }
                                    </>}
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