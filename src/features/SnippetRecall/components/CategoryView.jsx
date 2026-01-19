import PropTypes from 'prop-types';

const CATEGORIES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '📜',
    description: 'Vanilla JavaScript snippets and utilities',
    color: '#f7df1e',
  },
  {
    id: 'react',
    name: 'React Hooks',
    icon: '⚛️',
    description: 'Custom React hooks and patterns',
    color: '#61dafb',
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎨',
    description: 'Styling solutions and layouts',
    color: '#2965f1',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🗄️',
    description: 'Database queries and operations',
    color: '#00758f',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    description: 'PostgreSQL queries and operations',
    color: '#336791',
  },
  {
    id: 'sql',
    name: 'SQL',
    icon: '💾',
    description: 'General SQL queries',
    color: '#cc2927',
  },
];

export default function CategoryView({ onSelectCategory, snippetCounts }) {
  return (
    <div className="category-view">
      <div className="categories-grid">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => onSelectCategory(category.id)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">{category.icon}</div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <div className="category-count">
              {snippetCounts[category.id] || 0} snippets
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CategoryView.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
  snippetCounts: PropTypes.object.isRequired,
};
