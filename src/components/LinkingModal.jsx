import { useState } from 'react';
import PropTypes from 'prop-types';
import './LinkingModal.css';

export default function LinkingModal({ 
  isOpen, 
  onClose, 
  onAddLink, 
  currentLinks = [],
  availableItems 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  if (!isOpen) return null;

  const categories = [
    { key: 'all', label: 'All', icon: '🔗' },
    { key: 'snippet', label: 'Snippets', icon: '📝' },
    { key: 'bug', label: 'Bugs', icon: '🐛' },
    { key: 'bootstrap', label: 'Templates', icon: '🚀' },
    { key: 'decision', label: 'Decisions', icon: '💡' },
    { key: 'git', label: 'Git Commands', icon: '⚡' }
  ];

  const filteredItems = availableItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.type === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchText.toLowerCase());
    const notAlreadyLinked = !currentLinks.some(link => link.id === item.id && link.type === item.type);
    return matchesCategory && matchesSearch && notAlreadyLinked;
  });

  const handleAddLink = (item) => {
    onAddLink(item);
    setSearchText('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>🔗 Link to Another Item</h3>
          <button onClick={onClose} className="modal-close">✕</button>
        </div>

        <div className="modal-body">
          <input
            type="text"
            className="link-search"
            placeholder="Search items..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />

          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat.key}
                className={`category-filter-btn ${selectedCategory === cat.key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.key)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>

          <div className="linkable-items">
            {filteredItems.length === 0 ? (
              <div className="no-items">
                <p>No items found</p>
              </div>
            ) : (
              filteredItems.map(item => (
                <div key={`${item.type}-${item.id}`} className="linkable-item">
                  <div className="linkable-item-info">
                    <span className="linkable-type-badge">{item.typeLabel}</span>
                    <span className="linkable-title">{item.title}</span>
                  </div>
                  <button
                    onClick={() => handleAddLink(item)}
                    className="add-link-btn"
                  >
                    + Link
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

LinkingModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  currentLinks: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })),
  availableItems: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    typeLabel: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
};
