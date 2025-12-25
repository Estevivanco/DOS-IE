import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import SnippetCard from './components/SnippetCard';
import SnippetForm from './components/SnippetForm';
import FilterBar from './components/FilterBar';
import EditSnippetModal from './components/EditSnippetModal';
import LinkingModal from '../../components/LinkingModal';
import './SnippetRecall.css';

export default function SnippetRecall() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [linkingSnippetId, setLinkingSnippetId] = useState(null);
  const [highlightedSnippetId, setHighlightedSnippetId] = useState(null);
  const [expandedSnippetId, setExpandedSnippetId] = useState(null);
  const location = useLocation();
  
  const { snippets: snippetsContext, getAllAvailableItems } = useAppContext();
  const {
    snippets,
    filteredSnippets,
    filterText,
    setFilterText,
    addSnippet,
    removeSnippet,
    updateSnippet,
    addLink,
    removeLink,
    copyToClipboard,
  } = snippetsContext;

  const handleSaveSnippet = (snippet) => {
    addSnippet(snippet);
    setShowAddForm(false);
  };

  const handleEditSnippet = (snippet) => {
    setEditingSnippet(snippet);
  };

  const handleUpdateSnippet = (id, updatedData) => {
    updateSnippet(id, updatedData);
    setEditingSnippet(null);
  };

  const handleAddLink = (link) => {
    if (linkingSnippetId) {
      addLink(linkingSnippetId, link);
    }
  };

  const handleToggleExpand = (snippetId) => {
    setExpandedSnippetId(expandedSnippetId === snippetId ? null : snippetId);
  };

  // Handle navigation to specific snippet via hash
  useEffect(() => {
    if (location.hash) {
      const snippetId = parseInt(location.hash.substring(1));
      if (snippetId) {
        setTimeout(() => {
          const element = document.getElementById(`snippet-${snippetId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedSnippetId(snippetId);
            setTimeout(() => setHighlightedSnippetId(null), 2000);
          }
        }, 100);
      }
    }
  }, [location.hash]);

  const currentSnippet = snippets.find(s => s.id === linkingSnippetId);
  const currentLinks = currentSnippet?.relatedLinks || [];

  return (
    <div className="snippet-recall">
      <div className="snippet-header">
        <div>
          <h2>Snippet Recall</h2>
          <p>Save and quickly recall code snippets</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
          {showAddForm ? 'Cancel' : '+ Add Snippet'}
        </button>
      </div>

      {showAddForm && (
        <SnippetForm 
          onSave={handleSaveSnippet}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <FilterBar
        filterText={filterText}
        onFilterChange={setFilterText}
        totalCount={snippets.length}
        filteredCount={filteredSnippets.length}
      />

      <div className={`snippets-grid ${expandedSnippetId ? 'has-expanded' : ''}`}>
        {filteredSnippets.map((snippet) => (
          <SnippetCard
            key={snippet.id}
            snippet={snippet}
            onCopy={copyToClipboard}
            onEdit={handleEditSnippet}
            onDelete={removeSnippet}
            onAddLink={setLinkingSnippetId}
            onRemoveLink={removeLink}
            isHighlighted={highlightedSnippetId === snippet.id}
            isExpanded={expandedSnippetId === snippet.id}
            onToggleExpand={handleToggleExpand}
          />
        ))}
      </div>

      {filteredSnippets.length === 0 && (
        <div className="empty-state">
          <p>No snippets found</p>
        </div>
      )}

      {editingSnippet && (
        <EditSnippetModal
          snippet={editingSnippet}
          onSave={handleUpdateSnippet}
          onCancel={() => setEditingSnippet(null)}
        />
      )}

      <LinkingModal
        isOpen={linkingSnippetId !== null}
        onClose={() => setLinkingSnippetId(null)}
        onAddLink={handleAddLink}
        currentLinks={currentLinks}
        availableItems={getAllAvailableItems()}
      />
    </div>
  );
}
