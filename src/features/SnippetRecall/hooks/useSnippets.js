import { useState, useMemo } from 'react';

const INITIAL_SNIPPETS = [
    {
        id: 1,
        title: 'Remove from List',
        language: 'javascript',
        code: `// Remove item from array by id
const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
};

// Remove multiple items
const removeMultiple = (idsToRemove) => {
    setItems(items.filter(item => !idsToRemove.includes(item.id)));
};`,
        relatedLinks: [
            { type: 'bug', id: 2, title: 'Infinite loop in useEffect' }
        ]
    },
    {
        id: 2,
        title: 'Edit/Update List Item',
        language: 'javascript',
        code: `// Update single item in array
const updateItem = (id, updatedData) => {
    setItems(items.map(item => 
        item.id === id ? { ...item, ...updatedData } : item
    ));
};

// Example usage
updateItem(5, { name: 'New Name', status: 'active' });`
    },
    {
        id: 3,
        title: 'Find Something in List',
        language: 'javascript',
        code: `// Find by ID
const item = items.find(item => item.id === 5);

// Find by condition
const activeItems = items.filter(item => item.status === 'active');

// Find with complex condition
const result = items.find(item => 
    item.name.includes('search') && item.count > 10
);`
    },
    {
        id: 4,
        title: 'Async Fetch API',
        language: 'javascript',
        code: `// Fetch data from API
const fetchData = async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error('Error:', error);
    }
};`
    },
    {
        id: 5,
        title: 'Promise.all Fetch Multiple',
        language: 'javascript',
        code: `// Fetch multiple endpoints in parallel
const fetchMultiple = async () => {
    const urls = [
        'https://api.example.com/users',
        'https://api.example.com/posts',
        'https://api.example.com/comments'
    ];

    const promises = urls.map(url => fetch(url)
    .then(r => r.json()));
    
    const [users, posts, comments] = await Promise.all(promises);
    
    return { users, posts, comments };
};`
    },
    {
        id: 6,
        title: 'Array Filter Example',
        language: 'javascript',
        code: `// Filter even numbers
const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// [2, 4, 6]

// Filter by property value
const users = [
    { name: 'John', age: 25, active: true },
    { name: 'Jane', age: 30, active: false },
    { name: 'Bob', age: 35, active: true }
];

const activeUsers = users.filter(user => user.active);
// [{ name: 'John', ... }, { name: 'Bob', ... }]

// Filter by age range
const adults = users.filter(user => user.age >= 18 && user.age < 65);

// Filter by string match
const products = ['Apple', 'Banana', 'Apricot', 'Orange'];
const startsWithA = products.filter(p => p.startsWith('A'));
// ['Apple', 'Apricot']

const containsAn = products.filter(p => p.toLowerCase().includes('an'));
// ['Banana', 'Orange']

// Filter truthy values
const mixed = [0, 1, false, 2, '', 3, null, undefined, 4];
const truthyOnly = mixed.filter(Boolean);
// [1, 2, 3, 4]

// Filter unique values (remove duplicates)
const duplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = duplicates.filter((value, index, array) => 
    array.indexOf(value) === index
);
// [1, 2, 3, 4, 5]

// Filter with multiple conditions
const items = [
    { name: 'Item 1', price: 50, inStock: true },
    { name: 'Item 2', price: 150, inStock: false },
    { name: 'Item 3', price: 75, inStock: true }
];

const affordable = items.filter(item => 
    item.price < 100 && item.inStock
);
// [{ name: 'Item 1', ... }, { name: 'Item 3', ... }]

// Filter out null/undefined
const data = [1, null, 2, undefined, 3, null, 4];
const clean = data.filter(val => val != null);
// [1, 2, 3, 4]`
    },
    {
        id: 7,
        title: 'Select Dropdown - Check Correct Value',
        language: 'javascript',
        code: `// Set selected value from state
const [selectedValue, setSelectedValue] = useState('option2');

<select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)}>
    <option value="option1">Option 1</option>
    <option value="option2">Option 2</option>
    <option value="option3">Option 3</option>
</select>

// Check if specific option is selected
const isOption2Selected = selectedValue === 'option2';

// Pre-select based on data
const user = { role: 'admin' };
<select value={user.role} onChange={handleChange}>
    <option value="user">User</option>
    <option value="admin">Admin</option>
</select>`,
        relatedLinks: [
            { type: 'bug', id: 20, title: 'Controlled input warning' }
        ]
    },
    {
        id: 8,
        title: 'Capitalize First Letter',
        language: 'javascript',
        code: `// Capitalize first letter of a string
const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Example with API data
const user = { name: 'john' };
const displayName = capitalize(user.name); // "John"

// Capitalize first letter of each word
const capitalizeWords = (str) => {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

capitalizeWords('john doe'); // "John Doe"`
    },
    {
        id: 9,
        title: 'Debounce Hook',
        language: 'react',
        code: `import { useState, useEffect } from 'react';

// Custom debounce hook
export function useDebounce(value, delay = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Usage example
function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        if (debouncedSearchTerm) {
            // Make API call with debounced value
            fetchResults(debouncedSearchTerm);
        }
    }, [debouncedSearchTerm]);

    return (
        <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
        />
    );
}`,
        relatedLinks: [
            { type: 'bug', id: 16, title: 'Debounce race condition' }
        ]
    },
    {
        id: 10,
        title: 'Local Storage Hook',
        language: 'react',
        code: `import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // Get from local storage or use initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Update local storage when value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}

// Usage
function App() {
    const [name, setName] = useLocalStorage('name', 'John');
    const [settings, setSettings] = useLocalStorage('settings', {
        theme: 'dark',
        notifications: true
    });
}`,
        relatedLinks: [
            { type: 'bug', id: 17, title: 'localStorage quota exceeded' }
        ]
    },
    {
        id: 11,
        title: 'Format Date/Time',
        language: 'javascript',
        code: `// Format date to readable string
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Format with time
const formatDateTime = (date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Relative time (e.g., "2 hours ago")
const getRelativeTime = (date) => {
    const now = new Date();
    const then = new Date(date);
    const seconds = Math.floor((now - then) / 1000);
    
    if (seconds < 60) return 'just now';
    if (seconds < 3600) return \`\${Math.floor(seconds / 60)} minutes ago\`;
    if (seconds < 86400) return \`\${Math.floor(seconds / 3600)} hours ago\`;
    return \`\${Math.floor(seconds / 86400)} days ago\`;
};

// Examples
formatDate('2024-12-24'); // "December 24, 2024"
formatDateTime(new Date()); // "Dec 24, 2024, 10:30 AM"
getRelativeTime(Date.now() - 3600000); // "1 hours ago"`,
        relatedLinks: [
            { type: 'bug', id: 18, title: 'Date parsing timezone issues' }
        ]
    },
    {
        id: 12,
        title: 'Sort Array of Objects',
        language: 'javascript',
        code: `// Sort by string property
const sortByName = (items) => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
};

// Sort by number property
const sortByAge = (items) => {
    return [...items].sort((a, b) => a.age - b.age);
};

// Sort by date
const sortByDate = (items) => {
    return [...items].sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Dynamic sort by property
const sortBy = (items, property, direction = 'asc') => {
    return [...items].sort((a, b) => {
        if (direction === 'asc') {
            return a[property] > b[property] ? 1 : -1;
        } else {
            return a[property] < b[property] ? 1 : -1;
        }
    });
};

// Multi-level sort
const users = [
    { name: 'John', age: 30, role: 'admin' },
    { name: 'Jane', age: 25, role: 'user' },
];

const sorted = users.sort((a, b) => {
    if (a.role !== b.role) return a.role.localeCompare(b.role);
    return a.age - b.age;
});`,
        relatedLinks: [
            { type: 'bug', id: 19, title: 'Array mutation during sort' }
        ]
    },
    {
        id: 13,
        title: 'Group Array By Property',
        language: 'javascript',
        code: `// Group array of objects by a property
const groupBy = (array, key) => {
    return array.reduce((result, item) => {
        const group = item[key];
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});
};

// Example usage
const users = [
    { name: 'John', role: 'admin', age: 30 },
    { name: 'Jane', role: 'user', age: 25 },
    { name: 'Bob', role: 'admin', age: 35 },
    { name: 'Alice', role: 'user', age: 28 }
];

const grouped = groupBy(users, 'role');
// Result:
// {
//   admin: [{ name: 'John', ... }, { name: 'Bob', ... }],
//   user: [{ name: 'Jane', ... }, { name: 'Alice', ... }]
// }

// Group with custom key function
const groupByAgeRange = (users) => {
    return users.reduce((result, user) => {
        const range = user.age < 30 ? 'young' : 'senior';
        if (!result[range]) result[range] = [];
        result[range].push(user);
        return result;
    }, {});
};`
    },
    {
        id: 14,
        title: 'Merge/Combine Objects',
        language: 'javascript',
        code: `// Shallow merge
const obj1 = { a: 1, b: 2 };
const obj2 = { b: 3, c: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 3, c: 4 }

// Merge with Object.assign
const result = Object.assign({}, obj1, obj2);

// Deep merge (nested objects)
const deepMerge = (target, source) => {
    const output = { ...target };
    if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach(key => {
            if (isObject(source[key])) {
                if (!(key in target)) {
                    output[key] = source[key];
                } else {
                    output[key] = deepMerge(target[key], source[key]);
                }
            } else {
                output[key] = source[key];
            }
        });
    }
    return output;
};

const isObject = (item) => {
    return item && typeof item === 'object' && !Array.isArray(item);
};

// Usage
const defaults = { theme: 'dark', layout: { sidebar: true, width: 300 } };
const userSettings = { layout: { width: 400 } };
const settings = deepMerge(defaults, userSettings);
// { theme: 'dark', layout: { sidebar: true, width: 400 } }`
    },
    {
        id: 15,
        title: 'Form Input Handler',
        language: 'javascript',
        code: `import { useState } from 'react';

// Simple form state management
function FormComponent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        terms: false
    });

    // Generic handler for all inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
            <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            <label>
                <input
                    name="terms"
                    type="checkbox"
                    checked={formData.terms}
                    onChange={handleChange}
                />
                I agree to terms
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}`,
        relatedLinks: [
            { type: 'bug', id: 20, title: 'Controlled input warning' }
        ]
    },
    {
        id: 16,
        title: 'Try/Catch Error Handling',
        language: 'javascript',
        code: `// Basic async error handling
const fetchData = async () => {
    try {
        const response = await fetch('/api/data');
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw or handle
    }
};

// With loading and error state
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
        const result = await fetchData();
        setData(result);
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
};

// Multiple operations with error handling
const performOperations = async () => {
    const results = [];
    const errors = [];
    
    for (const item of items) {
        try {
            const result = await processItem(item);
            results.push(result);
        } catch (error) {
            errors.push({ item, error: error.message });
        }
    }
    
    return { results, errors };
};`
    },
    {
        id: 17,
        title: 'Toggle Boolean State',
        language: 'javascript',
        code: `import { useState } from 'react';

// Simple toggle
const [isOpen, setIsOpen] = useState(false);
const toggle = () => setIsOpen(!isOpen);

// Or using functional update
const toggle = () => setIsOpen(prev => !prev);

// Multiple toggles
const [state, setState] = useState({
    showModal: false,
    showSidebar: true,
    darkMode: false
});

const toggleModal = () => {
    setState(prev => ({ ...prev, showModal: !prev.showModal }));
};

const toggleSidebar = () => {
    setState(prev => ({ ...prev, showSidebar: !prev.showSidebar }));
};

// Generic toggle function
const toggleKey = (key) => {
    setState(prev => ({ ...prev, [key]: !prev[key] }));
};

// Usage
<button onClick={() => toggleKey('darkMode')}>
    Toggle Dark Mode
</button>

// Custom toggle hook
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue(prev => !prev);
    return [value, toggle, setValue];
}

// Usage
const [isVisible, toggleVisible, setIsVisible] = useToggle(false);`
    },
    {
        id: 18,
        title: 'Conditional Rendering Patterns',
        language: 'javascript',
        code: `// If/else rendering
function Component({ user }) {
    if (!user) {
        return <div>Please log in</div>;
    }
    return <div>Welcome, {user.name}</div>;
}

// Ternary operator
{isLoading ? <Spinner /> : <Content />}

// Logical AND
{isLoggedIn && <Dashboard />}
{error && <ErrorMessage error={error} />}

// Multiple conditions
{status === 'loading' && <Spinner />}
{status === 'error' && <Error />}
{status === 'success' && <Data />}

// Switch-like with object
const statusComponents = {
    loading: <Spinner />,
    error: <Error />,
    success: <Data />
};
return statusComponents[status] || <div>Unknown status</div>;

// Conditional props
<Button 
    disabled={!isValid}
    className={isActive ? 'active' : 'inactive'}
    style={{ display: isVisible ? 'block' : 'none' }}
>
    Submit
</Button>

// Conditional class names
const className = \`button \${isPrimary ? 'primary' : 'secondary'} \${isDisabled ? 'disabled' : ''}\`;

// Multiple conditions with arrays
{[
    isAdmin && <AdminPanel key="admin" />,
    hasNotifications && <Notifications key="notif" />,
    showHelp && <HelpButton key="help" />
].filter(Boolean)}`
    },
    {
        id: 19,
        title: 'Map Array to JSX',
        language: 'javascript',
        code: `// Basic map
const items = ['Apple', 'Banana', 'Orange'];
<ul>
    {items.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
</ul>

// Map with object data
const users = [
    { id: 1, name: 'John', role: 'admin' },
    { id: 2, name: 'Jane', role: 'user' }
];

<div>
    {users.map(user => (
        <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>{user.role}</p>
        </div>
    ))}
</div>

// Map with index and conditional rendering
{items.map((item, index) => (
    <div key={item.id}>
        {index === 0 && <h3>First Item</h3>}
        <span>{item.name}</span>
        {index < items.length - 1 && <hr />}
    </div>
))}

// Map with filtering
{users
    .filter(user => user.role === 'admin')
    .map(user => (
        <AdminCard key={user.id} user={user} />
    ))
}

// Empty state with map
{items.length > 0 ? (
    items.map(item => <Item key={item.id} data={item} />)
) : (
    <div>No items found</div>
)}

// Map with grouping
{Object.entries(groupedData).map(([category, items]) => (
    <div key={category}>
        <h2>{category}</h2>
        {items.map(item => <Item key={item.id} data={item} />)}
    </div>
))}`
    },
    {
        id: 20,
        title: 'useEffect Patterns',
        language: 'react',
        code: `import { useEffect, useState } from 'react';

// Basic effect on mount
useEffect(() => {
    console.log('Component mounted');
}, []); // Empty array = run once on mount

// Effect with cleanup
useEffect(() => {
    const timer = setTimeout(() => {
        console.log('Delayed action');
    }, 1000);
    
    // Cleanup function
    return () => clearTimeout(timer);
}, []);

// Effect with dependencies
useEffect(() => {
    if (userId) {
        fetchUserData(userId);
    }
}, [userId]); // Re-run when userId changes

// Async effect pattern
useEffect(() => {
    let isMounted = true;
    
    const loadData = async () => {
        try {
            const data = await fetchData();
            if (isMounted) {
                setData(data);
            }
        } catch (error) {
            if (isMounted) {
                setError(error);
            }
        }
    };
    
    loadData();
    
    return () => {
        isMounted = false; // Prevent state updates after unmount
    };
}, []);

// Window event listener with cleanup
useEffect(() => {
    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('resize', handleResize);
    };
}, []);`
    },
    {
        id: 21,
        title: 'useMemo & useCallback',
        language: 'react',
        code: `import { useMemo, useCallback, useState } from 'react';

// useMemo - memorize expensive calculations
function Component({ items }) {
    const expensiveValue = useMemo(() => {
        // Only recalculates when items changes
        return items
            .filter(item => item.active)
            .reduce((sum, item) => sum + item.value, 0);
    }, [items]);

    return <div>Total: {expensiveValue}</div>;
}

// useCallback - memoize function references
function Parent() {
    const [count, setCount] = useState(0);
    
    // Without useCallback, this creates new function on every render
    // With useCallback, same function reference unless dependencies change
    const handleClick = useCallback(() => {
        setCount(prev => prev + 1);
    }, []); // No dependencies = same function always
    
    return <ChildComponent onClick={handleClick} />;
}

// When to use each:
// useMemo - expensive calculations, derived data
// useCallback - passing callbacks to optimized child components

// Sorting example with useMemo
const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => a.name.localeCompare(b.name));
}, [items]);

// Filter + map with useMemo
const filteredAndMapped = useMemo(() => {
    return items
        .filter(item => item.status === 'active')
        .map(item => ({ ...item, label: item.name.toUpperCase() }));
}, [items]);`
    },
    {
        id: 22,
        title: 'useRef Patterns',
        language: 'react',
        code: `import { useRef, useEffect } from 'react';

// Focus input on mount
function SearchInput() {
    const inputRef = useRef(null);
    
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    
    return <input ref={inputRef} placeholder="Search..." />;
}

// Store previous value
function usePrevious(value) {
    const ref = useRef();
    
    useEffect(() => {
        ref.current = value;
    }, [value]);
    
    return ref.current;
}

// Usage
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);
// prevCount will be the previous value of count

// Direct DOM manipulation
function ScrollToTop() {
    const containerRef = useRef(null);
    
    const scrollToTop = () => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    return (
        <div ref={containerRef}>
            <button onClick={scrollToTop}>Scroll to Top</button>
        </div>
    );
}

// Store mutable value without causing re-renders
function Timer() {
    const intervalRef = useRef(null);
    
    const startTimer = () => {
        intervalRef.current = setInterval(() => {
            console.log('Tick');
        }, 1000);
    };
    
    const stopTimer = () => {
        clearInterval(intervalRef.current);
    };
    
    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);
    
    return (
        <div>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </div>
    );
}`
    },
    {
        id: 23,
        title: 'Query Params (URL Search Params)',
        language: 'javascript',
        code: `// Get query params from URL
const searchParams = new URLSearchParams(window.location.search);

// Get single param
const userId = searchParams.get('userId'); // ?userId=123
const page = searchParams.get('page') || '1';

// Get all params as object
const params = Object.fromEntries(searchParams.entries());
// ?name=John&age=30 → { name: 'John', age: '30' }

// Check if param exists
if (searchParams.has('filter')) {
    const filter = searchParams.get('filter');
}

// Set/Update query params
searchParams.set('page', '2');
searchParams.set('sort', 'name');

// Update URL without reload
const newUrl = \`\${window.location.pathname}?\${searchParams.toString()}\`;
window.history.pushState({}, '', newUrl);

// React Router example
import { useSearchParams } from 'react-router-dom';

function Component() {
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Get param
    const page = searchParams.get('page') || '1';
    const filter = searchParams.get('filter') || '';
    
    // Update params
    const updatePage = (newPage) => {
        setSearchParams({ page: newPage, filter });
    };
    
    const updateFilter = (newFilter) => {
        setSearchParams({ page: '1', filter: newFilter });
    };
    
    return (
        <div>
            <input 
                value={filter}
                onChange={(e) => updateFilter(e.target.value)}
            />
            <button onClick={() => updatePage('2')}>Next Page</button>
        </div>
    );
}

// Remove a param
searchParams.delete('filter');
setSearchParams(searchParams);`
    },
    {
        id: 24,
        title: 'Generate Unique ID',
        language: 'javascript',
        code: `// Simple timestamp-based ID
const generateId = () => Date.now();

// More unique with random component
const generateUniqueId = () => {
    return Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};
// Example: "1703456789012-k3j2h9d4f"

// UUID v4 (random)
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
// Example: "a3e9f8c0-6d2b-4f1e-8a7c-9b2d5e6f8a1b"

// Incremental ID generator
let idCounter = 0;
const getNextId = () => ++idCounter;

// For array items with prefix
const generateItemId = (prefix = 'item') => {
    return \`\${prefix}-\${Date.now()}-\${Math.random().toString(36).substr(2, 5)}\`;
};
// Example: "item-1703456789012-k3j2h"

// Using crypto API (more secure)
const generateSecureId = () => {
    return crypto.randomUUID();
};
// Example: "f81d4fae-7dec-11d0-a765-00a0c91e6bf6"

// For creating new user/item in state
const addNewItem = () => {
    const newItem = {
        id: generateUniqueId(),
        name: '',
        createdAt: new Date().toISOString()
    };
    setItems([...items, newItem]);
};`
    },
    {
        id: 25,
        title: 'Remove Duplicates from Array',
        language: 'javascript',
        code: `// Remove duplicates from simple array
const numbers = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(numbers)];
// [1, 2, 3, 4, 5]

// Remove duplicates from array of strings
const fruits = ['apple', 'banana', 'apple', 'orange'];
const uniqueFruits = [...new Set(fruits)];
// ['apple', 'banana', 'orange']

// Remove duplicates from array of objects by property
const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
    { id: 1, name: 'John' }
];

// Method 1: Using Map
const uniqueUsers = Array.from(
    new Map(users.map(user => [user.id, user])).values()
);

// Method 2: Using filter
const uniqueByFilter = users.filter((user, index, self) =>
    index === self.findIndex(u => u.id === user.id)
);

// Method 3: Using reduce
const uniqueByReduce = users.reduce((acc, user) => {
    if (!acc.find(u => u.id === user.id)) {
        acc.push(user);
    }
    return acc;
}, []);

// Remove duplicates by multiple properties
const uniqueByMultiple = users.filter((user, index, self) =>
    index === self.findIndex(u => 
        u.id === user.id && u.name === user.name
    )
);

// Generic function to remove duplicates by key
const uniqueBy = (array, key) => {
    return Array.from(
        new Map(array.map(item => [item[key], item])).values()
    );
};

const result = uniqueBy(users, 'id');`
    },
    {
        id: 26,
        title: 'Flatten Nested Arrays',
        language: 'javascript',
        code: `// Flatten one level
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.flat();
// [1, 2, 3, 4, 5]

// Flatten deeply nested arrays
const deepNested = [1, [2, [3, [4, [5]]]]];
const deepFlat = deepNested.flat(Infinity);
// [1, 2, 3, 4, 5]

// Flatten specific depth
const arr = [1, [2, [3, [4]]]];
const flatTwo = arr.flat(2);
// [1, 2, 3, [4]]

// Flatten array of objects with nested arrays
const data = [
    { id: 1, tags: ['a', 'b'] },
    { id: 2, tags: ['c', 'd'] }
];

const allTags = data.flatMap(item => item.tags);
// ['a', 'b', 'c', 'd']

// flatMap - map and flatten in one step
const numbers = [1, 2, 3];
const doubled = numbers.flatMap(n => [n, n * 2]);
// [1, 2, 2, 4, 3, 6]

// Flatten and filter
const mixed = [[1, 2], [3, null], [4, 5]];
const flattened = mixed.flat().filter(Boolean);
// [1, 2, 3, 4, 5]

// Recursive flatten (manual)
const flattenDeep = (arr) => {
    return arr.reduce((acc, val) => {
        return Array.isArray(val)
            ? acc.concat(flattenDeep(val))
            : acc.concat(val);
    }, []);
};

const result = flattenDeep([1, [2, [3, [4, [5]]]]]);
// [1, 2, 3, 4, 5]

// Flatten nested object structure
const categories = [
    { name: 'A', items: [{ id: 1 }, { id: 2 }] },
    { name: 'B', items: [{ id: 3 }, { id: 4 }] }
];

const allItems = categories.flatMap(cat => cat.items);
// [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]`
    },
    {
        id: 27,
        title: 'Environment Variables',
        language: 'javascript',
        code: `// Vite - variables must start with VITE_
// Create .env file in project root:
// VITE_API_URL=https://api.example.com
// VITE_API_KEY=your-secret-key

// Access in your code
const apiUrl = import.meta.env.VITE_API_URL;
const apiKey = import.meta.env.VITE_API_KEY;

// Check if running in development
const isDev = import.meta.env.DEV;
const isProd = import.meta.env.PROD;

// Full example
const api = {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    key: import.meta.env.VITE_API_KEY,
    timeout: import.meta.env.VITE_TIMEOUT || 5000
};

// Usage in fetch
fetch(\`\${api.baseUrl}/users\`, {
    headers: {
        'Authorization': \`Bearer \${api.key}\`
    }
});

// Note: .env files should be in .gitignore
// Create .env.example with dummy values for team`
    },
    {
        id: 28,
        title: 'Null/Undefined Checks',
        language: 'javascript',
        code: `// Optional chaining (?.)
const user = { profile: { name: 'John' } };
const userName = user?.profile?.name; // "John"
const missing = user?.settings?.theme; // undefined (no error)

// Nullish coalescing (??)
const value = null ?? 'default'; // "default"
const zero = 0 ?? 'default'; // 0 (not default!)
const empty = '' ?? 'default'; // '' (not default!)

// Difference: || vs ??
const port1 = 0 || 3000; // 3000 (|| treats 0 as falsy)
const port2 = 0 ?? 3000; // 0 (?? only checks null/undefined)

// Combining both
const displayName = user?.profile?.nickname ?? user?.profile?.name ?? 'Guest';

// Safe array access
const firstItem = items?.[0];
const lastItem = items?.[items.length - 1];

// Safe function call
const result = onSubmit?.(data); // Only calls if onSubmit exists

// With default values
const config = {
    theme: settings?.theme ?? 'light',
    lang: settings?.language ?? 'en',
    notifications: settings?.notifications ?? true
};

// Fallback chain
const title = post?.title ?? draft?.title ?? 'Untitled';`
    },
    {
        id: 29,
        title: 'Object/Array Destructuring',
        language: 'javascript',
        code: `// Object destructuring
const user = { name: 'John', age: 30, city: 'NYC' };
const { name, age } = user;

// With renaming
const { name: userName, age: userAge } = user;

// With defaults
const { role = 'user' } = user; // 'user' if role doesn't exist

// Nested destructuring
const data = { user: { profile: { email: 'john@example.com' } } };
const { user: { profile: { email } } } = data;

// Array destructuring
const colors = ['red', 'green', 'blue'];
const [first, second] = colors; // 'red', 'green'

// Skip elements
const [, , third] = colors; // 'blue'

// Rest operator
const [primary, ...others] = colors; // 'red', ['green', 'blue']

// Function parameters
function displayUser({ name, age, role = 'guest' }) {
    console.log(\`\${name}, \${age}, \${role}\`);
}

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// React useState destructuring
const [count, setCount] = useState(0);
const [user, setUser] = useState({ name: '', email: '' });

// Multiple returns
const [data, error, loading] = useFetch('/api/users');`
    },
    {
        id: 30,
        title: 'setTimeout/setInterval Cleanup',
        language: 'javascript',
        code: `import { useEffect, useState } from 'react';

// setTimeout with cleanup
useEffect(() => {
    const timer = setTimeout(() => {
        console.log('Delayed action');
    }, 2000);
    
    // Cleanup on unmount
    return () => clearTimeout(timer);
}, []);

// setInterval with cleanup
useEffect(() => {
    const interval = setInterval(() => {
        console.log('Every second');
    }, 1000);
    
    return () => clearInterval(interval);
}, []);

// Auto-incrementing counter
function Counter() {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);
        
        return () => clearInterval(interval);
    }, []);
    
    return <div>{count}</div>;
}

// Delayed search (debounce pattern)
useEffect(() => {
    const timer = setTimeout(() => {
        if (searchTerm) {
            fetchResults(searchTerm);
        }
    }, 500);
    
    return () => clearTimeout(timer);
}, [searchTerm]);

// Multiple timers
useEffect(() => {
    const timer1 = setTimeout(() => console.log('First'), 1000);
    const timer2 = setTimeout(() => console.log('Second'), 2000);
    
    return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
    };
}, []);`
    },
    {
        id: 31,
        title: 'Prevent Default (Forms/Links)',
        language: 'javascript',
        code: `// Prevent form submission
function handleSubmit(e) {
    e.preventDefault(); // Stops page reload
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
}

<form onSubmit={handleSubmit}>
    <input name="email" />
    <button type="submit">Submit</button>
</form>

// Prevent link navigation
function handleClick(e) {
    e.preventDefault();
    // Do custom navigation or action
    navigate('/custom-route');
}

<a href="/somewhere" onClick={handleClick}>
    Click me
</a>

// Stop event bubbling
function handleButtonClick(e) {
    e.stopPropagation(); // Prevents parent handlers from firing
    console.log('Button clicked');
}

<div onClick={() => console.log('Div clicked')}>
    <button onClick={handleButtonClick}>
        Click me
    </button>
</div>

// Both together
function handleEvent(e) {
    e.preventDefault(); // Stop default behavior
    e.stopPropagation(); // Stop bubbling
}

// Conditional preventDefault
function handleLinkClick(e) {
    if (shouldPrevent) {
        e.preventDefault();
        // Custom behavior
    }
    // Otherwise link works normally
}`
    },
    // MySQL SNIPPETS
    {
        id: 100,
        title: 'Create Database & Table',
        language: 'mysql',
        code: `-- Create a new database
CREATE DATABASE my_app_db;

-- Use the database
USE my_app_db;

-- Create a users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create a posts table with foreign key
CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`
    },
    {
        id: 101,
        title: 'Insert Data',
        language: 'mysql',
        code: `-- Insert single row
INSERT INTO users (username, email, password)
VALUES ('john_doe', 'john@example.com', 'hashed_password');

-- Insert multiple rows
INSERT INTO users (username, email, password) VALUES
    ('jane_smith', 'jane@example.com', 'hashed_pass1'),
    ('bob_jones', 'bob@example.com', 'hashed_pass2'),
    ('alice_wilson', 'alice@example.com', 'hashed_pass3');

-- Insert and get the auto-generated ID
INSERT INTO posts (user_id, title, content)
VALUES (1, 'My First Post', 'This is the content');
-- Use LAST_INSERT_ID() to get the new post ID
SELECT LAST_INSERT_ID();`
    },
    {
        id: 102,
        title: 'Select Queries - Basics',
        language: 'mysql',
        code: `-- Select all columns
SELECT * FROM users;

-- Select specific columns
SELECT username, email FROM users;

-- Select with WHERE clause
SELECT * FROM users WHERE id = 1;

-- Multiple conditions (AND)
SELECT * FROM users 
WHERE username = 'john_doe' AND email = 'john@example.com';

-- Multiple conditions (OR)
SELECT * FROM posts 
WHERE user_id = 1 OR user_id = 2;

-- Pattern matching with LIKE
SELECT * FROM users WHERE email LIKE '%@example.com';
SELECT * FROM users WHERE username LIKE 'john%';

-- IN operator
SELECT * FROM users WHERE id IN (1, 3, 5, 7);

-- Between range
SELECT * FROM posts 
WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31';`
    },
    {
        id: 103,
        title: 'Update Data',
        language: 'mysql',
        code: `-- Update single row
UPDATE users 
SET email = 'newemail@example.com' 
WHERE id = 1;

-- Update multiple columns
UPDATE users 
SET username = 'john_updated', email = 'john_new@example.com'
WHERE id = 1;

-- Update multiple rows
UPDATE posts 
SET title = CONCAT('[Updated] ', title)
WHERE user_id = 1;

-- Update with calculation
UPDATE users 
SET login_count = login_count + 1 
WHERE id = 1;

-- ⚠️ WARNING: Without WHERE, updates ALL rows!
-- Always use WHERE unless you mean to update everything`
    },
    {
        id: 104,
        title: 'Delete Data',
        language: 'mysql',
        code: `-- Delete specific row
DELETE FROM posts WHERE id = 5;

-- Delete multiple rows with condition
DELETE FROM posts WHERE user_id = 3;

-- Delete with date condition
DELETE FROM posts 
WHERE created_at < '2024-01-01';

-- Delete all rows in table (keeps structure)
DELETE FROM posts;

-- Faster way to delete all rows (resets AUTO_INCREMENT)
TRUNCATE TABLE posts;

-- ⚠️ WARNING: Without WHERE, deletes ALL rows!
-- Always double-check your WHERE clause`
    },
    {
        id: 105,
        title: 'JOIN Tables',
        language: 'mysql',
        code: `-- INNER JOIN - only matching rows
SELECT users.username, posts.title, posts.created_at
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- LEFT JOIN - all users, even without posts
SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- Get users with post count
SELECT users.username, COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username;

-- Join with WHERE condition
SELECT users.username, posts.title
FROM users
INNER JOIN posts ON users.id = posts.user_id
WHERE users.id = 1;

-- Multiple joins (3 tables)
SELECT users.username, posts.title, comments.content
FROM users
INNER JOIN posts ON users.id = posts.user_id
INNER JOIN comments ON posts.id = comments.post_id;`
    },
    {
        id: 106,
        title: 'ORDER BY & LIMIT',
        language: 'mysql',
        code: `-- Order by ascending (A-Z, 0-9)
SELECT * FROM users ORDER BY username ASC;

-- Order by descending (Z-A, 9-0)
SELECT * FROM posts ORDER BY created_at DESC;

-- Order by multiple columns
SELECT * FROM users 
ORDER BY created_at DESC, username ASC;

-- Get first 10 rows
SELECT * FROM posts LIMIT 10;

-- Get newest 5 posts
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 5;

-- Pagination: skip 10, get next 10 (page 2)
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 10;

-- Shorter syntax for pagination
SELECT * FROM posts 
ORDER BY created_at DESC 
LIMIT 10, 10;  -- LIMIT offset, count`
    },
    {
        id: 107,
        title: 'Aggregate Functions (COUNT, SUM, AVG)',
        language: 'mysql',
        code: `-- Count total rows
SELECT COUNT(*) as total_users FROM users;

-- Count non-null values
SELECT COUNT(email) FROM users;

-- Count unique values
SELECT COUNT(DISTINCT user_id) as unique_users FROM posts;

-- Sum of values
SELECT SUM(price) as total_revenue FROM orders;

-- Average
SELECT AVG(price) as average_price FROM products;

-- Min and Max
SELECT MIN(price) as cheapest, MAX(price) as most_expensive 
FROM products;

-- GROUP BY with aggregates
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id;

-- GROUP BY with HAVING (filter groups)
SELECT user_id, COUNT(*) as post_count
FROM posts
GROUP BY user_id
HAVING post_count > 5;

-- Multiple aggregates
SELECT 
    user_id,
    COUNT(*) as total_posts,
    AVG(LENGTH(content)) as avg_post_length
FROM posts
GROUP BY user_id;`
    },
    {
        id: 108,
        title: 'Common WHERE Conditions',
        language: 'mysql',
        code: `-- Equals
SELECT * FROM users WHERE id = 1;

-- Not equals
SELECT * FROM users WHERE status != 'banned';
SELECT * FROM users WHERE status <> 'banned';  -- same thing

-- Greater than / Less than
SELECT * FROM products WHERE price > 50;
SELECT * FROM products WHERE stock < 10;

-- Greater or equal / Less or equal
SELECT * FROM orders WHERE total >= 100;
SELECT * FROM users WHERE age <= 18;

-- IS NULL / IS NOT NULL
SELECT * FROM users WHERE last_login IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;

-- Multiple conditions with AND
SELECT * FROM products 
WHERE category = 'electronics' AND price < 500;

-- Multiple conditions with OR
SELECT * FROM users 
WHERE role = 'admin' OR role = 'moderator';

-- Combine AND/OR with parentheses
SELECT * FROM products 
WHERE (category = 'electronics' OR category = 'computers')
AND price < 1000;

-- NOT operator
SELECT * FROM users WHERE NOT status = 'banned';`
    },
    {
        id: 109,
        title: 'Show Database Info',
        language: 'mysql',
        code: `-- Show all databases
SHOW DATABASES;

-- Show all tables in current database
SHOW TABLES;

-- Show table structure
DESCRIBE users;
-- or
DESC users;
-- or
SHOW COLUMNS FROM users;

-- Show create table statement
SHOW CREATE TABLE users;

-- Show indexes on table
SHOW INDEX FROM users;

-- Show current database
SELECT DATABASE();

-- Show MySQL version
SELECT VERSION();

-- Show all users
SELECT User, Host FROM mysql.user;`
    },
    {
        id: 110,
        title: 'Modify Table Structure',
        language: 'mysql',
        code: `-- Add new column
ALTER TABLE users 
ADD COLUMN phone VARCHAR(20);

-- Add column with position
ALTER TABLE users 
ADD COLUMN age INT AFTER email;

-- Modify column type
ALTER TABLE users 
MODIFY COLUMN phone VARCHAR(15);

-- Rename column
ALTER TABLE users 
CHANGE COLUMN phone phone_number VARCHAR(20);

-- Drop column
ALTER TABLE users 
DROP COLUMN age;

-- Add index
ALTER TABLE users 
ADD INDEX idx_email (email);

-- Add unique constraint
ALTER TABLE users 
ADD UNIQUE (username);

-- Drop table completely
DROP TABLE IF EXISTS old_table;`
    },
    // CSS SNIPPETS
    {
        id: 200,
        title: 'CSS Reset & Foundation',
        language: 'css',
        code: `/* Universal reset - removes default spacing */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Makes width/height include padding & border */
}

/* Body foundation - good starting point */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  font-size: 16px;
  line-height: 1.6; /* Comfortable reading spacing */
  color: #333;
  background-color: #fff;
  min-height: 100vh; /* Full viewport height */
  margin: 0;
}

/* Header foundation */
header {
  background-color: #f8f9fa;
  padding: 1rem 2rem;
  border-bottom: 1px solid #dee2e6;
}

/* Better image defaults */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Remove list styling when used for navigation */
ul, ol {
  list-style: none;
}

/* Better link defaults */
a {
  text-decoration: none;
  color: inherit;
}

/* Better button defaults */
button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  background: none;
}`
    },
    {
        id: 201,
        title: 'Positioning - Anchor Elements',
        language: 'css',
        code: `/* STATIC - Default, normal document flow */
.static-box {
  position: static; /* Default - no special positioning */
}

/* RELATIVE - Positioned relative to its normal position */
.relative-box {
  position: relative;
  top: 20px;    /* Moves down 20px from normal position */
  left: 30px;   /* Moves right 30px from normal position */
  /* Element still takes up original space in layout */
}

/* ABSOLUTE - Positioned relative to nearest positioned ancestor */
.container {
  position: relative; /* Creates positioning context */
  width: 500px;
  height: 300px;
}

.absolute-box {
  position: absolute;
  top: 0;      /* 0px from top of .container */
  right: 0;    /* 0px from right of .container */
  /* Removed from normal document flow */
}

/* FIXED - Positioned relative to viewport (stays during scroll) */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;     /* Stretches full width */
  background: white;
  z-index: 100;
  /* Stays at top even when scrolling */
}

/* STICKY - Toggles between relative and fixed */
.sticky-nav {
  position: sticky;
  top: 0;       /* Becomes fixed when scrolled to top */
  background: white;
  /* Acts relative until scroll position is reached */
}

/* Common anchoring patterns */
.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centers perfectly */
}

.bottom-right-corner {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.full-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Covers entire viewport */
}`,
        livePreview: {
            description: 'Different position values visualized',
            containerStyle: {
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            },
            layout: `
                <div class="demo-container" style="height: 120px;">
                    <span class="demo-label">Container</span>
                    <div class="demo-box" style="background: #10b981;">Static (default)</div>
                </div>
                
                <div class="demo-container" style="height: 150px; position: relative;">
                    <span class="demo-label">Container (position: relative)</span>
                    <div class="demo-box" style="background: #667eea; position: relative; top: 20px; left: 30px; width: fit-content;">Relative<br/><small>top: 20px, left: 30px</small></div>
                </div>
                
                <div class="demo-container" style="height: 180px; position: relative;">
                    <span class="demo-label">Container (position: relative)</span>
                    <div class="demo-box" style="background: #f59e0b; position: absolute; top: 10px; right: 10px; width: 140px;">Absolute<br/><small>top: 10px, right: 10px</small></div>
                    <div class="demo-box" style="background: #e5e7eb; color: #374151; width: fit-content;">Normal flow</div>
                </div>
            `
        }
    },
    {
        id: 202,
        title: 'Z-Index & Stacking',
        language: 'css',
        code: `/* Z-INDEX ONLY WORKS ON POSITIONED ELEMENTS 
   (position: relative, absolute, fixed, or sticky) */

/* Basic z-index usage */
.background-layer {
  position: relative;
  z-index: 1;     /* Lower number = behind */
}

.middle-layer {
  position: relative;
  z-index: 10;    /* Higher number = in front */
}

.top-layer {
  position: relative;
  z-index: 100;
}

/* Common z-index scale (good practice) */
.page-content {
  z-index: 1;           /* Base content */
}

.dropdown {
  position: absolute;
  z-index: 10;          /* Dropdowns */
}

.modal-backdrop {
  position: fixed;
  z-index: 1000;        /* Modal backgrounds */
}

.modal {
  position: fixed;
  z-index: 1001;        /* Modals on top of backdrop */
}

.tooltip {
  position: absolute;
  z-index: 9999;        /* Tooltips always on top */
}

/* Negative z-index (behind parent) */
.card {
  position: relative;
  z-index: 1;
}

.card-shadow {
  position: absolute;
  z-index: -1;          /* Behind .card */
  /* Creates shadow effect behind card */
}

/* Example: Modal over content */
.page {
  position: relative;
  z-index: 1;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;         /* Covers page */
}

.modal-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;         /* Above overlay */
}

/* Stacking context - child z-index only works within parent */
.parent {
  position: relative;
  z-index: 10;
}

.child {
  position: absolute;
  z-index: 999;         /* Still behind elements with z-index > 10 */
  /* Can't escape parent's stacking context */
}`,
        livePreview: {
            description: 'Layering demonstration with different z-index values',
            containerStyle: {
                padding: '1rem',
                minHeight: '300px'
            },
            layout: `
                <div style="position: relative; height: 250px;">
                    <div class="demo-box" style="position: absolute; top: 20px; left: 20px; width: 150px; height: 100px; background: #ef4444; z-index: 1;">z-index: 1<br/><small>(Bottom)</small></div>
                    
                    <div class="demo-box" style="position: absolute; top: 60px; left: 60px; width: 150px; height: 100px; background: #667eea; z-index: 10;">z-index: 10<br/><small>(Middle)</small></div>
                    
                    <div class="demo-box" style="position: absolute; top: 100px; left: 100px; width: 150px; height: 100px; background: #10b981; z-index: 100;">z-index: 100<br/><small>(Top)</small></div>
                </div>
            `
        }
    },
    {
        id: 203,
        title: 'CSS Variables (Custom Properties)',
        language: 'css',
        code: `/* Define variables in :root (global scope) */
:root {
  /* Colors */
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --danger-color: #fc5c65;
  --success-color: #10b981;
  --text-primary: #1a202c;
  --text-secondary: #718096;
  --background: #ffffff;
  --border-color: #e2e8f0;
  
  /* Spacing */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 2rem;     /* 32px */
  --spacing-xl: 4rem;     /* 64px */
  
  /* Font sizes */
  --font-xs: 0.75rem;
  --font-sm: 0.875rem;
  --font-md: 1rem;
  --font-lg: 1.25rem;
  --font-xl: 1.5rem;
  --font-2xl: 2rem;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}

/* Use variables with var() function */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-size: var(--font-md);
}

.card {
  background: var(--background);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-sm);
}

/* Fallback values if variable doesn't exist */
.text {
  color: var(--text-color, #333); /* Uses #333 if --text-color not defined */
}

/* Override variables in specific contexts */
.dark-theme {
  --background: #1a202c;
  --text-primary: #f7fafc;
  --text-secondary: #cbd5e0;
  --border-color: #2d3748;
}

/* Scoped variables (only for .section and children) */
.section {
  --section-bg: #f8f9fa;
  --section-padding: 3rem;
}

.section-content {
  background: var(--section-bg);
  padding: var(--section-padding);
}

/* Calculate with variables */
.container {
  padding: calc(var(--spacing-md) * 2); /* 32px */
  margin-top: calc(var(--spacing-lg) + 10px);
}

/* Using variables in JavaScript */
/* 
// Get variable value
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue('--primary-color');

// Set variable value
root.style.setProperty('--primary-color', '#ff0000');
*/`
    },
    {
        id: 204,
        title: 'Flexbox Basics',
        language: 'css',
        code: `/* Container - parent element */
.flex-container {
  display: flex;
  
  /* Direction - row (default) or column */
  flex-direction: row;        /* Items in a row → */
  /* flex-direction: column;  /* Items in a column ↓ */
  
  /* Main axis alignment (horizontal in row) */
  justify-content: flex-start;  /* Default - start */
  /* justify-content: center;   /* Center items */
  /* justify-content: flex-end; /* End */
  /* justify-content: space-between; /* Space between items */
  /* justify-content: space-around;  /* Space around items */
  
  /* Cross axis alignment (vertical in row) */
  align-items: stretch;         /* Default - stretch to fill */
  /* align-items: center;       /* Center vertically */
  /* align-items: flex-start;   /* Top */
  /* align-items: flex-end;     /* Bottom */
  
  /* Wrap items to new line */
  flex-wrap: nowrap;            /* Default - single line */
  /* flex-wrap: wrap;           /* Wrap to multiple lines */
  
  /* Gap between items */
  gap: 1rem;                    /* Space between all items */
}

/* Items - child elements */
.flex-item {
  /* Grow to fill space */
  flex-grow: 0;                 /* Default - don't grow */
  /* flex-grow: 1;              /* Grow to fill available space */
  
  /* Shrink when needed */
  flex-shrink: 1;               /* Default - can shrink */
  
  /* Base size before growing/shrinking */
  flex-basis: auto;             /* Default */
  /* flex-basis: 200px;         /* Fixed base width */
}

/* Shorthand: flex: grow shrink basis */
.flex-item {
  flex: 1;                      /* Same as flex: 1 1 0 */
  /* flex: 0 0 auto;            /* Don't grow or shrink */
}

/* Common patterns */
.center-everything {
  display: flex;
  justify-content: center;      /* Center horizontally */
  align-items: center;          /* Center vertically */
  min-height: 100vh;
}

.navbar {
  display: flex;
  justify-content: space-between;  /* Logo left, menu right */
  align-items: center;
  padding: 1rem;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.equal-columns {
  display: flex;
  gap: 1rem;
}

.equal-columns > * {
  flex: 1;                      /* All children equal width */
}`,
        livePreview: {
            description: 'Common flexbox layout patterns',
            containerStyle: {
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            },
            layout: `
                <div class="demo-container">
                    <span class="demo-label">justify-content: space-between</span>
                    <div style="display: flex; justify-content: space-between; gap: 0.5rem;">
                        <div class="demo-box" style="width: 60px; height: 50px;">1</div>
                        <div class="demo-box" style="width: 60px; height: 50px;">2</div>
                        <div class="demo-box" style="width: 60px; height: 50px;">3</div>
                    </div>
                </div>
                
                <div class="demo-container">
                    <span class="demo-label">justify-content: center, align-items: center</span>
                    <div style="display: flex; justify-content: center; align-items: center; min-height: 80px;">
                        <div class="demo-box" style="padding: 0.75rem 1.5rem;">Centered</div>
                    </div>
                </div>
                
                <div class="demo-container">
                    <span class="demo-label">flex: 1 (Equal width columns)</span>
                    <div style="display: flex; gap: 0.5rem;">
                        <div class="demo-box" style="flex: 1; height: 50px;">flex: 1</div>
                        <div class="demo-box" style="flex: 1; height: 50px; background: #764ba2;">flex: 1</div>
                        <div class="demo-box" style="flex: 1; height: 50px; background: #f59e0b;">flex: 1</div>
                    </div>
                </div>
            `
        }
    },
    {
        id: 205,
        title: 'Grid Layout Basics',
        language: 'css',
        code: `/* Container - parent element */
.grid-container {
  display: grid;
  
  /* Define columns */
  grid-template-columns: 1fr 1fr 1fr;     /* 3 equal columns */
  /* grid-template-columns: 200px 1fr;    /* Fixed + flexible */
  /* grid-template-columns: repeat(3, 1fr); /* Same as above */
  
  /* Define rows */
  grid-template-rows: auto;               /* Auto height */
  /* grid-template-rows: 100px 200px;     /* Fixed heights */
  
  /* Gap between items */
  gap: 1rem;                              /* Both row & column */
  /* column-gap: 1rem;                    /* Only column gap */
  /* row-gap: 0.5rem;                     /* Only row gap */
}

/* Items - child elements */
.grid-item {
  /* Span multiple columns */
  grid-column: span 2;                    /* Takes 2 columns */
  /* grid-column: 1 / 3;                  /* From line 1 to 3 */
  
  /* Span multiple rows */
  grid-row: span 2;
}

/* Common patterns */

/* Responsive 3-column grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  /* Auto-fits as many 300px+ columns as possible */
}

/* Sidebar layout */
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;       /* Sidebar + main */
  gap: 2rem;
  min-height: 100vh;
}

/* Header, main, footer layout */
.page {
  display: grid;
  grid-template-rows: auto 1fr auto;      /* Header, grow main, footer */
  min-height: 100vh;
}

/* Named grid areas */
.app-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }

/* Center item in grid */
.center-in-grid {
  display: grid;
  place-items: center;                    /* Center both axes */
  min-height: 100vh;
}`,
        livePreview: {
            description: 'Common grid layout patterns',
            containerStyle: {
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
            },
            layout: `
                <div class="demo-container">
                    <span class="demo-label">grid-template-columns: 1fr 1fr 1fr</span>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
                        <div class="demo-box" style="height: 50px;">1</div>
                        <div class="demo-box" style="height: 50px; background: #764ba2;">2</div>
                        <div class="demo-box" style="height: 50px; background: #f59e0b;">3</div>
                    </div>
                </div>
                
                <div class="demo-container">
                    <span class="demo-label">grid-template-columns: 200px 1fr</span>
                    <div style="display: grid; grid-template-columns: 100px 1fr; gap: 0.5rem;">
                        <div class="demo-box" style="height: 60px; font-size: 0.75rem;">Sidebar<br/>100px</div>
                        <div class="demo-box" style="height: 60px; background: #764ba2;">Main (1fr)</div>
                    </div>
                </div>
                
                <div class="demo-container">
                    <span class="demo-label">grid-column: span 2</span>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem;">
                        <div class="demo-box" style="height: 50px; grid-column: span 2;">Spans 2 columns</div>
                        <div class="demo-box" style="height: 50px; background: #f59e0b;">3</div>
                    </div>
                </div>
            `
        }
    },
    {
        id: 206,
        title: 'Pseudo-Classes - Interactive States',
        language: 'css',
        code: `/* BUTTON INTERACTIVE STATES */

/* Hover - when mouse is over element */
.demo-btn:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
}

/* Active - when element is being clicked */
.demo-btn:active {
  transform: translateY(0);
  box-shadow: none;
}

/* Focus - when element is focused (keyboard/click) */
.demo-btn:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Focus visible - only when focused via keyboard */
.demo-btn:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

/* Disabled state */
.demo-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #9ca3af;
}

/* INPUT STATES */

/* Focus on input */
.demo-input:focus {
  outline: 2px solid #667eea;
  border-color: #667eea;
}

/* Disabled input */
.demo-input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Checked checkbox */
.demo-checkbox:checked {
  background-color: #667eea;
  border-color: #667eea;
}

/* Required but empty */
.demo-input:required:invalid {
  border-color: #fc5c65;
}

/* Valid input */
.demo-input:valid {
  border-color: #10b981;
}

/* Read-only input */
.demo-input:read-only {
  background-color: #f8f9fa;
}`,
        livePreview: {
            buttons: [
                {
                    label: ':hover',
                    description: 'Hover over me',
                    baseStyle: {
                        padding: '12px 24px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)'
                    },
                    hoverStyle: {
                        backgroundColor: '#5568d3',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 12px rgba(102, 126, 234, 0.4)'
                    }
                },
                {
                    label: ':active',
                    description: 'Click and hold me',
                    baseStyle: {
                        padding: '12px 24px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.1s',
                        boxShadow: '0 4px 6px rgba(102, 126, 234, 0.3)'
                    },
                    activeStyle: {
                        transform: 'translateY(0)',
                        boxShadow: 'none'
                    }
                },
                {
                    label: ':focus',
                    description: 'Click to focus',
                    baseStyle: {
                        padding: '12px 24px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.3s'
                    },
                    focusStyle: {
                        outline: '2px solid #667eea',
                        outlineOffset: '2px'
                    }
                },
                {
                    label: ':disabled',
                    description: 'Disabled state',
                    baseStyle: {
                        padding: '12px 24px',
                        backgroundColor: '#9ca3af',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'not-allowed',
                        opacity: 0.5
                    },
                    disabled: true
                },
                {
                    label: 'input:focus',
                    description: '',
                    type: 'input',
                    inputType: 'text',
                    placeholder: 'Click to focus me',
                    baseStyle: {
                        padding: '10px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                    },
                    focusStyle: {
                        outline: '2px solid #667eea',
                        borderColor: '#667eea'
                    }
                },
                {
                    label: 'input:disabled',
                    description: '',
                    type: 'input',
                    inputType: 'text',
                    placeholder: 'Disabled input',
                    baseStyle: {
                        padding: '10px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#f5f5f5',
                        cursor: 'not-allowed'
                    },
                    disabled: true
                },
                {
                    label: 'input:required:invalid',
                    description: '',
                    type: 'input',
                    inputType: 'email',
                    placeholder: 'Enter email (required)',
                    required: true,
                    baseStyle: {
                        padding: '10px 12px',
                        border: '2px solid #fc5c65',
                        borderRadius: '6px',
                        fontSize: '14px',
                        transition: 'all 0.2s'
                    }
                },
                {
                    label: 'input:valid',
                    description: '',
                    type: 'input',
                    inputType: 'email',
                    placeholder: 'Enter valid email',
                    defaultValue: 'user@example.com',
                    baseStyle: {
                        padding: '10px 12px',
                        border: '2px solid #10b981',
                        borderRadius: '6px',
                        fontSize: '14px'
                    }
                },
                {
                    label: 'input:read-only',
                    description: '',
                    type: 'input',
                    inputType: 'text',
                    defaultValue: 'Read-only value',
                    readOnly: true,
                    baseStyle: {
                        padding: '10px 12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '14px',
                        backgroundColor: '#f8f9fa'
                    }
                }
            ]
        }
    },
    {
        id: 207,
        title: 'Pseudo-Classes - Structural Selectors',
        language: 'css',
        code: `/* CHILD SELECTORS */

/* First child */
li:first-child {
  margin-top: 0;
  font-weight: bold;
}

/* Last child */
li:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

/* Only child (no siblings) */
p:only-child {
  text-align: center;
}

/* NTH CHILD - Pattern based */

/* Every odd row (1, 3, 5, 7...) */
tr:nth-child(odd) {
  background-color: #f8f9fa;
}

/* Every even row (2, 4, 6, 8...) */
tr:nth-child(even) {
  background-color: #ffffff;
}

/* Specific child (3rd element) */
li:nth-child(3) {
  color: red;
}

/* Every 3rd element (3, 6, 9, 12...) */
div:nth-child(3n) {
  background-color: lightblue;
}

/* Every 3rd starting from 2nd (2, 5, 8, 11...) */
div:nth-child(3n+2) {
  background-color: lightgreen;
}

/* First 3 elements */
li:nth-child(-n+3) {
  font-weight: bold;
}

/* All except first 3 */
li:nth-child(n+4) {
  opacity: 0.7;
}

/* NTH LAST CHILD - Count from end */

/* Last 3 items */
li:nth-last-child(-n+3) {
  border-bottom: 2px solid blue;
}

/* Second to last */
li:nth-last-child(2) {
  color: orange;
}

/* TYPE SELECTORS */

/* First paragraph of its type */
p:first-of-type {
  font-size: 1.2em;
  margin-top: 0;
}

/* Last heading of its type */
h2:last-of-type {
  margin-bottom: 2rem;
}

/* Every other div of type */
div:nth-of-type(odd) {
  background: #f0f0f0;
}

/* EMPTY & NOT EMPTY */

/* Empty elements */
div:empty {
  display: none;
}

/* Has content (not empty) */
p:not(:empty) {
  margin-bottom: 1rem;
}

/* NOT SELECTOR */

/* All items except last */
li:not(:last-child) {
  margin-bottom: 1rem;
}

/* All buttons except disabled */
button:not(:disabled) {
  cursor: pointer;
}

/* All paragraphs except first */
p:not(:first-child) {
  margin-top: 1rem;
}

/* Multiple not conditions */
.item:not(.active):not(.disabled) {
  opacity: 0.6;
}

/* PRACTICAL EXAMPLES */

/* Zebra striping for table */
tbody tr:nth-child(odd) {
  background-color: #f8f9fa;
}

/* Remove margin from first/last in container */
.container > *:first-child {
  margin-top: 0;
}

.container > *:last-child {
  margin-bottom: 0;
}

/* Style first 3 and last 3 differently */
.item:nth-child(-n+3) {
  border-left: 3px solid blue;
}

.item:nth-last-child(-n+3) {
  border-right: 3px solid red;
}`
    },
    {
        id: 208,
        title: 'Create and Drop Database',
        language: 'postgresql',
        code: `-- Skapa en ny databas
CREATE DATABASE databasnamn;

-- Radera en databas
DROP DATABASE databasnamn;`
    },
    {
        id: 209,
        title: 'Create Table with Common Types',
        language: 'postgresql',
        code: `-- Skapa en tabell med vanliga datatyper
CREATE TABLE users (
    id SERIAL PRIMARY KEY,        -- Automatiskt ökande ID
    username TEXT UNIQUE NOT NULL, -- Text som måste finnas och vara unik
    email VARCHAR(100),            -- Text med begränsad längd
    age INTEGER,                  -- Heltal
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`
    },
    {
        id: 210,
        title: 'Alter Table - Add/Drop Column',
        language: 'postgresql',
        code: `-- Lägg till en kolumn i efterhand
ALTER TABLE users ADD COLUMN phone_number TEXT;

-- Radera en hel tabell
DROP TABLE users;`
    },
    {
        id: 211,
        title: 'Insert Data - Single and Multiple Rows',
        language: 'postgresql',
        code: `-- Lägg till en rad
INSERT INTO users (username, email, age) 
VALUES ('Kalle', 'kalle@mail.se', 25);

-- Lägg till flera rader samtidigt
INSERT INTO users (username, email, age) 
VALUES 
    ('Sara', 'sara@mail.se', 30),
    ('Erik', 'erik@mail.se', 22);

-- Lägg till data baserat på en SELECT-fråga
-- Använd för att skapa data från befintliga tabeller
INSERT INTO orders (customer_id, order_date)
SELECT id, '2024-01-15'
FROM customers
WHERE name = 'Alice';

-- Lägg till data i länktabell (junction table) med JOIN
-- Exempel: orders_products (order_id, product_id)
INSERT INTO order_items (order_id, product_id, quantity)
SELECT o.id, p.id, 1
FROM orders o
JOIN customers c ON c.id = o.customer_id
JOIN products p ON p.name = 'Laptop'
WHERE c.name = 'Alice';`
    },
    {
        id: 212,
        title: 'Select Queries - Basic',
        language: 'postgresql',
        code: `-- Hämta ALLT från en tabell
SELECT * FROM users;

-- Hämta specifika kolumner
SELECT username, age FROM users;

-- Filtrera rader (WHERE)
SELECT * FROM users WHERE age >= 18;`
    },
    {
        id: 213,
        title: 'Select with ORDER BY and LIMIT',
        language: 'postgresql',
        code: `-- Sortera (ORDER BY) - ASC (stigande) eller DESC (fallande)
SELECT * FROM users ORDER BY age DESC;

-- Begränsa antal svar
SELECT * FROM users LIMIT 10;`
    },
    {
        id: 214,
        title: 'Update and Delete Data',
        language: 'postgresql',
        code: `-- Ändra värden för en specifik rad
UPDATE users 
SET age = 26 
WHERE username = 'Kalle';

-- Radera specifika rader
DELETE FROM users 
WHERE id = 1;

-- VIKTIGT: Använd alltid WHERE för att inte påverka hela tabellen!`
    },
    {
        id: 215,
        title: 'Aggregation Functions',
        language: 'postgresql',
        code: `-- COUNT - Räkna antal rader
SELECT COUNT(*) FROM users;
SELECT COUNT(email) FROM users; -- Räkna icke-NULL värden

-- AVG - Räkna ut medelvärde
SELECT AVG(age) FROM users;
SELECT AVG(price) FROM products;

-- SUM - Summera värden
SELECT SUM(quantity) FROM orders;
SELECT SUM(price * quantity) FROM order_items;

-- MIN - Hitta minsta värde
SELECT MIN(age) FROM users;
SELECT MIN(price) FROM products;

-- MAX - Hitta största värde
SELECT MAX(age) FROM users;
SELECT MAX(created_at) FROM posts;

-- Kombinera flera aggregeringsfunktioner
SELECT 
    COUNT(*) as total_users,
    AVG(age) as average_age,
    MIN(age) as youngest,
    MAX(age) as oldest
FROM users;`
    },
    {
        id: 216,
        title: 'GROUP BY - Gruppera Data',
        language: 'postgresql',
        code: `-- Gruppera data (t.ex. hur många användare per ålder)
SELECT age, COUNT(*) 
FROM users 
GROUP BY age;`
    },
    {
        id: 217,
        title: 'JOIN Tables',
        language: 'postgresql',
        code: `-- ===== SÅ HÄR TÄNKER DU NÄR DU JOINNAR =====
-- 1. Vad vill jag visa? (username + posts)
-- 2. Vilken tabell har det jag MEST vill ha? → FROM users
-- 3. Vilken tabell ska jag koppla till? → JOIN posts
-- 4. Hur kopplas de? Hitta foreign key! 
--    posts har "user_id" som pekar på users.id
--    → ON users.id = posts.user_id

-- TUMREGEL: 
-- FROM [huvud-tabell]
-- JOIN [relaterad-tabell] ON [huvud].id = [relaterad].[foreign_key]

-- ===== INNER JOIN =====
-- Hämta bara rader som matchar i BÅDA tabellerna
-- Exempel: Användare som HAR skrivit posts
SELECT users.username, posts.title, posts.created_at
FROM users
INNER JOIN posts ON users.id = posts.user_id;

-- ===== LEFT JOIN =====
-- Hämta ALLA från vänster tabell + matchningar från höger
-- Exempel: ALLA användare, även de utan posts (visar NULL)
SELECT users.username, posts.title
FROM users
LEFT JOIN posts ON users.id = posts.user_id;

-- ===== PRAKTISKT EXEMPEL =====
-- Användare och deras antal posts (inkl. de med 0 posts)
SELECT 
    users.username,
    COUNT(posts.id) as post_count
FROM users
LEFT JOIN posts ON users.id = posts.user_id
GROUP BY users.id, users.username;`
    },
    {
        id: 218,
        title: 'Subqueries - Nested Queries',
        language: 'postgresql',
        code: `-- Subquery i WHERE (filtrera baserat på resultat från annan fråga)
SELECT username, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);

-- Subquery i FROM (använd resultat som en temporär tabell)
SELECT avg_age_per_city.city, avg_age_per_city.average_age
FROM (
    SELECT city, AVG(age) as average_age
    FROM users
    GROUP BY city
) AS avg_age_per_city
WHERE avg_age_per_city.average_age > 25;

-- Subquery med IN (kolla om värde finns i lista från subquery)
SELECT name, price
FROM products
WHERE category_id IN (
    SELECT id FROM categories WHERE name IN ('Electronics', 'Books')
);

-- Subquery med EXISTS (kolla om något finns)
SELECT c.name, c.email
FROM customers c
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- Subquery i SELECT (lägg till beräknad kolumn)
SELECT 
    p.name,
    p.price,
    (SELECT AVG(price) FROM products) as avg_price,
    p.price - (SELECT AVG(price) FROM products) as price_difference
FROM products p;`
    },
    {
        id: 219,
        title: 'PostgreSQL Data Types & Constraints Cheat Sheet',
        language: 'postgresql',
        code: `-- ===== COMMON DATA TYPES =====

-- VARCHAR(n) - Text with max length
-- Use for: names, emails, usernames, short text
email VARCHAR(255) UNIQUE NOT NULL

-- TEXT - Unlimited length text  
-- Use for: descriptions, articles, long content
description TEXT

-- INT / INTEGER - Whole numbers (-2 billion to +2 billion)
-- Use for: counts, quantities, regular IDs
age INT CHECK (age >= 0)
quantity INT DEFAULT 0

-- BIGINT - Very large whole numbers
-- Use for: large IDs, big counters, unix timestamps
user_count BIGINT

-- SERIAL - Auto-incrementing integer (1, 2, 3, ...)
-- Use for: primary key IDs (most common)
id SERIAL PRIMARY KEY

-- BIGSERIAL - Auto-incrementing big integer
-- Use for: primary keys in very large tables
id BIGSERIAL PRIMARY KEY

-- DECIMAL(precision, scale) / NUMERIC - Exact decimal numbers
-- Use for: money, prices, precise calculations
price DECIMAL(10, 2)  -- Up to 99999999.99
balance NUMERIC(15, 2) DEFAULT 0.00

-- REAL / FLOAT - Approximate decimal numbers
-- Use for: scientific data, measurements (not money!)
temperature REAL
coordinates FLOAT

-- BOOLEAN - True/false values
-- Use for: flags, status checks
is_active BOOLEAN DEFAULT true
is_deleted BOOLEAN DEFAULT false
email_verified BOOLEAN

-- DATE - Date only (YYYY-MM-DD)
-- Use for: birthdays, deadlines, start dates
birth_date DATE
deadline DATE

-- TIME - Time only (HH:MM:SS)
-- Use for: schedules, opening hours
opening_time TIME
duration TIME

-- TIMESTAMP - Date + time (no timezone)
-- Use for: created_at, updated_at in single timezone apps
created_at TIMESTAMP DEFAULT NOW()
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- TIMESTAMPTZ - Date + time WITH timezone
-- Use for: global apps, accurate time tracking across timezones
created_at TIMESTAMPTZ DEFAULT NOW()

-- JSON - JSON data (stored as text)
-- JSONB - Binary JSON (faster, recommended)
-- Use for: flexible schemas, metadata, settings
metadata JSONB
settings JSON

-- ARRAY - Array of any type
-- Use for: tags, lists, multiple values
tags TEXT[]
numbers INT[]

-- UUID - Universally Unique Identifier
-- Use for: distributed systems, public IDs, security
public_id UUID DEFAULT gen_random_uuid()


-- ===== CONSTRAINTS - Data Rules =====

-- PRIMARY KEY - Unique identifier, cannot be NULL
-- Each table should have ONE
id SERIAL PRIMARY KEY

-- UNIQUE - Value must be unique across all rows
-- Use for: emails, usernames, unique codes
email VARCHAR(255) UNIQUE NOT NULL
username VARCHAR(50) UNIQUE

-- NOT NULL - Field must have a value
-- Use for: required fields
name VARCHAR(100) NOT NULL
email VARCHAR(255) NOT NULL

-- DEFAULT - Sets value if none provided
-- Use for: timestamps, status flags, default values
status VARCHAR(20) DEFAULT 'pending'
created_at TIMESTAMP DEFAULT NOW()
is_active BOOLEAN DEFAULT true
balance DECIMAL(10,2) DEFAULT 0.00

-- CHECK - Custom validation rule
-- Use for: value ranges, allowed values
age INT CHECK (age >= 0 AND age <= 150)
price DECIMAL(10,2) CHECK (price > 0)
status VARCHAR(20) CHECK (status IN ('active', 'pending', 'deleted'))

-- REFERENCES - Foreign key (links to another table)
-- Use for: relationships between tables
user_id INT REFERENCES users(id)
category_id INT REFERENCES categories(id) ON DELETE CASCADE


-- ===== REAL WORLD EXAMPLES =====

CREATE TABLE users (
  id SERIAL PRIMARY KEY,                    -- Auto-increment ID
  email VARCHAR(255) UNIQUE NOT NULL,       -- Required, unique email
  username VARCHAR(50) UNIQUE NOT NULL,     -- Required, unique username
  password_hash VARCHAR(255) NOT NULL,      -- Required password
  full_name TEXT,                           -- Optional full name
  age INT CHECK (age >= 13 AND age <= 120), -- Age validation
  balance DECIMAL(10,2) DEFAULT 0.00,       -- Money with 2 decimals
  is_active BOOLEAN DEFAULT true,           -- Active status flag
  role VARCHAR(20) DEFAULT 'user',          -- Default role
  settings JSONB,                           -- Flexible settings
  tags TEXT[],                              -- Array of tags
  created_at TIMESTAMPTZ DEFAULT NOW(),     -- Auto timestamp
  updated_at TIMESTAMPTZ DEFAULT NOW()      -- Auto timestamp
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,  -- Foreign key
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' 
    CHECK (status IN ('draft', 'published', 'archived')),
  view_count INT DEFAULT 0 CHECK (view_count >= 0),
  metadata JSONB,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INT REFERENCES posts(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  likes INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ===== QUICK REFERENCE TABLE =====
/*
TYPE          | SIZE    | RANGE/INFO                | USE FOR
------------- | ------- | ------------------------- | -----------------
VARCHAR(n)    | Variable| Up to n characters        | Names, emails
TEXT          | Variable| Unlimited                 | Long content
INT           | 4 bytes | -2B to +2B                | Regular numbers
BIGINT        | 8 bytes | Very large numbers        | Big IDs, counts
SERIAL        | 4 bytes | Auto 1,2,3...             | Primary keys
DECIMAL(p,s)  | Variable| Exact decimals            | Money, prices
BOOLEAN       | 1 byte  | true/false                | Flags, status
TIMESTAMP     | 8 bytes | Date + time               | Created dates
TIMESTAMPTZ   | 8 bytes | Date + time + timezone    | Global apps
JSONB         | Variable| Binary JSON               | Flexible data
TEXT[]        | Variable| Array of text             | Tags, lists
UUID          | 16 bytes| Unique identifier         | Public IDs

CONSTRAINT    | PURPOSE
------------- | -----------------------------------------------
PRIMARY KEY   | Unique identifier, not null
UNIQUE        | No duplicate values allowed
NOT NULL      | Value is required
DEFAULT x     | Use x if no value provided
CHECK (...)   | Custom validation rule
REFERENCES    | Link to another table (foreign key)
*/`
    },
    {
        id: 220,
        title: 'Database Tools & Resources',
        language: 'postgresql',
        code: `-- ===== NYTTIGA VERKTYG =====

-- 📊 DB Diagram - Visualisera och designa databasstrukturer
-- https://dbdiagram.io/d
-- Perfekt för att: 
-- - Rita upp tabeller och relationer
-- - Planera databas-design före implementation
-- - Dela databas-schema med teamet
-- - Generera SQL från diagram

-- Exempel på användning:
-- 1. Gå till https://dbdiagram.io/d
-- 2. Rita dina tabeller och relationer
-- 3. Exportera som SQL eller PNG
-- 4. Använd SQL-koden för att skapa tabeller

-- Tips: Spara länken till dina diagram för framtida referens!`
    }
];

export function useSnippets() {
  const [snippets, setSnippets] = useState(INITIAL_SNIPPETS);
  const [filterText, setFilterText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter snippets by search text and sort alphabetically
  const filteredSnippets = useMemo(() => {
    return snippets
      .filter(snippet => 
        snippet.title.toLowerCase().includes(filterText.toLowerCase()) ||
        snippet.code.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [snippets, filterText]);

  // Add new snippet to list
  const addSnippet = (snippet) => {
    const newSnippet = { ...snippet, id: Date.now() };
    setSnippets([...snippets, newSnippet]);
  };

  // Remove snippet from list
  const removeSnippet = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  // Update existing snippet in list
  const updateSnippet = (id, updatedData) => {
    setSnippets(snippets.map(snippet => 
      snippet.id === id ? { ...snippet, ...updatedData } : snippet
    ));
  };

  // Find specific snippet by id
  const findSnippetById = (id) => {
    return snippets.find(snippet => snippet.id === id);
  };

  // Find snippets by criteria
  const findSnippets = (predicate) => {
    return snippets.filter(predicate);
  };

  // Async fetch single API endpoint
  const fetchSnippets = async (url) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSnippets(data);
      return data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching snippets:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Async fetch multiple endpoints with Promise.all
  const fetchMultipleResources = async (urls) => {
    setIsLoading(true);
    setError(null);

    try {
      const promises = urls.map(url => 
        fetch(url).then(res => {
          if (!res.ok) throw new Error(`Failed to fetch ${url}`);
          return res.json();
        })
      );

      const results = await Promise.all(promises);
      
      // Combine results if they're arrays, or return as-is
      const combinedSnippets = results.flat();
      setSnippets(combinedSnippets);
      return results;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching multiple resources:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Copy code to clipboard
  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
  };

  const addLink = (snippetId, link) => {
    setSnippets(snippets.map(snippet => {
      if (snippet.id === snippetId) {
        const relatedLinks = snippet.relatedLinks || [];
        return { ...snippet, relatedLinks: [...relatedLinks, link] };
      }
      return snippet;
    }));
  };

  const removeLink = (snippetId, linkToRemove) => {
    setSnippets(snippets.map(snippet => {
      if (snippet.id === snippetId) {
        const relatedLinks = snippet.relatedLinks || [];
        return {
          ...snippet,
          relatedLinks: relatedLinks.filter(
            link => !(link.id === linkToRemove.id && link.type === linkToRemove.type)
          )
        };
      }
      return snippet;
    }));
  };

  return {
    // State
    snippets,
    filteredSnippets,
    filterText,
    isLoading,
    error,
    
    // Setters
    setFilterText,
    
    // CRUD operations
    addSnippet,
    removeSnippet,
    updateSnippet,
    
    // Find operations
    findSnippetById,
    findSnippets,
    
    // API operations
    fetchSnippets,
    fetchMultipleResources,
    
    // Utility
    copyToClipboard,
    
    // Linking
    addLink,
    removeLink,
  };
}
