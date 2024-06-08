import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';
import checkAuth from './checkAuth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const authData = await checkAuth();
        if (authData.status === 'authenticated') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    };

    authenticate();
  }, []);

  const handleLogin = (userID) => {
    console.log('Logged in with userID:', userID);
    setIsAuthenticated(true);
  };

  const handleRegister = (details) => {
    console.log('Registered with details:', details);
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return showLogin ? (
        <Login onLogin={handleLogin} onRegisterClick={() => setShowLogin(false)} />
    ) : (
        <Register onRegister={handleRegister} onLoginClick={() => setShowLogin(true)} />
    );
  }

  return (
      <div className="app">
        <Sidebar />
        <TaskList />
        <TaskDetails />
      </div>
  );
}

export default App;
