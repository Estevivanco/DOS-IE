import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './RelatedLinks.css';

export default function RelatedLinks({ links = [], onRemoveLink }) {
  const navigate = useNavigate();

  if (links.length === 0) return null;

  const typeConfig = {
    snippet: { icon: '📝', path: '/snippets', color: '#667eea' },
    bug: { icon: '🐛', path: '/bugs', color: '#ef4444' },
    bootstrap: { icon: '🚀', path: '/bootstrap', color: '#3b82f6' },
    decision: { icon: '💡', path: '/decisions', color: '#f59e0b' },
    git: { icon: '⚡', path: '/git', color: '#10b981' }
  };

  const handleLinkClick = (link) => {
    const config = typeConfig[link.type];
    if (config) {
      // Navigate to the feature page with the item ID in the URL hash
      navigate(`${config.path}#${link.id}`);
    }
  };

  return (
    <div className="related-links">
      <div className="related-links-header">
        <span className="related-label">🔗 Related:</span>
      </div>
      <div className="related-links-list">
        {links.map((link, index) => {
          const config = typeConfig[link.type];
          return (
            <div
              key={`${link.type}-${link.id}-${index}`}
              className="related-link-badge"
              style={{ borderColor: config.color }}
              onClick={() => handleLinkClick(link)}
            >
              <span className="link-icon">{config.icon}</span>
              <span className="link-title">{link.title}</span>
              {onRemoveLink && (
                <button
                  className="remove-link-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveLink(link);
                  }}
                  title="Remove link"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

RelatedLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })),
  onRemoveLink: PropTypes.func
};
