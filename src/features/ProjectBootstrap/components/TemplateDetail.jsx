import PropTypes from 'prop-types';

export default function TemplateDetail({ template, onBack, onCopy }) {
  const renderStructure = (structure, level = 0) => {
    return Object.entries(structure).map(([key, value]) => {
      const indent = '  '.repeat(level);
      
      if (value === null) {
        return <div key={key} className="file-item">{indent}📄 {key}</div>;
      }
      
      if (Array.isArray(value)) {
        return (
          <div key={key}>
            <div className="folder-item">{indent}📁 {key}</div>
            {value.map(file => (
              <div key={file} className="file-item">{indent}  📄 {file}</div>
            ))}
          </div>
        );
      }
      
      if (typeof value === 'object') {
        return (
          <div key={key}>
            <div className="folder-item">{indent}📁 {key}</div>
            {renderStructure(value, level + 1)}
          </div>
        );
      }
      
      return null;
    });
  };

  return (
    <div className="template-detail">
      <button onClick={onBack} className="back-btn">← Back to Templates</button>
      
      <div className="detail-header">
        <h2>{template.name}</h2>
        <p>{template.description}</p>
      </div>

      <div className="detail-sections">
        {/* Configuration */}
        <section className="detail-section">
          <h3>⚙️ Configuration</h3>
          <div className="config-grid">
            {Object.entries(template.config).map(([key, value]) => (
              <div key={key} className="config-row">
                <strong>{key}:</strong>
                <span>{typeof value === 'boolean' ? (value ? '✓ Yes' : '✗ No') : value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* File Structure */}
        <section className="detail-section">
          <h3>📂 Generated Structure</h3>
          <div className="structure-tree">
            {renderStructure(template.structure)}
          </div>
        </section>

        {/* Code Files */}
        <section className="detail-section">
          <h3>📝 Auto-Generated Files</h3>
          {Object.entries(template.files).map(([filename, code]) => (
            <div key={filename} className="code-file">
              <div className="code-file-header">
                <span className="filename">{filename}</span>
                <button 
                  onClick={() => onCopy(code)} 
                  className="copy-code-btn"
                  title="Copy code"
                >
                  📋 Copy
                </button>
              </div>
              <pre><code>{code}</code></pre>
            </div>
          ))}
        </section>

        {/* README Info */}
        <section className="detail-section">
          <h3>📖 README</h3>
          
          <div className="readme-subsection">
            <h4>Decisions Made</h4>
            <ul>
              {template.readme.decisions.map((decision, i) => (
                <li key={i}>{decision}</li>
              ))}
            </ul>
          </div>

          <div className="readme-subsection">
            <h4>Known Limitations</h4>
            <ul>
              {template.readme.limitations.map((limitation, i) => (
                <li key={i}>{limitation}</li>
              ))}
            </ul>
          </div>

          <div className="readme-subsection">
            <h4>Setup Steps</h4>
            <ol>
              {template.readme.setup.map((step, i) => (
                <li key={i}><code>{step}</code></li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
}

TemplateDetail.propTypes = {
  template: PropTypes.object.isRequired,
  onBack: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
};
