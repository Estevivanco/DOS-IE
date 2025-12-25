import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import DecisionCard from './components/DecisionCard';
import DecisionFilterBar from './components/DecisionFilterBar';
import AddDecisionForm from './components/AddDecisionForm';
import LinkingModal from '../../components/LinkingModal';
import './DecisionLog.css';

export default function DecisionLog() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [linkingDecisionId, setLinkingDecisionId] = useState(null);
  const [highlightedDecisionId, setHighlightedDecisionId] = useState(null);
  const location = useLocation();

  const { decisions: decisionsContext, getAllAvailableItems } = useAppContext();
  const {
    decisions,
    filteredDecisions,
    filterText,
    filterCategory,
    filterStatus,
    setFilterText,
    setFilterCategory,
    setFilterStatus,
    addDecision,
    removeDecision,
    copyToClipboard,
    addLink,
    removeLink,
  } = decisionsContext;

  const handleAddDecision = (decisionData) => {
    addDecision(decisionData);
    setShowAddForm(false);
  };

  const handleAddLink = (itemToLink) => {
    if (linkingDecisionId) {
      addLink(linkingDecisionId, itemToLink);
      setLinkingDecisionId(null);
    }
  };

  // Handle navigation to specific decision via hash
  useEffect(() => {
    if (location.hash) {
      const decisionId = parseInt(location.hash.substring(1));
      if (decisionId) {
        setTimeout(() => {
          const element = document.getElementById(`decision-${decisionId}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setHighlightedDecisionId(decisionId);
            setTimeout(() => setHighlightedDecisionId(null), 2000);
          }
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="decision-log">
      <div className="decision-header">
        <div>
          <h2>💡 Decision Log</h2>
          <p>Future-you insurance - remember why you chose things</p>
        </div>
        <button onClick={() => setShowAddForm(!showAddForm)} className="add-btn">
          {showAddForm ? 'Cancel' : '+ Add Decision'}
        </button>
      </div>

      <DecisionFilterBar
        filterText={filterText}
        filterCategory={filterCategory}
        filterStatus={filterStatus}
        onFilterTextChange={setFilterText}
        onFilterCategoryChange={setFilterCategory}
        onFilterStatusChange={setFilterStatus}
        totalCount={decisions.length}
        filteredCount={filteredDecisions.length}
      />

      {showAddForm && (
        <AddDecisionForm
          onAdd={handleAddDecision}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="decisions-grid">
        {filteredDecisions.map((decision) => (
          <DecisionCard
            key={decision.id}
            decision={decision}
            onCopy={copyToClipboard}
            onEdit={() => {}}
            onDelete={removeDecision}
            onAddLink={setLinkingDecisionId}
            onRemoveLink={removeLink}
            isHighlighted={highlightedDecisionId === decision.id}
          />
        ))}
      </div>

      {filteredDecisions.length === 0 && (
        <div className="empty-state">
          <p>No decisions found</p>
        </div>
      )}

      <LinkingModal
        isOpen={linkingDecisionId !== null}
        onClose={() => setLinkingDecisionId(null)}
        availableItems={getAllAvailableItems()}
        onAddLink={handleAddLink}
        currentLinks={
          linkingDecisionId 
            ? decisions.find(d => d.id === linkingDecisionId)?.relatedLinks || []
            : []
        }
      />
    </div>
  );
}
