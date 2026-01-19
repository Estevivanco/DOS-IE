import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import CommandCard from './components/CommandCard';
import CommandFilterBar from './components/CommandFilterBar';
import LinkingModal from '../../components/LinkingModal';
import './GitCommands.css';

export default function GitCommands() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [linkingCommandId, setLinkingCommandId] = useState(null);

  const { gitCommands: gitCommandsContext, getAllAvailableItems } = useAppContext();
  const {
    commands,
    filteredCommands,
    filterText,
    filterCategory,
    filterCommandCategory,
    showDangerous,
    setFilterText,
    setFilterCategory,
    setFilterCommandCategory,
    setShowDangerous,
    removeCommand,
    copyToClipboard,
    addLink,
    removeLink,
  } = gitCommandsContext;


  const handleAddLink = (itemToLink) => {
    if (linkingCommandId) {
      addLink(linkingCommandId, itemToLink);
      setLinkingCommandId(null);
    }
  };

  return (
    <div className="git-commands">
      <div className="git-header">
        <div>
          <h2>⚡ Commands</h2>
          <p>Git, Brew, PostgreSQL - Never google the same command twice</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
          {showAddForm ? 'Cancel' : '+ Add Command'}
        </button>
      </div>

      <CommandFilterBar
        filterText={filterText}
        filterCategory={filterCategory}
        filterCommandCategory={filterCommandCategory}
        showDangerous={showDangerous}
        onFilterTextChange={setFilterText}
        onFilterCategoryChange={setFilterCategory}
        onFilterCommandCategoryChange={setFilterCommandCategory}
        onShowDangerousChange={setShowDangerous}
        totalCount={commands.length}
        filteredCount={filteredCommands.length}
      />

      <div className="commands-grid">
        {filteredCommands.map((command) => (
          <CommandCard
            key={command.id}
            command={command}
            onCopy={copyToClipboard}
            onEdit={() => {}}
            onDelete={removeCommand}
            onAddLink={setLinkingCommandId}
            onRemoveLink={removeLink}
          />
        ))}
      </div>

      {filteredCommands.length === 0 && (
        <div className="empty-state">
          <p>No commands found</p>
        </div>
      )}

      <LinkingModal
        isOpen={linkingCommandId !== null}
        onClose={() => setLinkingCommandId(null)}
        availableItems={getAllAvailableItems()}
        onAddLink={handleAddLink}
        currentLinks={
          linkingCommandId 
            ? commands.find(c => c.id === linkingCommandId)?.relatedLinks || []
            : []
        }
      />
    </div>
  );
}
