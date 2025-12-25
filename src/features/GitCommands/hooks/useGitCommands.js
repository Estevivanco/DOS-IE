import { useState, useMemo } from 'react';

const INITIAL_COMMANDS = [
  // COMMON WORKFLOWS
  {
    id: 1,
    title: 'Push Your Branch',
    commands: [
      'git add .',
      'git commit -m "your message"',
      'git push origin branch-name'
    ],
    description: 'Complete workflow to commit and push your changes',
    category: 'Workflows',
    useCase: 'Standard workflow after making changes',
    dangerous: false,
    isWorkflow: true,
    notes: 'Replace "branch-name" with your actual branch. Use "git add filename" to stage specific files only.',
    relatedLinks: [
      { id: 1, type: 'decision', title: 'Used conventional commits for better history' }
    ]
  },
  {
    id: 2,
    title: 'Update Your Branch',
    commands: [
      'git fetch origin',
      'git pull --rebase origin branch-name',
      '# Resolve any conflicts if they appear',
      'git push origin branch-name'
    ],
    description: 'Get latest changes from remote and update your branch',
    category: 'Workflows',
    useCase: 'Before starting work or when others have pushed changes',
    dangerous: false,
    isWorkflow: true,
    notes: 'Using --rebase keeps a cleaner, linear history compared to merge.',
    relatedLinks: [
      { id: 2, type: 'snippet', title: 'Debounce hook implementation' }
    ]
  },
  {
    id: 3,
    title: 'Update Development Branch',
    commands: [
      'git checkout develop',
      'git pull origin develop',
      'git checkout your-branch',
      'git merge develop',
      'git push origin your-branch'
    ],
    description: 'Pull latest develop and merge into your feature branch',
    category: 'Workflows',
    useCase: 'Keep your feature branch synchronized with main development',
    dangerous: false,
    isWorkflow: true,
    notes: 'Alternative: use "git rebase develop" instead of merge for cleaner history.'
  },
  {
    id: 4,
    title: 'Create New Feature Branch',
    commands: [
      'git checkout develop',
      'git pull origin develop',
      'git checkout -b feature/your-feature-name',
      'git push -u origin feature/your-feature-name'
    ],
    description: 'Start new feature branch from latest develop',
    category: 'Workflows',
    useCase: 'Beginning work on a new feature',
    dangerous: false,
    isWorkflow: true,
    notes: 'Follow your team\'s naming convention: feature/, bugfix/, hotfix/, etc.'
  },
  {
    id: 5,
    title: 'Fix Merge Conflicts',
    commands: [
      'git status',
      '# Edit conflicted files (look for <<<<<<< markers)',
      'git add .',
      'git commit -m "Resolved merge conflicts"',
      'git push origin branch-name'
    ],
    description: 'Resolve and complete merge when conflicts occur',
    category: 'Workflows',
    useCase: 'After merge or rebase conflicts appear',
    dangerous: false,
    isWorkflow: true,
    notes: 'Open conflicted files, look for <<<<<<< HEAD markers, choose the correct code, remove markers.'
  },
  {
    id: 6,
    title: 'Amend Last Commit',
    commands: [
      'git add .',
      'git commit --amend --no-edit',
      'git push --force-with-lease origin branch-name'
    ],
    description: 'Add forgotten files to last commit',
    category: 'Workflows',
    useCase: 'Forgot to include files in last commit',
    dangerous: true,
    isWorkflow: true,
    notes: 'Use --no-edit to keep same message, or remove it to change message.'
  },
  {
    id: 7,
    title: 'Undo Last Commit (Keep Changes)',
    commands: [
      'git reset --soft HEAD~1',
      '# Make your changes',
      'git add .',
      'git commit -m "new message"',
      'git push origin branch-name'
    ],
    description: 'Undo last commit but keep the changes to recommit',
    category: 'Workflows',
    useCase: 'Commit was wrong but changes are good',
    dangerous: false,
    isWorkflow: true,
    notes: 'Changes stay staged. Use --mixed instead of --soft to unstage them.'
  },
  {
    id: 8,
    title: 'Stash and Switch Branch',
    commands: [
      'git stash save "work in progress"',
      'git checkout other-branch',
      '# Do your work on other branch',
      'git checkout original-branch',
      'git stash pop'
    ],
    description: 'Save current work, switch branches, then restore',
    category: 'Workflows',
    useCase: 'Need to switch branches but have uncommitted changes',
    dangerous: false,
    isWorkflow: true,
    notes: 'Stash saves your changes without committing. Pop applies and removes from stash.'
  },
  {
    id: 9,
    title: 'Rebase on Develop (Clean History)',
    commands: [
      'git checkout develop',
      'git pull origin develop',
      'git checkout your-branch',
      'git rebase develop',
      '# Resolve conflicts if any',
      'git push --force-with-lease origin your-branch'
    ],
    description: 'Reapply your commits on top of latest develop',
    category: 'Workflows',
    useCase: 'Before creating PR to have clean, linear history',
    dangerous: true,
    isWorkflow: true,
    notes: 'Rewriting history requires force push. Use --force-with-lease for safety.'
  },
  {
    id: 10,
    title: 'View Branch Status',
    commands: [
      'git status',
      'git log --oneline --graph --decorate -10',
      'git diff'
    ],
    description: 'Check current state of your branch',
    category: 'Info',
    useCase: 'Understanding what changed and branch status',
    dangerous: false,
    isWorkflow: true,
    notes: 'Use git diff --staged to see staged changes only.'
  },
  {
    id: 11,
    title: 'Delete Local and Remote Branch',
    commands: [
      'git checkout develop',
      'git branch -d branch-name',
      'git push origin --delete branch-name'
    ],
    description: 'Clean up merged branch locally and remotely',
    category: 'Cleanup',
    useCase: 'After PR is merged and branch is no longer needed',
    dangerous: true,
    isWorkflow: true,
    notes: 'Use -D instead of -d to force delete unmerged branch.'
  },
  {
    id: 12,
    title: 'Cherry-Pick Specific Commit',
    commands: [
      'git log --oneline other-branch',
      '# Copy the commit hash you want',
      'git checkout your-branch',
      'git cherry-pick commit-hash',
      'git push origin your-branch'
    ],
    description: 'Apply specific commit from another branch',
    category: 'Advanced',
    useCase: 'Need one specific commit without merging entire branch',
    dangerous: false,
    isWorkflow: true,
    notes: 'Useful for backporting fixes or selectively applying changes.'
  },
  {
    id: 13,
    title: 'Initialize New Vite Project',
    commands: [
      'npm create vite@latest project-name',
      '# Select React and JavaScript/TypeScript',
      'cd project-name',
      'npm install',
      'npm install react-router-dom@latest'
    ],
    description: 'Setup new Vite React project with routing',
    category: 'Setup',
    useCase: 'Starting a new React project from scratch',
    dangerous: false,
    isWorkflow: true,
    notes: 'Replace "project-name" with your desired folder name. Use dot (.) to create in current directory.'
  },
  {
    id: 14,
    title: 'Create Git Repository',
    commands: [
      'git init',
      'git add .',
      'git commit -m "Initial commit"',
      'git branch -M main',
      '# Connect local repo to GitHub remote repository',
      'git remote add origin https://github.com/username/repo.git',
      'git push -u origin main'
    ],
    description: 'Initialize local repo and push to GitHub',
    category: 'Setup',
    useCase: 'Starting version control for new project',
    dangerous: false,
    isWorkflow: true,
    notes: 'FIRST: Go to GitHub.com → New Repository → Create empty repo (don\'t initialize with README). THEN: Copy the repo URL and replace username/repo in command above.'
  },
  {
    id: 15,
    title: 'Push and Merge to Main',
    commands: [
      'git checkout main',
      'git pull origin main',
      'git merge your-branch',
      '# Resolve any conflicts if they appear',
      'git push origin main'
    ],
    description: 'Merge feature branch into main and push',
    category: 'Workflows',
    useCase: 'Merging completed feature into main branch',
    dangerous: true,
    isWorkflow: true,
    notes: 'Better to use Pull Requests in GitHub/GitLab. Direct merge to main should be rare.'
  },
  {
    id: 16,
    title: 'Update Main Branch',
    commands: [
      'git checkout main',
      'git fetch origin',
      'git pull origin main',
      '# Or use: git pull --rebase origin main'
    ],
    description: 'Pull latest changes from remote main branch',
    category: 'Workflows',
    useCase: 'Sync your local main with remote before starting new work',
    dangerous: false,
    isWorkflow: true,
    notes: 'Always update main before creating new feature branches.'
  }
];

export function useGitCommands() {
  const [commands, setCommands] = useState(INITIAL_COMMANDS);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showDangerous, setShowDangerous] = useState(true);

  const filteredCommands = useMemo(() => {
    return commands.filter(cmd => {
      const commandText = cmd.isWorkflow 
        ? cmd.commands.join(' ').toLowerCase()
        : (cmd.command || '').toLowerCase();
      
      const matchesText = 
        cmd.title.toLowerCase().includes(filterText.toLowerCase()) ||
        commandText.includes(filterText.toLowerCase()) ||
        cmd.description.toLowerCase().includes(filterText.toLowerCase());
      
      const matchesCategory = filterCategory === 'all' || cmd.category === filterCategory;
      const matchesDangerous = showDangerous || !cmd.dangerous;
      
      return matchesText && matchesCategory && matchesDangerous;
    });
  }, [commands, filterText, filterCategory, showDangerous]);

  const addCommand = (command) => {
    const newCommand = { ...command, id: Date.now() };
    setCommands([...commands, newCommand]);
  };

  const removeCommand = (id) => {
    setCommands(commands.filter(c => c.id !== id));
  };

  const updateCommand = (id, updatedData) => {
    setCommands(commands.map(command => 
      command.id === id ? { ...command, ...updatedData } : command
    ));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const addLink = (commandId, linkItem) => {
    setCommands(commands.map(cmd => {
      if (cmd.id === commandId) {
        const relatedLinks = cmd.relatedLinks || [];
        // Prevent duplicates
        if (!relatedLinks.find(link => link.id === linkItem.id && link.type === linkItem.type)) {
          return { ...cmd, relatedLinks: [...relatedLinks, linkItem] };
        }
      }
      return cmd;
    }));
  };

  const removeLink = (commandId, linkToRemove) => {
    setCommands(commands.map(cmd => {
      if (cmd.id === commandId && cmd.relatedLinks) {
        return {
          ...cmd,
          relatedLinks: cmd.relatedLinks.filter(
            link => !(link.id === linkToRemove.id && link.type === linkToRemove.type)
          )
        };
      }
      return cmd;
    }));
  };

  return {
    commands,
    filteredCommands,
    filterText,
    filterCategory,
    showDangerous,
    setFilterText,
    setFilterCategory,
    setShowDangerous,
    addCommand,
    removeCommand,
    updateCommand,
    copyToClipboard,
    addLink,
    removeLink,
  };
}
