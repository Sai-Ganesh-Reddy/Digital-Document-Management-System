import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, FileText, LogOut, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav>
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" className="nav-logo">
            <FileText className="nav-logo-icon" />
            <span className="nav-logo-text">DocuSign</span>
          </Link>
          
          {isAuthenticated && (
            <div className="nav-links">
              <Link
                to="/dashboard"
                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/documents"
                className={`nav-link ${isActive('/documents') ? 'active' : ''}`}
              >
                My Documents
              </Link>
              <Link
                to="/shared"
                className={`nav-link ${isActive('/shared') ? 'active' : ''}`}
              >
                Shared with Me
              </Link>
            </div>
          )}
        </div>
        
        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <button
                type="button"
                className="nav-button"
                aria-label="View notifications"
              >
                <Bell className="h-6 w-6" />
              </button>
              
              <div className="nav-user">
                <div className="user-avatar">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="user-avatar"
                    />
                  ) : (
                    <span>{user?.name.charAt(0)}</span>
                  )}
                </div>
                <div className="user-info">
                  <p className="user-name">{user?.name}</p>
                  <button
                    onClick={handleLogout}
                    className="logout-button"
                  >
                    <LogOut size={12} />
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline btn-sm">
                Sign in
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Sign up
              </Link>
            </div>
          )}
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="mobile-menu-button"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <div>
            <Link
              to="/dashboard"
              className={`mobile-nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link
              to="/documents"
              className={`mobile-nav-link ${isActive('/documents') ? 'active' : ''}`}
            >
              My Documents
            </Link>
            <Link
              to="/shared"
              className={`mobile-nav-link ${isActive('/shared') ? 'active' : ''}`}
            >
              Shared with Me
            </Link>
            <button
              onClick={handleLogout}
              className="mobile-nav-link"
            >
              Sign out
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className={`mobile-nav-link ${isActive('/login') ? 'active' : ''}`}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`mobile-nav-link ${isActive('/signup') ? 'active' : ''}`}
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;