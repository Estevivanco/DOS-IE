import PropTypes from 'prop-types';

export default function CommandFilterBar({ 
  filterText, 
  filterCategory,
  showDangerous,
  onFilterTextChange, 
  onFilterCategoryChange,
  onShowDangerousChange,
  totalCount, 
  filteredCount 
}) {
  return (
    <div className="command-filter-bar">
      <input
        type="text"
        placeholder="Search commands..."
        value={filterText}
        onChange={(e) => onFilterTextChange(e.target.value)}
        className="filter-input"
      />
      
      <select
        value={filterCategory}
        onChange={(e) => onFilterCategoryChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Categories</option>
        <option value="Workflows">Workflows</option>
        <option value="Info">Info</option>
        <option value="Cleanup">Cleanup</option>
        <option value="Advanced">Advanced</option>
      </select>

      <label className="danger-toggle">
        <input
          type="checkbox"
          checked={showDangerous}
          onChange={(e) => onShowDangerousChange(e.target.checked)}
        />
        <span>Show dangerous commands</span>
      </label>

      <span className="filter-count">
        {filteredCount} of {totalCount} commands
      </span>
    </div>
  );
}

CommandFilterBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  filterCategory: PropTypes.string.isRequired,
  showDangerous: PropTypes.bool.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onFilterCategoryChange: PropTypes.func.isRequired,
  onShowDangerousChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
};
