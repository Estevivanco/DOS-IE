import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function DecisionCard({ decision, onCopy, onEdit, onDelete, onAddLink, onRemoveLink, isHighlighted }) {
  const statusColors = {
    active: '#3b82f6',
    resolved: '#10b981',
    archived: '#6b7280'
  };

  return (
    <div id={`decision-${decision.id}`} className={`decision-card ${isHighlighted ? 'highlighted' : ''}`}>
      <div className="decision-card-header">
        <div>
          <h3>{decision.decision}</h3>
          <div className="decision-meta">
            <span className="project-badge">{decision.project}</span>
            <span className="category-badge">{decision.category}</span>
            <span 
              className="status-badge" 
              style={{ backgroundColor: statusColors[decision.status] }}
            >
              {decision.status}
            </span>
            <span className="date-badge">📅 {decision.date}</span>
          </div>
        </div>
        <div className="decision-actions">
          <button 
            onClick={() => onAddLink(decision.id)} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
          <button 
            onClick={() => onCopy(JSON.stringify(decision, null, 2))} 
            className="copy-btn" 
            title="Copy decision"
          >
            📋
          </button>
          <button 
            onClick={() => onEdit(decision)} 
            className="edit-btn" 
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(decision.id)} 
            className="delete-btn" 
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="decision-content">
        <div className="decision-section">
          <h4>💡 Why?</h4>
          <ul>
            {decision.why.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>

        <div className="decision-section">
          <h4>⚖️ Trade-offs</h4>
          <ul>
            {decision.tradeoffs.map((tradeoff, index) => (
              <li key={index}>{tradeoff}</li>
            ))}
          </ul>
        </div>

        <div className="decision-section future">
          <h4>🔮 Would I change this later?</h4>
          <p>{decision.wouldChange}</p>
        </div>
      </div>

      {decision.relatedLinks && decision.relatedLinks.length > 0 && (
        <div className="decision-links">
          <RelatedLinks 
            links={decision.relatedLinks} 
            onRemove={(link) => onRemoveLink(decision.id, link)}
          />
        </div>
      )}
    </div>
  );
}

DecisionCard.propTypes = {
  decision: PropTypes.shape({
    id: PropTypes.number.isRequired,
    project: PropTypes.string.isRequired,
    decision: PropTypes.string.isRequired,
    why: PropTypes.arrayOf(PropTypes.string).isRequired,
    tradeoffs: PropTypes.arrayOf(PropTypes.string).isRequired,
    wouldChange: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    relatedLinks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool
};
