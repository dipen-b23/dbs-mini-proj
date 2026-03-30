import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const linkClasses = (path) => `
    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
    ${isActive(path)
      ? 'bg-indigo-500/10 text-indigo-400'
      : 'text-slate-300 hover:text-white hover:bg-white/10'}
  `;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <span className="text-lg">⚡</span>
          </div>
          <span className="text-lg font-bold text-white hidden sm:inline">Eventify</span>
        </Link>

        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl">
          {user && (
            <>
              <Link to="/dashboard" className={linkClasses('/dashboard')}>Dashboard</Link>
              <Link to="/events" className={linkClasses('/events')}>Events</Link>
              {user.ROLE_ID === 1 && <Link to="/admin" className={linkClasses('/admin')}>Admin</Link>}
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="text-right hidden sm:block">
                <p className="text-white text-sm font-semibold">{user.NAME}</p>
                <p className="text-slate-400 text-xs">{user.EMAIL}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-lg text-sm font-medium transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all">
              Login
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;