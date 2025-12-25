import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function TemplateCard({ template, onSelect, onAddLink, onRemoveLink }) {
  return (
    <div className="template-card">
      <div onClick={() => onSelect(template.id)} style={{ cursor: 'pointer' }}>
        <div className="template-card-header">
          <h3>{template.name}</h3>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddLink(template.id);
            }} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
        </div>
        <p className="template-description">{template.description}</p>
        
        <div className="template-config">
          <div className="config-item">
            <span className="label">Auth:</span>
            <span className={template.config.auth ? 'value yes' : 'value no'}>
              {template.config.auth ? '✓ Yes' : '✗ No'}
            </span>
          </div>
          <div className="config-item">
            <span className="label">API:</span>
            <span className={template.config.api ? 'value yes' : 'value no'}>
              {template.config.api ? '✓ Yes' : '✗ No'}
            </span>
          </div>
          <div className="config-item">
            <span className="label">Storage:</span>
            <span className="value">{template.config.storage}</span>
          </div>
          <div className="config-item">
            <span className="label">Styling:</span>
            <span className="value">{template.config.styling}</span>
          </div>
        </div>

        <button className="select-btn">View Details →</button>
      </div>

      {template.relatedLinks && template.relatedLinks.length > 0 && (
        <div className="template-links">
          <RelatedLinks 
            links={template.relatedLinks} 
            onRemove={(link) => onRemoveLink(template.id, link)}
          />
        </div>
      )}
    </div>
  );
}

TemplateCard.propTypes = {
  template: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
    relatedLinks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
};
