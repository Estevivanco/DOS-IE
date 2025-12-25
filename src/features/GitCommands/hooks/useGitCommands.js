import { useState, useMemo } from 'react';

const INITIAL_COMMANDS = [
  // COMMON WORKFLOWS
  {
    id: 1,
    title: 'Push Your Branch',
    commands: [
      '// Stage all changed files for commit',
      'git add .',
      '// Create commit with descriptive message',
      'git commit -m "your message"',
      '// Upload commits to remote repository',
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
      '// Download latest commits from remote (doesn\'t modify local files)',
      'git fetch origin',
      '// Apply remote changes, then replay your commits on top',
      'git pull --rebase origin branch-name',
      '// Resolve any conflicts if they appear',
      '# Resolve any conflicts if they appear',
      '// Upload your rebased commits to remote',
      'git push origin branch-name'
    ],
    description: 'Get latest changes from remote and update your branch',
    category: 'Workflows',
    useCase: 'Before starting work or when others have pushed changes',
    dangerous: false,
    isWorkflow: true,
    notes: '--rebase replays your commits on top of the latest remote changes, creating a clean linear history (A→B→C→D→E) instead of merge commits with branches. This makes the project history easier to read and understand.',
    relatedLinks: [
      { id: 2, type: 'snippet', title: 'Debounce hook implementation' }
    ]
  },
  {
    id: 3,
    title: 'Update Development Branch',
    commands: [
      '// Switch to develop branch',
      'git checkout develop',
      '// Get latest develop changes from remote',
      'git pull origin develop',
      '// Switch back to your feature branch',
      'git checkout your-branch',
      '// Rebase your commits on top of latest develop',
      'git rebase develop',
      '// Resolve conflicts if any',
      '# Resolve conflicts if any',
      '// Force push with safety check',
      'git push --force-with-lease origin your-branch'
    ],
    description: 'Pull latest develop and rebase your branch on top',
    category: 'Workflows',
    useCase: 'Keep your feature branch synchronized with main development',
    dangerous: true,
    isWorkflow: true,
    notes: 'Rebase makes your commits appear as if they were always built on the latest develop, avoiding messy merge commits. Creates clean history: develop commits → your commits (linear). Use "git merge develop" if you prefer to preserve the exact timeline.'
  },
  {
    id: 4,
    title: 'Create New Feature Branch',
    commands: [
      '// Switch to develop branch',
      'git checkout develop',
      '// Make sure develop is up-to-date',
      'git pull origin develop',
      '// Create and switch to new branch',
      'git checkout -b feature/your-feature-name',
      '// Push new branch and set upstream tracking',
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
      '// Check which files have conflicts',
      'git status',
      '// Edit conflicted files (look for <<<<<<< markers)',
      '# Edit conflicted files (look for <<<<<<< markers)',
      '// Stage resolved files',
      'git add .',
      '// Commit the resolution',
      'git commit -m "Resolved merge conflicts"',
      '// Push to remote',
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
      '// Stage the forgotten files',
      'git add .',
      '// Add staged files to last commit (keep same message)',
      'git commit --amend --no-edit',
      '// Force push safely (fails if remote changed)',
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
      '// Remove last commit but keep files staged',
      'git reset --soft HEAD~1',
      '// Make your changes',
      '# Make your changes',
      '// Stage any additional changes',
      'git add .',
      '// Create new commit with corrected message/changes',
      'git commit -m "new message"',
      '// Push the new commit',
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
      '// Temporarily save uncommitted changes',
      'git stash save "work in progress"',
      '// Switch to different branch (now clean)',
      'git checkout other-branch',
      '// Do your work on other branch',
      '# Do your work on other branch',
      '// Switch back to original branch',
      'git checkout original-branch',
      '// Restore your saved changes and remove from stash',
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
      '// Switch to develop branch',
      'git checkout develop',
      '// Get latest develop changes',
      'git pull origin develop',
      '// Switch back to your feature branch',
      'git checkout your-branch',
      '// Replay your commits on top of latest develop',
      'git rebase develop',
      '// Resolve conflicts if any',
      '# Resolve conflicts if any',
      '// Force push rebased commits safely',
      'git push --force-with-lease origin your-branch'
    ],
    description: 'Reapply your commits on top of latest develop',
    category: 'Workflows',
    useCase: 'Before creating PR to have clean, linear history',
    dangerous: true,
    isWorkflow: true,
    notes: 'Rebase "replays" your commits on top of develop, creating a straight line (develop→your commits) instead of a merge with branches. Requires force push since you\'re rewriting history. --force-with-lease is safer than --force because it fails if someone else pushed to your branch.'
  },
  {
    id: 10,
    title: 'View Branch Status',
    commands: [
      '// Check current branch status and changes',
      'git status',
      '// View recent commit history with graph',
      'git log --oneline --graph --decorate -10',
      '// See detailed changes in files',
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
      '// Switch away from branch you want to delete',
      'git checkout develop',
      '// Delete local branch (safe: fails if unmerged)',
      'git branch -d branch-name',
      '// Delete branch from remote repository',
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
      '// View commits from other branch',
      'git log --oneline other-branch',
      '// Copy the commit hash you want (e.g., abc1234)',
      '# Copy the commit hash you want (e.g., abc1234)',
      '// Switch to branch where you want to apply commit',
      'git checkout your-branch',
      '// Apply that specific commit to current branch',
      'git cherry-pick commit-hash',
      '// Push the cherry-picked commit',
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
      '// Create new Vite project with guided setup',
      'npm create vite@latest project-name',
      '// Select React and JavaScript/TypeScript',
      '# Select React and JavaScript/TypeScript',
      '// Navigate into project folder',
      'cd project-name',
      '// Install dependencies',
      'npm install',
      '// Install React Router for navigation',
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
      '// Initialize git repository in current folder',
      'git init',
      '// Stage all files for first commit',
      'git add .',
      '// Create first commit',
      'git commit -m "Initial commit"',
      '// Rename default branch to "main"',
      'git branch -M main',
      '// Connect local repo to GitHub remote repository',
      '# Connect local repo to GitHub remote repository',
      '// Link to remote repo',
      'git remote add origin https://github.com/username/repo.git',
      '// Push commits and set upstream tracking',
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
      '// Switch to main branch',
      'git checkout main',
      '// Get latest main from remote with rebase',
      'git pull --rebase origin main',
      '// Merge your feature branch into main',
      'git merge your-branch',
      '// Resolve any conflicts if they appear',
      '# Resolve any conflicts if they appear',
      '// Push merged main to remote',
      'git push origin main'
    ],
    description: 'Merge feature branch into main and push',
    category: 'Workflows',
    useCase: 'Merging completed feature into main branch',
    dangerous: true,
    isWorkflow: true,
    notes: 'Better to use Pull Requests in GitHub/GitLab. Direct merge to main should be rare. Using --rebase when pulling main keeps history clean before merging your feature.'
  },
  {
    id: 16,
    title: 'Update Main Branch',
    commands: [
      '// Switch to main branch',
      'git checkout main',
      '// Download latest changes from remote',
      'git fetch origin',
      '// Pull with rebase for clean history',
      'git pull --rebase origin main'
    ],
    description: 'Pull latest changes from remote main branch',
    category: 'Workflows',
    useCase: 'Sync your local main with remote before starting new work',
    dangerous: false,
    isWorkflow: true,
    notes: 'Always update main before creating new feature branches. --rebase keeps history clean by avoiding unnecessary merge commits when pulling updates.'
  },
  {
    id: 17,
    title: 'Clone Repository',
    commands: [
      '// Clone repository to your local machine',
      'git clone https://github.com/username/repo.git',
      '// Navigate into the cloned repository',
      'cd repo'
    ],
    description: 'Download existing repository from GitHub',
    category: 'Setup',
    useCase: 'Starting work on existing project or contributing to open source',
    dangerous: false,
    isWorkflow: true,
    notes: 'Replace username/repo with actual repository path. This creates a new folder with the repo name. Use "git clone url foldername" to specify a different folder name.'
  },
  {
    id: 18,
    title: 'Discard All Local Changes',
    commands: [
      '// WARNING: This permanently deletes all uncommitted changes',
      '# WARNING: This permanently deletes all uncommitted changes',
      '// Reset all files to last commit state',
      'git reset --hard HEAD',
      '// Remove untracked files and directories',
      'git clean -fd'
    ],
    description: 'Throw away all local changes and return to clean state',
    category: 'Cleanup',
    useCase: 'When you want to completely start over from last commit',
    dangerous: true,
    isWorkflow: true,
    notes: 'DANGEROUS: Cannot be undone! All uncommitted changes will be permanently lost. --hard resets tracked files, clean -fd removes untracked files/folders. Use "git stash" instead if you might need changes later.'
  },
  {
    id: 19,
    title: 'Undo Changes in Specific File',
    commands: [
      '// Restore file to last committed version',
      'git restore filename',
      '// Or for older Git versions',
      '# git checkout -- filename'
    ],
    description: 'Discard changes in specific file only',
    category: 'Workflows',
    useCase: 'Made mistakes in one file but want to keep changes in others',
    dangerous: false,
    isWorkflow: true,
    notes: 'Replace "filename" with actual file path (e.g., src/App.jsx). This only affects unstaged changes. For staged files, use "git restore --staged filename" first.'
  },
  {
    id: 20,
    title: 'Revert Pushed Commit',
    commands: [
      '// View recent commits to find the one to undo',
      'git log --oneline -10',
      '// Copy the commit hash you want to undo',
      '# Copy the commit hash you want to undo',
      '// Create new commit that undoes the bad commit',
      'git revert commit-hash',
      '// Push the revert commit',
      'git push origin branch-name'
    ],
    description: 'Safely undo a commit that has been pushed',
    category: 'Advanced',
    useCase: 'Need to undo changes that are already in remote/shared history',
    dangerous: false,
    isWorkflow: true,
    notes: 'Revert is SAFE for shared branches - it creates a new commit that undoes changes instead of rewriting history. Use this instead of reset when the commit is already pushed. To revert multiple commits, use "git revert commit1..commit2".'
  },
  {
    id: 21,
    title: 'Squash Commits Before PR',
    commands: [
      '// Start interactive rebase for last N commits (e.g., 3)',
      'git rebase -i HEAD~3',
      '// In editor: change "pick" to "squash" for commits to combine',
      '# In editor: change "pick" to "squash" (or "s") for commits to combine',
      '// Save and close editor',
      '# Save and close editor',
      '// Edit commit message in next editor',
      '# Edit commit message in next editor',
      '// Force push the squashed commits',
      'git push --force-with-lease origin branch-name'
    ],
    description: 'Combine multiple commits into one clean commit',
    category: 'Advanced',
    useCase: 'Clean up messy commit history before creating pull request',
    dangerous: true,
    isWorkflow: true,
    notes: 'Interactive rebase opens editor showing commits. Keep first commit as "pick", change others to "squash" or "s" to merge them. Results in clean, single commit. Example: 10 small commits → 1 clean commit with good message.'
  },
  {
    id: 22,
    title: 'Recover Lost Commits',
    commands: [
      '// View all recent Git actions (even deleted commits)',
      'git reflog',
      '// Find the commit hash you want to recover',
      '# Find the commit hash you want to recover (e.g., abc1234)',
      '// Create new branch from that commit',
      'git checkout -b recovery-branch abc1234',
      '// Or cherry-pick specific commit to current branch',
      '# git cherry-pick abc1234'
    ],
    description: 'Recover commits that were accidentally deleted or lost',
    category: 'Advanced',
    useCase: 'Accidentally reset/deleted commits and need them back',
    dangerous: false,
    isWorkflow: true,
    notes: 'Reflog shows ALL your Git actions for ~30 days, even deleted commits. Look for the action before you lost commits (e.g., "HEAD@{5}: commit: Your message"). Use that hash to recover. Lifesaver for "oh no I deleted everything" moments!'
  },
  {
    id: 23,
    title: 'Create Release Tag',
    commands: [
      '// Create annotated tag with version number',
      'git tag -a v1.0.0 -m "Release version 1.0.0"',
      '// Push tag to remote',
      'git push origin v1.0.0',
      '// Or push all tags at once',
      '# git push origin --tags'
    ],
    description: 'Mark specific commit as a release version',
    category: 'Advanced',
    useCase: 'Creating versioned releases for production deployments',
    dangerous: false,
    isWorkflow: true,
    notes: 'Tags mark important points in history (releases, milestones). Use semantic versioning: v1.0.0 (major.minor.patch). Annotated tags (-a) include message and metadata. GitHub can create releases from tags.'
  },
  {
    id: 24,
    title: 'Work with Forked Repository',
    commands: [
      '// Add original repo as upstream remote',
      'git remote add upstream https://github.com/original-owner/repo.git',
      '// Fetch latest from original repo',
      'git fetch upstream',
      '// Switch to your main branch',
      'git checkout main',
      '// Merge upstream changes into your fork',
      'git merge upstream/main',
      '// Push updated main to your fork',
      'git push origin main'
    ],
    description: 'Sync your fork with original repository',
    category: 'Advanced',
    useCase: 'Contributing to open source - keep your fork up to date',
    dangerous: false,
    isWorkflow: true,
    notes: 'When you fork a repo, "origin" = your fork, "upstream" = original repo. Regularly sync to get latest changes from original. After syncing, create feature branches from updated main to make pull requests.'
  },
  {
    id: 25,
    title: 'Compare Branches',
    commands: [
      '// See files that differ between branches',
      'git diff --name-only branch1..branch2',
      '// See detailed changes between branches',
      'git diff branch1..branch2',
      '// See commits that exist in branch2 but not branch1',
      'git log branch1..branch2 --oneline'
    ],
    description: 'View differences between two branches',
    category: 'Info',
    useCase: 'Understanding what changed between branches before merging',
    dangerous: false,
    isWorkflow: true,
    notes: 'Use --name-only to just see which files changed. Without it, shows full code diff. Useful before merging to review all changes. Compare your feature branch with main to see what your PR will include.'
  },
  {
    id: 26,
    title: 'List All Branches',
    commands: [
      '// List local branches (* shows current)',
      'git branch',
      '// List all branches including remote',
      'git branch -a',
      '// List with last commit info',
      'git branch -v'
    ],
    description: 'View all local and remote branches',
    category: 'Info',
    useCase: 'See what branches exist and which one you are on',
    dangerous: false,
    isWorkflow: true,
    notes: 'Current branch marked with *. -a shows remote branches (origin/branch-name). -v shows last commit on each branch. Helpful to see what branches exist before switching or to find old feature branches.'
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
