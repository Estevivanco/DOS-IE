import PropTypes from 'prop-types';

export default function BugFilterBar({ 
  filterText, 
  filterCategory,
  filterSeverity,
  onFilterTextChange, 
  onFilterCategoryChange,
  onFilterSeverityChange,
  totalCount, 
  filteredCount 
}) {
  return (
    <div className="bug-filter-bar">
      <input
        type="text"
        placeholder="Search by problem, symptom, or cause..."
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
        <option value="React">React</option>
        <option value="JavaScript">JavaScript</option>
        <option value="API">API</option>
        <option value="CSS">CSS</option>
      </select>

      <select
        value={filterSeverity}
        onChange={(e) => onFilterSeverityChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Severity</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <span className="filter-count">
        {filteredCount} of {totalCount} bugs
      </span>
    </div>
  );
}

BugFilterBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  filterCategory: PropTypes.string.isRequired,
  filterSeverity: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onFilterCategoryChange: PropTypes.func.isRequired,
  onFilterSeverityChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
};
