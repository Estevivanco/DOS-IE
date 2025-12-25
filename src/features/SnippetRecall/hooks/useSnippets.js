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
        language: 'javascript',
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
        language: 'javascript',
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
        language: 'javascript',
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
        language: 'javascript',
        code: `import { useMemo, useCallback, useState } from 'react';

// useMemo - memoize expensive calculations
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
        language: 'javascript',
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
