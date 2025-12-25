import PropTypes from 'prop-types';

export default function FilterBar({ filterText, onFilterChange, totalCount, filteredCount }) {
  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter snippets by title or code..."
        value={filterText}
        onChange={(e) => onFilterChange(e.target.value)}
        className="filter-input"
      />
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
};
