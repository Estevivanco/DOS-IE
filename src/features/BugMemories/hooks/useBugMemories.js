import { useState, useMemo } from 'react';

const INITIAL_BUGS = [
  {
    id: 1,
    problem: 'List renders twice',
    category: 'React / State',
    symptom: 'Duplicate items in UI',
    cause: 'State updated twice in same flow',
    fix: `// Removed duplicate setState call
setUsers(updatedUsers);
// NOT:
// setUsers(updatedUsers);
// setUsers([...updatedUsers]);`,
    howToAvoid: 'Centralize state updates in one function',
    whereItHappened: 'Group project – event update flow',
    language: 'javascript',
    severity: 'medium',
    relatedLinks: [
      { type: 'decision', id: 1, title: 'Use localStorage instead of backend' }
    ]
  },
  {
    id: 2,
    problem: 'Infinite loop in useEffect',
    category: 'React / Hooks',
    symptom: 'Browser freezes, component re-renders endlessly',
    cause: 'Missing dependency array or object/array in dependencies',
    fix: `// Wrong - causes infinite loop
useEffect(() => {
  setData(fetchedData);
}, [fetchedData]); // object reference changes

// Fixed
useEffect(() => {
  setData(fetchedData);
}, [fetchedData.id]); // use specific property`,
    howToAvoid: 'Always add dependency array, use primitive values when possible',
    whereItHappened: 'Dashboard data fetching',
    language: 'javascript',
    severity: 'high',
    relatedLinks: [
      { type: 'snippet', id: 1, title: 'Remove item from array' },
      { type: 'decision', id: 2, title: 'Context API vs Redux' }
    ]
  },
  {
    id: 3,
    problem: 'Async state not updating',
    category: 'JavaScript / Async',
    symptom: 'State shows old value in async function',
    cause: 'Closure captures old state value',
    fix: `// Wrong
const handleClick = async () => {
  await fetchData();
  console.log(count); // shows old value
};

// Fixed - use functional update
setCount(prevCount => prevCount + 1);`,
    howToAvoid: 'Use functional setState for async operations',
    whereItHappened: 'Counter with API calls',
    language: 'javascript',
    severity: 'medium'
  },
  {
    id: 4,
    problem: 'Memory leak - setState on unmounted component',
    category: 'React / Cleanup',
    symptom: 'Warning: Can\'t perform a React state update on unmounted component',
    cause: 'Async operation completes after component unmounts',
    fix: `useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);`,
    howToAvoid: 'Always cleanup async operations in useEffect return',
    whereItHappened: 'User profile page navigation',
    language: 'javascript',
    severity: 'high'
  },
  {
    id: 5,
    problem: 'Key prop not unique',
    category: 'React / Lists',
    symptom: 'List items update incorrectly, wrong item gets deleted',
    cause: 'Using array index as key',
    fix: `// Wrong
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// Fixed
{items.map((item) => (
  <div key={item.id}>{item.name}</div>
))}`,
    howToAvoid: 'Always use unique, stable IDs for keys',
    whereItHappened: 'Todo list component',
    language: 'javascript',
    severity: 'medium'
  },
  {
    id: 6,
    problem: 'CORS error in API call',
    category: 'API / Network',
    symptom: 'Access to fetch blocked by CORS policy',
    cause: 'Server not configured to allow cross-origin requests',
    fix: `// Backend fix (Express)
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Or proxy in package.json
"proxy": "http://localhost:5000"`,
    howToAvoid: 'Configure CORS on server, use proxy in development',
    whereItHappened: 'Authentication API integration',
    language: 'javascript',
    severity: 'high'
  },
  {
    id: 7,
    problem: 'Mutating state directly',
    category: 'React / State',
    symptom: 'Component doesn\'t re-render when state changes',
    cause: 'Modifying state object/array directly instead of creating new reference',
    fix: `// Wrong - mutates state
const addItem = (item) => {
  items.push(item);
  setItems(items); // React won't detect change
};

// Fixed - create new array
const addItem = (item) => {
  setItems([...items, item]);
};

// For objects
setUser({...user, name: 'New Name'});`,
    howToAvoid: 'Always create new array/object when updating state',
    whereItHappened: 'Shopping cart component',
    language: 'javascript',
    severity: 'high'
  },
  {
    id: 8,
    problem: 'Event handler called immediately',
    category: 'JavaScript / Events',
    symptom: 'Function executes on render instead of on click',
    cause: 'Calling function with () instead of passing function reference',
    fix: `// Wrong - calls immediately
<button onClick={handleClick()}>Click</button>

// Fixed - pass function reference
<button onClick={handleClick}>Click</button>

// If you need to pass arguments
<button onClick={() => handleClick(id)}>Click</button>`,
    howToAvoid: 'Pass function reference, use arrow function for arguments',
    whereItHappened: 'Delete button in user list',
    language: 'javascript',
    severity: 'low'
  },
  {
    id: 9,
    problem: 'Forgot to handle null/undefined',
    category: 'JavaScript / Type Safety',
    symptom: 'Cannot read property of undefined error',
    cause: 'Accessing nested property without checking if parent exists',
    fix: `// Wrong
const userName = user.profile.name; // crashes if user is null

// Fixed - optional chaining
const userName = user?.profile?.name;

// Or with default value
const userName = user?.profile?.name || 'Guest';

// For arrays
const firstItem = items?.[0];`,
    howToAvoid: 'Use optional chaining (?.) and provide defaults',
    whereItHappened: 'User profile display',
    language: 'javascript',
    severity: 'medium'
  },
  {
    id: 10,
    problem: 'Form submits and page refreshes',
    category: 'JavaScript / Forms',
    symptom: 'Page reloads when submitting form, losing all state',
    cause: 'Not preventing default form submission behavior',
    fix: `// Wrong
const handleSubmit = () => {
  submitData();
};

// Fixed
const handleSubmit = (e) => {
  e.preventDefault();
  submitData();
};

<form onSubmit={handleSubmit}>`,
    howToAvoid: 'Always call e.preventDefault() in form handlers',
    whereItHappened: 'Login form',
    language: 'javascript',
    severity: 'low'
  },
  {
    id: 11,
    problem: 'useState not updating immediately',
    category: 'React / State',
    symptom: 'State value is stale/old right after calling setState',
    cause: 'setState is async and batched. Reading state immediately after setting shows old value',
    fix: `// Wrong - count will be old value
const handleClick = () => {
  setCount(count + 1);
  console.log(count); // Still old value!
};

// Fixed - use functional update
const handleClick = () => {
  setCount(prev => {
    const newCount = prev + 1;
    console.log(newCount); // New value
    return newCount;
  });
};

// Or use useEffect to react to changes
useEffect(() => {
  console.log('Count changed:', count);
}, [count]);`,
    howToAvoid: 'Remember setState is async. Use functional updates or useEffect to access new values',
    whereItHappened: 'Counter component',
    language: 'react',
    severity: 'low'
  },
  {
    id: 12,
    problem: 'useEffect missing dependency',
    category: 'React / Hooks',
    symptom: 'Effect uses stale data, or runs with outdated values',
    cause: 'Effect depends on props/state not listed in dependency array',
    fix: `// Wrong - stale closure
useEffect(() => {
  fetchData(userId); // userId from props/state
}, []); // Missing userId!

// Fixed
useEffect(() => {
  fetchData(userId);
}, [userId]); // Include all dependencies

// Or disable the warning if intentional
useEffect(() => {
  fetchData(userId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Only run once on mount`,
    howToAvoid: 'Include all props/state used in effect. Use ESLint react-hooks plugin',
    whereItHappened: 'Data fetching in user profile',
    language: 'react',
    severity: 'medium'
  },
  {
    id: 13,
    problem: 'CSS z-index not working',
    category: 'CSS / Styling',
    symptom: 'Element with higher z-index still appears behind other elements',
    cause: 'z-index only works on positioned elements (not position: static)',
    fix: `/* Wrong */
.modal {
  z-index: 9999; /* Doesn't work! */
}

/* Fixed - add position */
.modal {
  position: relative; /* or absolute, fixed, sticky */
  z-index: 9999; /* Now it works! */
}

/* Common fix for modals */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}`,
    howToAvoid: 'Remember: z-index requires position: relative/absolute/fixed/sticky',
    whereItHappened: 'Modal overlay',
    language: 'css',
    severity: 'low'
  },
  {
    id: 14,
    problem: '.env variables not loading',
    category: 'Config / Vite',
    symptom: 'Environment variables are undefined or not accessible',
    cause: 'In Vite, env variables must be prefixed with VITE_',
    fix: `// Wrong - .env file
API_KEY=abc123 // Won't work!

// Fixed - .env file
VITE_API_KEY=abc123 // Works!

// Access in code
const apiKey = import.meta.env.VITE_API_KEY;

// Not process.env! That's Node.js
// Wrong
const key = process.env.API_KEY; // undefined in Vite

// Right
const key = import.meta.env.VITE_API_KEY;`,
    howToAvoid: 'Vite requires VITE_ prefix. Restart dev server after changing .env',
    whereItHappened: 'API configuration',
    language: 'javascript',
    severity: 'medium'
  },
  {
    id: 15,
    problem: 'Missing key in .map()',
    category: 'React / Lists',
    symptom: 'Console warning: "Each child in a list should have a unique key prop"',
    cause: 'React needs unique keys to track list items for efficient updates',
    fix: `// Wrong
{items.map(item => (
  <div>{item.name}</div> // No key!
))}

// Wrong - using index as key (bad for dynamic lists)
{items.map((item, index) => (
  <div key={index}>{item.name}</div>
))}

// Fixed - use unique ID
{items.map(item => (
  <div key={item.id}>{item.name}</div>
))}

// If no ID, combine stable values
{items.map(item => (
  <div key={\`\${item.type}-\${item.name}\`}>
    {item.name}
  </div>
))}`,
    howToAvoid: 'Always use unique, stable IDs as keys. Never use array index for dynamic lists',
    whereItHappened: 'User list rendering',
    language: 'react',
    severity: 'low'
  },
  {
    id: 16,
    problem: 'Debounce race condition',
    category: 'React / Async',
    symptom: 'Search results from old query appear after newer results',
    cause: 'Multiple debounced requests in flight, older one returns last',
    fix: `// Wrong - race condition possible
const debouncedSearch = useDebounce(searchTerm, 500);

useEffect(() => {
  fetchResults(debouncedSearch).then(setResults);
}, [debouncedSearch]);

// Fixed - cancel previous requests
useEffect(() => {
  let isCancelled = false;
  
  fetchResults(debouncedSearch).then(results => {
    if (!isCancelled) {
      setResults(results);
    }
  });
  
  return () => {
    isCancelled = true;
  };
}, [debouncedSearch]);

// Better - use AbortController
useEffect(() => {
  const controller = new AbortController();
  
  fetch('/api/search?q=' + debouncedSearch, {
    signal: controller.signal
  })
    .then(r => r.json())
    .then(setResults)
    .catch(err => {
      if (err.name !== 'AbortError') throw err;
    });
  
  return () => controller.abort();
}, [debouncedSearch]);`,
    howToAvoid: 'Always cleanup async operations in useEffect. Use AbortController for fetch requests',
    whereItHappened: 'Search component with debounced input',
    language: 'react',
    severity: 'medium',
    relatedLinks: [
      { type: 'snippet', id: 9, title: 'Debounce Hook' },
      { type: 'snippet', id: 4, title: 'Async Fetch API' }
    ]
  },
  {
    id: 17,
    problem: 'localStorage quota exceeded',
    category: 'Storage / Browser',
    symptom: 'QuotaExceededError thrown when saving to localStorage',
    cause: 'localStorage has ~5-10MB limit. Storing large data or not clearing old data',
    fix: `// Wrong - no error handling
const saveData = (data) => {
  localStorage.setItem('key', JSON.stringify(data)); // Can throw!
};

// Fixed - with error handling
const saveData = (data) => {
  try {
    localStorage.setItem('key', JSON.stringify(data));
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      // Clear old data or show message
      console.error('Storage quota exceeded');
      // Optional: clear old entries
      localStorage.clear();
    }
  }
};

// Check available space
const checkStorageSpace = () => {
  if ('storage' in navigator && 'estimate' in navigator.storage) {
    navigator.storage.estimate().then(estimate => {
      const percentUsed = (estimate.usage / estimate.quota) * 100;
      console.log('Storage used:', percentUsed.toFixed(2) + '%');
    });
  }
};

// Implement size limit
const MAX_SIZE = 1024 * 1024; // 1MB
if (JSON.stringify(data).length > MAX_SIZE) {
  console.error('Data too large for localStorage');
}`,
    howToAvoid: 'Wrap localStorage calls in try/catch. Monitor storage size. Consider IndexedDB for large data',
    whereItHappened: 'Caching API responses in localStorage',
    language: 'javascript',
    severity: 'medium',
    relatedLinks: [
      { type: 'snippet', id: 10, title: 'Local Storage Hook' },
      { type: 'decision', id: 1, title: 'Use localStorage instead of backend' }
    ]
  },
  {
    id: 18,
    problem: 'Date parsing timezone issues',
    category: 'JavaScript / Dates',
    symptom: 'Dates showing wrong day or time, off by several hours',
    cause: 'Date strings parsed as UTC but displayed in local timezone',
    fix: `// Problem: "2024-12-25" parsed as UTC midnight, shows Dec 24 in some timezones
const date = new Date('2024-12-25'); // Don't do this!

// Fixed - specify time or use UTC methods
const date1 = new Date('2024-12-25T00:00:00'); // Local midnight
const date2 = new Date('2024-12-25T00:00:00Z'); // UTC midnight

// For date-only (no time), use this:
const dateParts = '2024-12-25'.split('-');
const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

// Or use a library
import { parseISO, format } from 'date-fns';
const date = parseISO('2024-12-25');

// Always format consistently
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // Specify timezone!
  });
};`,
    howToAvoid: 'Be explicit about timezones. Use date libraries (date-fns, dayjs). Store dates as ISO strings',
    whereItHappened: 'Event calendar date display',
    language: 'javascript',
    severity: 'medium',
    relatedLinks: [
      { type: 'snippet', id: 11, title: 'Format Date/Time' }
    ]
  },
  {
    id: 19,
    problem: 'Array mutation during sort',
    category: 'JavaScript / Arrays',
    symptom: 'Original array gets modified, causing unexpected re-renders',
    cause: 'Array.sort() mutates the original array in place',
    fix: `// Wrong - mutates original array
const sortUsers = (users) => {
  return users.sort((a, b) => a.name.localeCompare(b.name));
  // users array is now changed!
};

// Fixed - create copy first
const sortUsers = (users) => {
  return [...users].sort((a, b) => a.name.localeCompare(b.name));
};

// Or use Array.toSorted() (newer browsers)
const sortUsers = (users) => {
  return users.toSorted((a, b) => a.name.localeCompare(b.name));
};

// In React state
const handleSort = () => {
  // Wrong
  const sorted = users.sort((a, b) => a.age - b.age);
  setUsers(sorted); // React won't detect change!
  
  // Fixed
  const sorted = [...users].sort((a, b) => a.age - b.age);
  setUsers(sorted); // New reference, React detects change
};`,
    howToAvoid: 'Always spread array before sorting: [...arr].sort(). Never mutate state directly',
    whereItHappened: 'User list sorting feature',
    language: 'javascript',
    severity: 'medium',
    relatedLinks: [
      { type: 'snippet', id: 12, title: 'Sort Array of Objects' },
      { type: 'bug', id: 7, title: 'Mutating state directly' }
    ]
  },
  {
    id: 20,
    problem: 'Controlled input warning',
    category: 'React / Forms',
    symptom: 'Warning: component is changing from uncontrolled to controlled',
    cause: 'Input value starts as undefined/null then becomes a string',
    fix: `// Wrong - value can be undefined
const [name, setName] = useState();
<input value={name} onChange={e => setName(e.target.value)} />
// Initially undefined, then string = uncontrolled -> controlled

// Fixed - initialize with empty string
const [name, setName] = useState('');
<input value={name} onChange={e => setName(e.target.value)} />

// For object state
const [formData, setFormData] = useState({
  name: '',  // NOT undefined!
  email: '', // Always initialize strings
  age: 0     // Numbers can be 0
});

// When loading from API
const [user, setUser] = useState({ name: '', email: '' });
useEffect(() => {
  fetchUser().then(data => setUser(data));
}, []);

// Or use default value
<input 
  value={formData.name || ''} 
  onChange={handleChange} 
/>`,
    howToAvoid: 'Always initialize controlled inputs with a value (empty string for text, 0 for numbers)',
    whereItHappened: 'Form with dynamic initial values',
    language: 'react',
    severity: 'low',
    relatedLinks: [
      { type: 'snippet', id: 15, title: 'Form Input Handler' },
      { type: 'snippet', id: 7, title: 'Select Dropdown - Check Correct Value' }
    ]
  }
];

export function useBugMemories() {
  const [bugs, setBugs] = useState(INITIAL_BUGS);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredBugs = useMemo(() => {
    return bugs.filter(bug => {
      const matchesText = 
        bug.problem.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.symptom.toLowerCase().includes(filterText.toLowerCase()) ||
        bug.cause.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || bug.category.includes(filterCategory);
      const matchesSeverity = filterSeverity === 'all' || bug.severity === filterSeverity;
      
      return matchesText && matchesCategory && matchesSeverity;
    });
  }, [bugs, filterText, filterCategory, filterSeverity]);

  const addBug = (bug) => {
    const newBug = { ...bug, id: Date.now(), relatedLinks: [] };
    setBugs([...bugs, newBug]);
  };

  const removeBug = (id) => {
    setBugs(bugs.filter(b => b.id !== id));
  };

  const updateBug = (id, updatedData) => {
    setBugs(bugs.map(bug => 
      bug.id === id ? { ...bug, ...updatedData } : bug
    ));
  };

  const addLink = (bugId, link) => {
    setBugs(bugs.map(bug => {
      if (bug.id === bugId) {
        const relatedLinks = bug.relatedLinks || [];
        return { ...bug, relatedLinks: [...relatedLinks, link] };
      }
      return bug;
    }));
  };

  const removeLink = (bugId, linkToRemove) => {
    setBugs(bugs.map(bug => {
      if (bug.id === bugId) {
        const relatedLinks = bug.relatedLinks || [];
        return {
          ...bug,
          relatedLinks: relatedLinks.filter(
            link => !(link.id === linkToRemove.id && link.type === linkToRemove.type)
          )
        };
      }
      return bug;
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return {
    bugs,
    filteredBugs,
    filterText,
    filterCategory,
    filterSeverity,
    setFilterText,
    setFilterCategory,
    setFilterSeverity,
    addBug,
    removeBug,
    updateBug,
    addLink,
    removeLink,
    copyToClipboard,
  };
}
