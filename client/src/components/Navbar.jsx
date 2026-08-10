import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Job Search', path: '/job-search' },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white border-b sticky top-0 z-10">
      <div className="flex items-center gap-10">
        <span className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" fill="currentColor"/>
            </svg>
          </span>
          JobTrail
        </span>
        <div className="flex gap-8 text-sm">
          {links.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
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
      </div>
      <button
        onClick={() => { logout(); navigate('/login'); }}
        className="text-sm text-gray-500 hover:text-red-500 transition-colors font-medium"
      >
        Logout
      </button>
    </nav>
  );
}