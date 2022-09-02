import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  const { userStore, popupStore } = useStore()
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/Lobby", element: <RequireLobby><LobbyPage /></RequireLobby> },
    { path: "/game", element: <GameboardPage /> },
    { path: "/user/friendlist/:id", element: <FriendsPage /> },
    { path: "/test", element: <TestPage /> },
    { path: "/user/addfriend/", element: <AddFriendPage /> },
    { path: "/user/friendRequests", element: <FriendRequestPage /> },
    { path: "/user/tiles/:id", element: <TilesForYouPage /> },
    { path: "/user/tilesby/:id", element: <TilesMadeByYouPage /> },
    { path: "/AboutUs", element: <AboutUsPage /> },
    { path: "*", element: <PageNotFound /> }
  ];
  ;
  useEffect(() => {
    if (localStorage.getItem('userId') !== null) {
      userStore.getById(localStorage.getItem('userId') ?? '');
    }
  }, [])

  return (
    <div className="App">
      {popupStore.isShown && <Popup isConfirmation={false} title="An Error Occured!" errorMessage={popupStore.errorMessage} handleClose={popupStore.hide} />}
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <>
                <Navbar />
                <div style={{ "zIndex": "2", "height": "70px", "width": "100%", "backgroundColor": "#24292f" }}></div>
                <div style={{ "display": "flex", "flexDirection": "row", "flex": "1" }}>
                  {userStore.user !== undefined ? <LoggedInBar /> : null}
                  {route.element}
                </div>
              </>
            } />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default observer(App);
