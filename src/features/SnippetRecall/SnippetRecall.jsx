import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import SnippetCard from './components/SnippetCard';
import SnippetForm from './components/SnippetForm';
import FilterBar from './components/FilterBar';
import EditSnippetModal from './components/EditSnippetModal';
import LinkingModal from '../../components/LinkingModal';
import CategoryView from './components/CategoryView';
import './SnippetRecall.css';

export default function SnippetRecall() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);
  const [linkingSnippetId, setLinkingSnippetId] = useState(null);
  const [highlightedSnippetId, setHighlightedSnippetId] = useState(null);
  const [expandedSnippetId, setExpandedSnippetId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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

  // Filter snippets by selected category
  const categoryFilteredSnippets = useMemo(() => {
    if (!selectedCategory) return filteredSnippets;
    return filteredSnippets.filter(snippet => snippet.language === selectedCategory);
  }, [filteredSnippets, selectedCategory]);

  // Count snippets per category
  const snippetCounts = useMemo(() => {
    const counts = {};
    snippets.forEach(snippet => {
      counts[snippet.language] = (counts[snippet.language] || 0) + 1;
    });
    return counts;
  }, [snippets]);

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

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAddForm(false);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setShowAddForm(false);
    setFilterText('');
  };

  return (
    <div className="snippet-recall">
      <div className="snippet-header">
        <div>
          <h2>
            {selectedCategory && (
              <button onClick={handleBackToCategories} className="back-btn">
                ← 
              </button>
            )}
            Snippet Recall
            {selectedCategory && (
              <span className="category-badge-header">
                {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </span>
            )}
          </h2>
          <p>
            {selectedCategory 
              ? `Browse ${selectedCategory} code snippets`
              : 'Save and quickly recall code snippets'}
          </p>
        </div>
        {selectedCategory && (
          <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
            {showAddForm ? 'Cancel' : '+ Add Snippet'}
          </button>
        )}
      </div>

      {!selectedCategory ? (
        <CategoryView 
          onSelectCategory={handleSelectCategory}
          snippetCounts={snippetCounts}
        />
      ) : (
        <>
          {showAddForm && (
            <SnippetForm 
              onSave={handleSaveSnippet}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <FilterBar
            filterText={filterText}
            onFilterChange={setFilterText}
            totalCount={snippets.filter(s => s.language === selectedCategory).length}
            filteredCount={categoryFilteredSnippets.length}
          />

          <div className={`snippets-grid ${expandedSnippetId ? 'has-expanded' : ''}`}>
            {categoryFilteredSnippets.map((snippet) => (
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

          {categoryFilteredSnippets.length === 0 && (
            <div className="empty-state">
              <p>No {selectedCategory} snippets found</p>
            </div>
          )}
        </>
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
