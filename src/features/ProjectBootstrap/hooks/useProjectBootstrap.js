import { useState } from 'react';

const PROJECT_TEMPLATES = [
  {
    id: 1,
    name: 'React Frontend with API',
    type: 'React',
    description: 'Full-featured React app with API integration',
    config: {
      auth: false,
      api: true,
      storage: 'localStorage',
      styling: 'CSS Modules',
      stateManagement: 'React Hooks',
    },
    relatedLinks: [
      { id: 1, type: 'snippet', title: 'Remove duplicates from list' },
      { id: 1, type: 'decision', title: 'Used conventional commits for better history' }
    ],
    structure: {
      'src/': {
        'components/': ['ErrorMessage.jsx', 'LoadingSpinner.jsx', 'Button.jsx'],
        'hooks/': ['useLocalStorage.js', 'useFetch.js'],
        'utils/': ['fetcher.js', 'helpers.js'],
        'pages/': ['Home.jsx', 'About.jsx'],
        'services/': ['api.js'],
        'styles/': ['global.css', 'variables.css'],
        'App.jsx': null,
        'main.jsx': null,
      }
    },
    files: {
      'useLocalStorage.js': `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}`,
      'fetcher.js': `const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetcher(endpoint, options = {}) {
  const response = await fetch(\`\${API_BASE_URL}\${endpoint}\`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }

  return response.json();
}`,
      'ErrorMessage.jsx': `export default function ErrorMessage({ error }) {
  if (!error) return null;
  
  return (
    <div className="error-message">
      <p>{error}</p>
    </div>
  );
}`,
      'LoadingSpinner.jsx': `export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
}`
    },
    readme: {
      decisions: [
        'Using CSS Modules for component-scoped styling',
        'localStorage for client-side data persistence',
        'Custom hooks for reusable logic',
        'Centralized API service layer',
      ],
      limitations: [
        'No authentication system included',
        'Basic error handling only',
        'No state management library (using React hooks)',
      ],
      setup: [
        'npm install',
        'Create .env file with VITE_API_URL',
        'npm run dev',
      ]
    }
  },
  {
    id: 2,
    name: 'React + Auth + Firebase',
    type: 'React',
    description: 'React app with Firebase authentication',
    config: {
      auth: true,
      api: false,
      storage: 'Firebase',
      styling: 'CSS',
      stateManagement: 'Context API',
    },
    relatedLinks: [
      { id: 2, type: 'bug', title: 'Infinite loop in useEffect' }
    ],
    structure: {
      'src/': {
        'components/': ['ProtectedRoute.jsx', 'LoginForm.jsx', 'Navbar.jsx'],
        'contexts/': ['AuthContext.jsx'],
        'hooks/': ['useAuth.js'],
        'pages/': ['Login.jsx', 'Dashboard.jsx', 'Profile.jsx'],
        'services/': ['firebase.js'],
        'App.jsx': null,
      }
    },
    files: {
      'AuthContext.jsx': `import { createContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}`,
      'useAuth.js': `import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}`,
      'ProtectedRoute.jsx': `import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;

  return children;
}`
    },
    readme: {
      decisions: [
        'Firebase for authentication and backend',
        'Context API for global auth state',
        'Protected routes pattern',
        'Environment variables for Firebase config',
      ],
      limitations: [
        'Firebase free tier limits apply',
        'No offline support',
        'Basic role-based access only',
      ],
      setup: [
        'npm install firebase',
        'Create Firebase project at console.firebase.google.com',
        'Add Firebase config to .env',
        'npm run dev',
      ]
    }
  },
  {
    id: 3,
    name: 'Minimal React Starter',
    type: 'React',
    description: 'Lightweight React starter with essentials only',
    config: {
      auth: false,
      api: false,
      storage: 'none',
      styling: 'CSS',
      stateManagement: 'useState',
    },
    structure: {
      'src/': {
        'components/': ['Header.jsx', 'Footer.jsx'],
        'pages/': ['Home.jsx'],
        'App.jsx': null,
        'App.css': null,
      }
    },
    files: {
      'Header.jsx': `export default function Header() {
  return (
    <header>
      <h1>My App</h1>
      <nav>
        <a href="/">Home</a>
      </nav>
    </header>
  );
}`,
      'Footer.jsx': `export default function Footer() {
  return (
    <footer>
      <p>&copy; 2025 My App</p>
    </footer>
  );
}`
    },
    readme: {
      decisions: [
        'Minimal dependencies for fast learning',
        'Pure CSS for styling',
        'Component-based architecture',
      ],
      limitations: [
        'No routing included',
        'No state management library',
        'No API integration',
      ],
      setup: [
        'npm install',
        'npm run dev',
      ]
    }
  },
  {
    id: 4,
    name: 'Full Stack Template',
    type: 'React',
    description: 'React frontend ready for backend integration',
    config: {
      auth: true,
      api: true,
      storage: 'localStorage + API',
      styling: 'CSS Modules',
      stateManagement: 'Context + Hooks',
    },
    structure: {
      'src/': {
        'components/': ['Layout.jsx', 'PrivateRoute.jsx', 'ErrorBoundary.jsx'],
        'contexts/': ['AuthContext.jsx', 'DataContext.jsx'],
        'hooks/': ['useApi.js', 'useLocalStorage.js', 'useAuth.js'],
        'pages/': ['Login.jsx', 'Dashboard.jsx', 'Settings.jsx'],
        'services/': ['api.js', 'auth.js'],
        'utils/': ['validators.js', 'formatters.js'],
        'App.jsx': null,
      }
    },
    files: {
      'useApi.js': `import { useState, useEffect } from 'react';

export function useApi(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}`,
      'ErrorBoundary.jsx': `import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong.</h2>;
    }
    return this.props.children;
  }
}`
    },
    readme: {
      decisions: [
        'Hybrid storage: localStorage for cache, API for source of truth',
        'Context API for global state management',
        'Error boundaries for graceful error handling',
        'Custom hooks for API interactions',
      ],
      limitations: [
        'Requires backend API to be running',
        'Token refresh not implemented',
        'No WebSocket support',
      ],
      setup: [
        'npm install',
        'Configure API_URL in .env',
        'Ensure backend is running',
        'npm run dev',
      ]
    }
  }
];

export function useProjectBootstrap() {
  const [templates, setTemplates] = useState(PROJECT_TEMPLATES);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [filterType, setFilterType] = useState('all');

  const filteredTemplates = templates.filter(template => 
    filterType === 'all' || template.type === filterType
  );

  const selectTemplate = (id) => {
    const template = templates.find(t => t.id === id);
    setSelectedTemplate(template);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const addLink = (templateId, linkItem) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId) {
        const relatedLinks = template.relatedLinks || [];
        // Prevent duplicates
        if (!relatedLinks.find(link => link.id === linkItem.id && link.type === linkItem.type)) {
          return { ...template, relatedLinks: [...relatedLinks, linkItem] };
        }
      }
      return template;
    }));
  };

  const removeLink = (templateId, linkToRemove) => {
    setTemplates(templates.map(template => {
      if (template.id === templateId && template.relatedLinks) {
        return {
          ...template,
          relatedLinks: template.relatedLinks.filter(
            link => !(link.id === linkToRemove.id && link.type === linkToRemove.type)
          )
        };
      }
      return template;
    }));
  };

  return {
    templates: filteredTemplates,
    allTemplates: templates,
    selectedTemplate,
    filterType,
    setFilterType,
    selectTemplate,
    copyToClipboard,
    addLink,
    removeLink,
  };
}
