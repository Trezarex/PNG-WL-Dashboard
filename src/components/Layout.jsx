import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout, getCurrentUser } from '../utils/auth';
import { 
  BarChart3, 
  Users, 
  Shield, 
  Accessibility, 
  MessageCircle, 
  DollarSign, 
  LogOut, 
  Menu, 
  X,
  Home
} from 'lucide-react';
import './Layout.css';

const Layout = ({ children, onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const currentUser = getCurrentUser();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'EOPO 1 - Leadership', href: '/eopo1', icon: Users },
    { name: 'EOPO 2 - GBV Response', href: '/eopo2', icon: Shield },
    { name: 'EOPO 3 - Financial Decisions', href: '/eopo3', icon: DollarSign },
    { name: 'EOPO 4 - Men/Boys Engagement', href: '/eopo4', icon: MessageCircle },
    { name: 'Disability Equity', href: '/disability', icon: Accessibility },
    { name: 'Communications', href: '/communications', icon: BarChart3 },
  ];

  const handleLogout = () => {
    logout();
    onLogout();
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Gender Equity Portal</h2>
          <button 
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <button 
            className="menu-button"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="user-info">
            <span>Logged in as {currentUser}</span>
            <button onClick={handleLogout} className="logout-button">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="page-content">
          {children}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;