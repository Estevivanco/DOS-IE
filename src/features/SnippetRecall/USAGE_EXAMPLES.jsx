// Example usage of all the new functions in useSnippets hook

import { useSnippets } from './hooks/useSnippets';

function SnippetExamples() {
  const {
    // State
    snippets,
    filteredSnippets,
    isLoading,
    error,
    
    // CRUD Operations
    addSnippet,
    removeSnippet,
    updateSnippet,
    
    // Find Operations
    findSnippetById,
    findSnippets,
    
    // API Operations
    fetchSnippets,
    fetchMultipleResources,
  } = useSnippets();

  // ===== REMOVE FROM LIST =====
  const handleRemove = (id) => {
    removeSnippet(id);
    // Removes snippet with the given id from the list
  };

  // ===== EDIT/UPDATE LIST =====
  const handleUpdate = (id) => {
    updateSnippet(id, {
      title: 'Updated Title',
      code: 'console.log("updated");',
      language: 'javascript'
    });
    // Updates the snippet with matching id
  };

  // ===== FIND SOMETHING IN LIST =====
  const examples = {
    // Find by ID
    findById: () => {
      const snippet = findSnippetById(1);
      console.log('Found snippet:', snippet);
    },

    // Find by custom criteria
    findJavaScript: () => {
      const jsSnippets = findSnippets(s => s.language === 'javascript');
      console.log('JavaScript snippets:', jsSnippets);
    },

    // Find by title containing text
    findByTitle: () => {
      const results = findSnippets(s => 
        s.title.toLowerCase().includes('react')
      );
      console.log('React snippets:', results);
    },

    // Complex find
    findLongSnippets: () => {
      const longSnippets = findSnippets(s => s.code.length > 100);
      console.log('Long snippets:', longSnippets);
    }
  };

  // ===== ASYNC FETCH API =====
  const handleFetchSnippets = async () => {
    try {
      const data = await fetchSnippets('https://api.example.com/snippets');
      console.log('Fetched snippets:', data);
      // Automatically sets snippets state
    } catch (err) {
      console.error('Fetch failed:', err);
      // Error is available in the 'error' state
    }
  };

  // ===== PROMISE.ALL FETCH =====
  const handleFetchMultiple = async () => {
    const urls = [
      'https://api.example.com/snippets/javascript',
      'https://api.example.com/snippets/python',
      'https://api.example.com/snippets/css'
    ];

    try {
      const results = await fetchMultipleResources(urls);
      console.log('All results:', results);
      // Results are combined and set to snippets state
      // Returns array of all responses: [jsSnippets, pySnippets, cssSnippets]
    } catch (err) {
      console.error('One or more fetches failed:', err);
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <button onClick={() => handleRemove(1)}>Remove Snippet 1</button>
      <button onClick={() => handleUpdate(1)}>Update Snippet 1</button>
      <button onClick={examples.findById}>Find by ID</button>
      <button onClick={handleFetchSnippets}>Fetch Snippets</button>
      <button onClick={handleFetchMultiple}>Fetch Multiple</button>
    </div>
  );
}

/* 
 * FUNCTION SUMMARY
 * ================
 * 
 * 1. removeSnippet(id)
 *    - Removes snippet from list by id
 * 
 * 2. updateSnippet(id, updatedData)
 *    - Updates snippet properties by id
 * 
 * 3. findSnippetById(id)
 *    - Returns single snippet by id
 * 
 * 4. findSnippets(predicate)
 *    - Returns array of snippets matching predicate function
 * 
 * 5. fetchSnippets(url)
 *    - Async fetch from single API endpoint
 *    - Sets loading state, handles errors
 * 
 * 6. fetchMultipleResources(urls)
 *    - Async fetch multiple endpoints with Promise.all
 *    - Combines results, sets loading state
 */

export default SnippetExamples;
