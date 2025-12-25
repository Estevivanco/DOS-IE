import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function SnippetCard({ snippet, onCopy, onEdit, onDelete, onAddLink, onRemoveLink, isHighlighted, isExpanded, onToggleExpand }) {
  return (
    <div id={`snippet-${snippet.id}`} className={`snippet-card ${isHighlighted ? 'highlighted' : ''} ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <div className="snippet-card-header">
        <h3 
          onClick={() => onToggleExpand(snippet.id)}
          style={{ cursor: 'pointer' }}
          title="Click to expand/collapse code"
        >
          {snippet.title}
        </h3>
        <div className="snippet-actions">
          <button 
            onClick={() => onCopy(snippet.code)} 
            className="copy-btn" 
            title="Copy to clipboard"
          >
            📋
          </button>
          <button 
            onClick={() => onAddLink(snippet.id)} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
          <button 
            onClick={() => onEdit(snippet)} 
            className="edit-btn" 
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(snippet.id)} 
            className="delete-btn" 
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <>
          <div className="code-snapshot">
            <div className="code-header">
              <span className="language-tag">{snippet.language}</span>
            </div>
            <pre><code>{snippet.code}</code></pre>
          </div>
          
          <RelatedLinks 
            links={snippet.relatedLinks} 
            onRemoveLink={(link) => onRemoveLink(snippet.id, link)}
          />
        </>
      )}
    </div>
  );
}

SnippetCard.propTypes = {
  snippet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    relatedLinks: PropTypes.array,
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
  isHighlighted: PropTypes.bool,
  isExpanded: PropTypes.bool,
  onToggleExpand: PropTypes.func.isRequired
};
