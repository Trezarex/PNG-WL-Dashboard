import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';
import Login from './components/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import EOPO1 from './pages/EOPO1';
import EOPO2 from './pages/EOPO2';
import EOPO3 from './pages/EOPO3';
import EOPO4 from './pages/EOPO4';
import Disability from './pages/Disability';
import Communications from './pages/Communications';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on app load
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        fontSize: '18px',
        color: '#6B7280'
      }}>
        Loading...
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/eopo1" element={<EOPO1 />} />
          <Route path="/eopo2" element={<EOPO2 />} />
          <Route path="/eopo3" element={<EOPO3 />} />
          <Route path="/eopo4" element={<EOPO4 />} />
          <Route path="/disability" element={<Disability />} />
          <Route path="/communications" element={<Communications />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;