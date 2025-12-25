# SnippetRecall Feature Structure

## Overview

Clean, maintainable structure for the Snippet Recall feature with separated concerns.

## Folder Structure

```
SnippetRecall/
├── SnippetRecall.jsx          # Main container component
├── SnippetRecall.css          # All styles for the feature
│
├── components/                 # Presentational components
│   ├── index.js               # Barrel export
│   ├── SnippetCard.jsx        # Individual snippet display
│   ├── SnippetForm.jsx        # Add/edit snippet form
│   └── FilterBar.jsx          # Search/filter input
│
└── hooks/                      # Custom hooks
    └── useSnippets.js         # Business logic & state management
```

## Architecture

### 🎯 Main Component (`SnippetRecall.jsx`)

- **Role**: Orchestrator/Container
- **Responsibilities**: Layout, UI state (show/hide form), component composition
- **Size**: ~60 lines (was ~160 lines)

### 🧩 Sub-Components (`components/`)

#### `SnippetCard.jsx`

- Displays individual snippet
- Handles copy & delete actions
- Props: `snippet`, `onCopy`, `onDelete`

#### `SnippetForm.jsx`

- Form for adding new snippets
- Manages its own form state
- Props: `onSave`, `onCancel`

#### `FilterBar.jsx`

- Search input and count display
- Props: `filterText`, `onFilterChange`, `totalCount`, `filteredCount`

### 🪝 Custom Hook (`hooks/useSnippets.js`)

- **Purpose**: Centralize business logic
- **Handles**: State management, filtering, CRUD operations
- **Returns**: All data and functions needed by the UI

## Benefits

✅ **Single Responsibility** - Each component has one clear purpose  
✅ **Reusability** - Components can be used in other features  
✅ **Testability** - Easy to test isolated components  
✅ **Maintainability** - Clear where to make changes  
✅ **Scalability** - Easy to add new features (tags, categories, etc.)

## Usage Pattern

```javascript
// Main component imports and uses the hook
const { snippets, addSnippet, ... } = useSnippets();

// Pass data down to presentational components
<SnippetCard snippet={snippet} onCopy={...} onDelete={...} />
```

## Next Steps

When adding new features, follow this pattern:

1. Add new components to `components/`
2. Add business logic to `hooks/useSnippets.js`
3. Keep `SnippetRecall.jsx` as a simple orchestrator
