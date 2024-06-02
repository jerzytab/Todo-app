import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import TaskList from './components/TaskList';
import TaskDetails from './components/TaskDetails';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = (credentials) => {
    // Tutaj można dodać logikę logowania
    console.log('Logging in with', credentials);
    setIsAuthenticated(true);
  };

  const handleRegister = (details) => {
    // Tutaj można dodać logikę rejestracji
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
