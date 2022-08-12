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

function App() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/home", element: <RequireAuth><HomePage /></RequireAuth> },
    { path: "/Lobby", element: <RequireLobby><LobbyPage /></RequireLobby> },
    { path: "/game", element: <GameboardPage /> },
    { path: "*", element: < div style={{ color: 'white', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 404 </div> }
  ];

  const { userStore } = useStore();
  useEffect(() => {
    /*
    if (localStorage.getItem('userId') !== null) {
      userStore.getById(localStorage.getItem('userId') ?? '');
    }
        */
  }, [])



  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <>
                <Navbar />
                {route.element}
              </>
            } />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default observer(App);
