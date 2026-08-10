import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Job Search', path: '/job-search' },
  ];

  const go = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-20">
      <div className="flex justify-between items-center px-4 md:px-8 py-4">
        <span className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/>
            </svg>
          </span>
          JobTrail
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`transition-colors font-medium ${
                location.pathname === link.path
                  ? 'text-indigo-600'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          className="hidden md:block text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
        >
          Logout
        </button>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-700" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col border-t px-4 py-3 gap-1">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`text-left py-2.5 font-medium ${
                location.pathname === link.path ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="text-left py-2.5 font-medium text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}