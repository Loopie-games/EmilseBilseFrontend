import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/LoginPage/loginPage';
import Navbar from './components/shared/navbar/Navbar';
import TestPage from './pages/test/testPage';
import { useStore } from './stores/store';
import RequireAuth from './components/shared/requireAuth/RequireAuth';
import { observer } from 'mobx-react-lite';
import LobbyPage from './pages/lobbyPage/lobbyPage';
import GameboardPage from './pages/gameboardPage/gameboardPage';
import RequireLobby from './components/shared/requireLobby/RequireLobby';
import PageNotFound from './pages/pageNotFound/pageNotFound';
import LoggedInBar from './components/shared/loggedInBar/LoggedInBar';
import FriendsPage from './pages/friendsPage/friendsPage';
import FriendRequestPage from './pages/friendRequestPage/friendRequestPage';
import AddFriendPage from './pages/addFriendPage/addFriendPage';
import TilesForYouPage from './pages/tilesPages/tilesForYouPage/tilesForYouPage';
import TilesMadeByYouPage from './pages/tilesPages/tilesMadeByYouPage/tilesMadeByYouPage';
import AboutUsPage from './pages/aboutUsPage/aboutUsPage';
import Popup from './components/shared/popups/popup';
import MobileNav from './components/shared/navbar/mobileNavbar/mobileNav';
import Winnerscreen from './components/gameBoard/winnerscreen/winnerscreen';
import LandscapeOrientation from './components/shared/orientation/landscapeOrientation/landscapeOrientation';
import PortraitOrientation from './components/shared/orientation/potraitOrientation/portraitOrientation';

function App() {
  const { userStore, popupStore, mobileStore, themeStore } = useStore();
  const [showPortraitError, setShowPortraitError] = useState(false);
  const [showLandscapeError, setShowLandscapeError] = useState(false);

  const routes = [
    { path: "/", element: <LandingPage />, isLandscape: false },
    { path: "/register", element: <RegisterPage />, isLandscape: false },
    { path: "/login", element: <LoginPage />, isLandscape: false },
    { path: "/lobby", element: <RequireLobby><LobbyPage /></RequireLobby>, isLandscape: false },
    { path: "/game/:id", element: <GameboardPage />, isLandscape: true },
    { path: "/user/friendlist/:id", element: <FriendsPage />, isLandscape: false },
    { path: "/test", element: <TestPage />, isLandscape: false },
    { path: "/user/addfriend/", element: <AddFriendPage />, isLandscape: false },
    { path: "/user/friendRequests", element: <FriendRequestPage />, isLandscape: false },
    { path: "/user/tiles/:id", element: <TilesForYouPage />, isLandscape: false },
    { path: "/user/tilesby/:id", element: <TilesMadeByYouPage />, isLandscape: false },
    { path: "/AboutUs", element: <AboutUsPage />, isLandscape: false },
    { path: "/game/won/:id", element: <Winnerscreen />, isLandscape: false },
    { path: "*", element: <PageNotFound />, isLandscape: false }
  ];


  useEffect(() => {
    if (localStorage.getItem('userId') !== null) {
      userStore.getById(localStorage.getItem('userId') ?? '');
    }

    if (window.screen.availWidth < 768) {
      mobileStore.setIsMobile(true);
    } else {
      mobileStore.setIsMobile(false);
    }
    themeStore.setTheme();


    let r = routes.find(r => r.path.toLowerCase() === window.location.pathname.toLowerCase());

    if (mobileStore.isMobile) {
      if (r?.isLandscape === true && window.screen.orientation.type === "portrait-primary") {
        setShowLandscapeError(true);
      }
      else if (r?.isLandscape === false && window.screen.orientation.type === "landscape-primary") {
        setShowPortraitError(true);
      }
      else {
        setShowLandscapeError(false);
        setShowPortraitError(false);
      }
    }
  }, [])

  useEffect(() => {

    window.screen.orientation.addEventListener('change', () => {
      let r = routes.find(r => r.path.toLowerCase() === window.location.pathname.toLowerCase());
      
      if (r?.isLandscape === true && window.screen.orientation.type === "portrait-primary") {
        setShowLandscapeError(true);
      }
      else if (r?.isLandscape === false && window.screen.orientation.type === "landscape-primary") {
        setShowPortraitError(true);
      }
      else {
        setShowLandscapeError(false);
        setShowPortraitError(false);
      }

    })
  })

  return (
    <>
      {showLandscapeError && <LandscapeOrientation />}
      {showPortraitError && <PortraitOrientation />}
      <div className="App">
        {popupStore.isShown && <Popup isConfirmation={popupStore.isConfirmation} title={popupStore.title} errorMessage={popupStore.errorMessage} handleClose={popupStore.onCancel} handleConfirm={popupStore.onConfirm} />}
        <Router>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={
                <>
                  {!mobileStore.isMobile &&
                    <>
                      <Navbar />
                      <div style={{ "zIndex": "2", "height": "70px", "width": "100%", "backgroundColor": "var(--color-foreground)" }}></div>
                    </>
                  }
                  <div style={{ "display": "flex", "flexDirection": "row", "flex": "1", "overflow": "hidden", "position": "relative" }}>
                    {userStore.user !== undefined && !mobileStore.isMobile && <LoggedInBar />}
                    {route.element}
                  </div>
                  {mobileStore.isMobile && <MobileNav />}
                </>
              } />
            ))}
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default observer(App);
