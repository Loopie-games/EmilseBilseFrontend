import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from './pages/LoginPage/loginPage';
import HomePage from './pages/homePage/homePage';
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

function App() {
  const { userStore } = useStore()
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/home", element: <RequireAuth><HomePage /></RequireAuth> },
    { path: "/Lobby", element: <RequireLobby><LobbyPage /></RequireLobby> },
    { path: "/game", element: <GameboardPage /> },
    { path: "/user/friendlist/:id", element: <FriendsPage /> },
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
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <>
                <Navbar />
                <div style={{ "height": "70px", "width": "100%", "backgroundColor": "#24292f" }}></div>
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
