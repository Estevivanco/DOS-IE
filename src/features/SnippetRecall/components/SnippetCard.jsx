import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function SnippetCard({ snippet, onCopy, onEdit, onDelete, onAddLink, onRemoveLink, isHighlighted, isExpanded, onToggleExpand }) {
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeButton, setActiveButton] = useState(null);
  const [focusedButton, setFocusedButton] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const hasLivePreview = snippet.livePreview && snippet.language === 'css';

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  const handleCardClick = () => {
    setShowModal(true);
  };

  const renderModal = () => {
    if (!showModal) return null;

    return createPortal(
      <div className="css-preview-modal-overlay" onClick={() => setShowModal(false)}>
        <div className="css-preview-modal" onClick={(e) => e.stopPropagation()}>
          <div className="css-preview-modal-header">
            <h2>{snippet.title}</h2>
            <button 
              className="modal-close-btn" 
              onClick={() => setShowModal(false)}
              title="Close (ESC)"
            >
              ✕
            </button>
          </div>
          <div className="css-preview-modal-content">
            <div className="code-snapshot">
              <div className="code-header">
                <span className="language-tag">{snippet.language}</span>
              </div>
              <pre><code>{snippet.code}</code></pre>
            </div>
            
            {renderLivePreview()}
          </div>
          
          {snippet.relatedLinks && snippet.relatedLinks.length > 0 && (
            <div className="css-preview-modal-footer">
              <RelatedLinks 
                links={snippet.relatedLinks} 
                onRemoveLink={(link) => onRemoveLink(snippet.id, link)}
              />
            </div>
          )}
        </div>
      </div>,
      document.body
    );
  };

  const renderLivePreview = () => {
    if (!hasLivePreview) return null;

    // For layout-based previews (positioning, flexbox, grid, z-index)
    if (snippet.livePreview.layout) {
      return (
        <div className="live-preview-container">
          <div className="preview-header">
            <h4>Live Preview</h4>
            <p>{snippet.livePreview.description || 'Visual demonstration'}</p>
          </div>
          <div 
            className="preview-layout-demo" 
            style={snippet.livePreview.containerStyle}
            dangerouslySetInnerHTML={{ __html: snippet.livePreview.layout }}
          />
        </div>
      );
    }

    // For interactive elements (buttons, inputs)
    return (
      <div className="live-preview-container">
        <div className="preview-header">
          <h4>Live Preview</h4>
          <p>Interact with these elements to see the pseudo-classes in action</p>
        </div>
        <div className="preview-buttons">
          {snippet.livePreview.buttons.map((elementConfig, index) => {
            const isHovered = hoveredButton === index;
            const isActive = activeButton === index;
            const isFocused = focusedButton === index;

            let combinedStyle = { ...elementConfig.baseStyle };

            if (isHovered && elementConfig.hoverStyle) {
              combinedStyle = { ...combinedStyle, ...elementConfig.hoverStyle };
            }
            if (isActive && elementConfig.activeStyle) {
              combinedStyle = { ...combinedStyle, ...elementConfig.activeStyle };
            }
            if (isFocused && elementConfig.focusStyle) {
              combinedStyle = { ...combinedStyle, ...elementConfig.focusStyle };
            }

            const ElementType = elementConfig.type || 'button';
            const isVoidElement = ElementType === 'input' || ElementType === 'textarea';

            return (
              <div key={index} className="preview-button-wrapper">
                <div className="button-label">{elementConfig.label}</div>
                {isVoidElement ? (
                  <ElementType
                    style={combinedStyle}
                    disabled={elementConfig.disabled}
                    readOnly={elementConfig.readOnly}
                    required={elementConfig.required}
                    type={elementConfig.inputType}
                    placeholder={elementConfig.placeholder}
                    defaultValue={elementConfig.defaultValue}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onMouseDown={() => setActiveButton(index)}
                    onMouseUp={() => setActiveButton(null)}
                    onFocus={() => setFocusedButton(index)}
                    onBlur={() => setFocusedButton(null)}
                  />
                ) : (
                  <ElementType
                    style={combinedStyle}
                    disabled={elementConfig.disabled}
                    onMouseEnter={() => setHoveredButton(index)}
                    onMouseLeave={() => setHoveredButton(null)}
                    onMouseDown={() => setActiveButton(index)}
                    onMouseUp={() => setActiveButton(null)}
                    onFocus={() => setFocusedButton(index)}
                    onBlur={() => setFocusedButton(null)}
                  >
                    {elementConfig.description}
                  </ElementType>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div id={`snippet-${snippet.id}`} className={`snippet-card ${isHighlighted ? 'highlighted' : ''} ${isExpanded ? 'expanded' : 'collapsed'} ${hasLivePreview && isExpanded ? 'has-preview' : ''}`}>
      <div className="snippet-card-header">
        <h3 
          onClick={handleCardClick}
          style={{ cursor: 'pointer' }}
          title='Click to view in modal'
        >
          {snippet.title}
          {hasLivePreview && <span style={{ marginLeft: '0.5rem', fontSize: '1rem' }}>🎨</span>}
        </h3>
        <div className="snippet-actions">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onCopy(snippet.code);
            }} 
            className="copy-btn" 
            title="Copy to clipboard"
          >
            📋
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddLink(snippet.id);
            }} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onEdit(snippet);
            }} 
            className="edit-btn" 
            title="Edit"
          >
            ✏️
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onDelete(snippet.id);
            }} 
            className="delete-btn" 
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
      
      {renderModal()}
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
