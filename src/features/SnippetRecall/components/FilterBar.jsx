import PropTypes from 'prop-types';

export default function FilterBar({ filterText, onFilterChange, totalCount, filteredCount, databaseFilter, onDatabaseFilterChange, showDatabaseFilter }) {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter snippets by title or code..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-input"
      />
      {showDatabaseFilter && (
        <select
          value={databaseFilter}
          onChange={(e) => onDatabaseFilterChange(e.target.value)}
          className="database-filter-select"
        >
          <option value="all">All Databases</option>
          <option value="mysql">MySQL</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="sql">SQL</option>
        </select>
      )}
      <span className="filter-count">
        {filteredCount} of {totalCount} snippets
      </span>
    </div>
  );
}

FilterBar.propTypes = {
  filterText: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
  filteredCount: PropTypes.number.isRequired,
  databaseFilter: PropTypes.string,
  onDatabaseFilterChange: PropTypes.func,
  showDatabaseFilter: PropTypes.bool,
};
