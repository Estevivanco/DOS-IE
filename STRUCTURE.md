# DOSIE Project Structure

## Overview

DOSIE (Developer Operating System - Interactive Environment) is a suite of developer productivity tools built as separate, focused applications.

## Folder Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Main routing configuration
├── index.css                # Global styles
├── App.css                  # App-level styles
│
├── components/              # Shared/reusable components
│   ├── Home.jsx            # Landing page with tool grid
│   ├── Home.css
│   ├── Navigation.jsx      # Main navigation component
│   └── Navigation.css
│
├── layouts/                 # Layout components
│   ├── MainLayout.jsx      # Main app layout with nav
│   └── MainLayout.css
│
├── features/                # Feature modules (each is a mini-app)
│   ├── SnippetRecall/      # Code snippet management
│   │   ├── SnippetRecall.jsx
│   │   └── SnippetRecall.css
│   │
│   ├── BugMemories/        # Bug tracking and solutions
│   │   ├── BugMemories.jsx
│   │   └── BugMemories.css
│   │
│   ├── ProjectBootstrap/   # Project templates & scaffolding
│   │   ├── ProjectBootstrap.jsx
│   │   └── ProjectBootstrap.css
│   │
│   └── DecisionLog/        # Technical decision documentation
│       ├── DecisionLog.jsx
│       └── DecisionLog.css
│
├── hooks/                   # Custom React hooks (empty for now)
├── utils/                   # Utility functions (empty for now)
└── assets/                  # Images, icons, static files
```

## Features

### 1. Snippet Recall (📝)

Save and quickly recall code snippets across projects.

- **Route**: `/snippets`
- **Status**: Skeleton created

### 2. Bug Memories (🐛)

Track bugs and their solutions for future reference.

- **Route**: `/bugs`
- **Status**: Skeleton created

### 3. Project Bootstrap (🚀)

Quick start templates and project scaffolding.

- **Route**: `/bootstrap`
- **Status**: Skeleton created

### 4. Decision Log (💡)

Document technical decisions and their rationale.

- **Route**: `/decisions`
- **Status**: Skeleton created

## Architecture Principles

1. **Modularity**: Each feature is self-contained in its own folder
2. **Simplicity**: Small, focused apps rather than one monolithic application
3. **Independence**: Features can be developed and tested independently
4. **Scalability**: Easy to add new tools to the suite

## Development

```bash
npm install
npm run dev
```

## Next Steps

1. Implement local storage for each feature
2. Add create/read/update/delete functionality
3. Add export/import capabilities
4. Implement search and filtering
5. Add tags and categorization
