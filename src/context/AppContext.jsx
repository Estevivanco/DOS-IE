import { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSnippets } from '../features/SnippetRecall/hooks/useSnippets';
import { useBugMemories } from '../features/BugMemories/hooks/useBugMemories';
import { useDecisionLog } from '../features/DecisionLog/hooks/useDecisionLog';
import { useGitCommands } from '../features/GitCommands/hooks/useGitCommands';
import { useProjectBootstrap } from '../features/ProjectBootstrap/hooks/useProjectBootstrap';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const snippets = useSnippets();
  const bugs = useBugMemories();
  const decisions = useDecisionLog();
  const gitCommands = useGitCommands();
  const bootstrap = useProjectBootstrap();

  // Combine all items for cross-linking
  const getAllAvailableItems = () => {
    const items = [];

    // Add snippets
    snippets.snippets.forEach(snippet => {
      items.push({
        id: snippet.id,
        type: 'snippet',
        typeLabel: 'Snippet',
        title: snippet.title
      });
    });

    // Add bugs
    bugs.bugs.forEach(bug => {
      items.push({
        id: bug.id,
        type: 'bug',
        typeLabel: 'Bug',
        title: bug.problem
      });
    });

    // Add decisions
    decisions.decisions.forEach(decision => {
      items.push({
        id: decision.id,
        type: 'decision',
        typeLabel: 'Decision',
        title: decision.decision
      });
    });

    // Add git commands
    gitCommands.commands.forEach(command => {
      items.push({
        id: command.id,
        type: 'git',
        typeLabel: 'Git',
        title: command.title
      });
    });

    // Add templates
    bootstrap.allTemplates.forEach(template => {
      items.push({
        id: template.id,
        type: 'template',
        typeLabel: 'Template',
        title: template.name
      });
    });

    return items;
  };

  const value = {
    snippets,
    bugs,
    decisions,
    gitCommands,
    bootstrap,
    getAllAvailableItems
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
