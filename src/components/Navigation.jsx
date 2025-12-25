import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const navItems = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'Snippets', path: '/snippets', icon: '📝' },
    { name: 'Bugs', path: '/bugs', icon: '🐛' },
    { name: 'Bootstrap', path: '/bootstrap', icon: '🚀' },
    { name: 'Decisions', path: '/decisions', icon: '💡' },
    { name: 'Git', path: '/git', icon: '⚡' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-gradient">DOS-IE</span>
        </Link>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <button 
          onClick={toggleDarkMode} 
          className="theme-toggle"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
}
