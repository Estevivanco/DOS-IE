import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function BugCard({ bug, onCopy, onEdit, onDelete, onAddLink, onRemoveLink, isHighlighted }) {
  const severityColors = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444'
  };

  return (
    <div id={`bug-${bug.id}`} className={`bug-card ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="bug-card-header">
        <div>
          <h3>{bug.problem}</h3>
          <span className="category-badge">{bug.category}</span>
          <span 
            className="severity-badge" 
            style={{ backgroundColor: severityColors[bug.severity] }}
          >
            {bug.severity}
          </span>
        </div>
        <div className="bug-actions">
          <button 
            onClick={() => onCopy(bug.fix)} 
            className="copy-btn" 
            title="Copy fix"
          >
            📋
          </button>
          <button 
            onClick={() => onAddLink(bug.id)} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
          <button 
            onClick={() => onEdit(bug)} 
            className="edit-btn" 
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(bug.id)} 
            className="delete-btn" 
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="bug-content">
        <div className="bug-section">
          <strong>Symptom:</strong>
          <p>{bug.symptom}</p>
        </div>

        <div className="bug-section">
          <strong>Cause:</strong>
          <p>{bug.cause}</p>
        </div>

        <div className="bug-section">
          <strong>Fix:</strong>
          <div className="code-snapshot">
            <pre><code>{bug.fix}</code></pre>
          </div>
        </div>

        <div className="bug-section">
          <strong>How to avoid:</strong>
          <p>{bug.howToAvoid}</p>
        </div>

        <div className="bug-section context">
          <strong>Where it happened:</strong>
          <p>{bug.whereItHappened}</p>
        </div>
      </div>

      <RelatedLinks 
        links={bug.relatedLinks} 
        onRemoveLink={(link) => onRemoveLink(bug.id, link)}
      />
    </div>
  );
}

BugCard.propTypes = {
  bug: PropTypes.shape({
    id: PropTypes.number.isRequired,
    problem: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    symptom: PropTypes.string.isRequired,
    cause: PropTypes.string.isRequired,
    fix: PropTypes.string.isRequired,
    howToAvoid: PropTypes.string.isRequired,
    whereItHappened: PropTypes.string.isRequired,
    severity: PropTypes.string.isRequired,
    relatedLinks: PropTypes.array,
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool
};
