import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import BugCard from './components/BugCard';
import BugFilterBar from './components/BugFilterBar';
import AddBugForm from './components/AddBugForm';
import LinkingModal from '../../components/LinkingModal';
import './BugMemories.css';

export default function BugMemories() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [linkingBugId, setLinkingBugId] = useState(null);
  const [highlightedBugId, setHighlightedBugId] = useState(null);
  const location = useLocation();

  const { bugs: bugsContext, getAllAvailableItems } = useAppContext();
  const {
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
    addLink,
    removeLink,
    copyToClipboard,
  } = bugsContext;

  const handleAddBug = (bugData) => {
    addBug(bugData);
    setShowAddForm(false);
  };

  const handleAddLink = (link) => {
    if (linkingBugId) {
      addLink(linkingBugId, link);
    }
  };

  // Handle navigation to specific bug via hash
  useEffect(() => {
    if (location.hash) {
      const bugId = parseInt(location.hash.substring(1));
      if (bugId) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(`bug-${bugId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedBugId(bugId);
            // Remove highlight after 2 seconds
            setTimeout(() => setHighlightedBugId(null), 2000);
          }
        }, 100);
      }
    }
  }, [location.hash]);

  const currentBug = bugs.find(b => b.id === linkingBugId);
  const currentLinks = currentBug?.relatedLinks || [];

  return (
    <div className="bug-memories">
      <div className="bug-header">
        <div>
          <h2>🐛 Bug Memories</h2>
          <p>Never lose a painful lesson again</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
          {showAddForm ? 'Cancel' : '+ Add Bug Memory'}
        </button>
      </div>

      <BugFilterBar
        filterText={filterText}
        filterCategory={filterCategory}
        filterSeverity={filterSeverity}
        onFilterTextChange={setFilterText}
        onFilterCategoryChange={setFilterCategory}
        onFilterSeverityChange={setFilterSeverity}
        totalCount={bugs.length}
        filteredCount={filteredBugs.length}
      />

      {showAddForm && (
        <AddBugForm
          onAdd={handleAddBug}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="bugs-grid">
        {filteredBugs.map((bug) => (
          <BugCard
            key={bug.id}
            bug={bug}
            onCopy={copyToClipboard}
            onEdit={() => {}}
            onDelete={removeBug}
            onAddLink={setLinkingBugId}
            onRemoveLink={removeLink}
            isHighlighted={highlightedBugId === bug.id}
          />
        ))}
      </div>

      <LinkingModal
        isOpen={linkingBugId !== null}
        onClose={() => setLinkingBugId(null)}
        onAddLink={handleAddLink}
        currentLinks={currentLinks}
        availableItems={getAllAvailableItems()}
      />

      {filteredBugs.length === 0 && (
        <div className="empty-state">
          <p>No bug memories found</p>
        </div>
      )}
    </div>
  );
}
