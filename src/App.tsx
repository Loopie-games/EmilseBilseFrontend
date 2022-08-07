import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage/landingPage';
import RegisterPage from './pages/registerPage/registerPage';
import LoginPage from'./pages/LoginPage/loginPage';
import HomePage from'./pages/homePage/homePage';
import Navbar from './components/shared/navbar/Navbar';

function App() {
  const routes = [
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/login", element: <LoginPage />},
    { path: "/home", element: <HomePage />}
  ];

  return (
    <div className="App">
      <Router>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={
              <>
                <Navbar/>
                {route.element}
              </>
            } />
          ))}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
