import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost/backend/authenticate.php', {
        method: 'GET',
        credentials: 'include', // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      if (data.status === 'authenticated') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Authentication check failed', error);
    }
  };

  const handleLogin = (credentials) => {
    console.log('Logging in with', credentials);
    setIsAuthenticated(true);
  };

  const handleRegister = (details) => {
    console.log('Registering with', details);
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
