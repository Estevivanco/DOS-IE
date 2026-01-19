import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const tools = [
    {
      name: 'Snippet Recall',
      path: '/snippets',
      description: 'Save and quickly recall code snippets',
      icon: '📝'
    },
    {
      name: 'Bug Memories',
      path: '/bugs',
      description: 'Track bugs and their solutions',
      icon: '🐛'
    },
    {
      name: 'Project Bootstrap',
      path: '/bootstrap',
      description: 'Quick start templates and scaffolding',
      icon: '🚀'
    },
    {
      name: 'Decision Log',
      path: '/decisions',
      description: 'Document technical decisions',
      icon: '💡'
    },
    {
      name: 'Commands',
      path: '/commands',
      description: 'Git, Brew, PostgreSQL - Never google the same command twice',
      icon: '⚡'
    }
  ];

  return (
    <div className="home">
      <header className="home-header">
        <h1>DOS-IE</h1>
        <p className="subtitle">Developer Operating System - Interactive Environment</p>
      </header>
      
      <div className="tools-grid">
        {tools.map((tool) => (
          <Link to={tool.path} key={tool.path} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3>{tool.name}</h3>
            <p>{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
