import PropTypes from 'prop-types';

export default function DecisionFilterBar({ 
  filterText, 
  filterCategory,
  filterStatus,
  onFilterTextChange, 
  onFilterCategoryChange,
  onFilterStatusChange,
  totalCount, 
  filteredCount 
}) {
  return (
    <div className="decision-filter-bar">
      <input
        type="text"
        placeholder="Search by project, decision, or reason..."
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
        <option value="Architecture">Architecture</option>
        <option value="State Management">State Management</option>
        <option value="Styling">Styling</option>
        <option value="Framework">Framework</option>
        <option value="Real-time">Real-time</option>
        <option value="Database">Database</option>
        <option value="Testing">Testing</option>
        <option value="Deployment">Deployment</option>
      </select>

      <select
        value={filterStatus}
        onChange={(e) => onFilterStatusChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="resolved">Resolved</option>
        <option value="archived">Archived</option>
      </select>

      <span className="filter-count">
        {filteredCount} of {totalCount} decisions
      </span>
    </div>
  );
}

DecisionFilterBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  filterCategory: PropTypes.string.isRequired,
  filterStatus: PropTypes.string.isRequired,
  onFilterTextChange: PropTypes.func.isRequired,
  onFilterCategoryChange: PropTypes.func.isRequired,
  onFilterStatusChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
};
