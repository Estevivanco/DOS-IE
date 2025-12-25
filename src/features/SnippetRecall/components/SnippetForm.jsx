import { useState } from 'react';
import PropTypes from 'prop-types';

export default function SnippetForm({ onSave, onCancel }) {
  const [snippet, setSnippet] = useState({ 
    title: '', 
    code: '', 
    language: 'javascript' 
  });

  const handleSubmit = () => {
    if (snippet.title && snippet.code) {
      onSave(snippet);
      setSnippet({ title: '', code: '', language: 'javascript' });
    }
  };

  return (
    <div className="add-snippet-form">
      <input
        type="text"
        placeholder="Snippet title..."
        value={snippet.title}
        onChange={(e) => setSnippet({...snippet, title: e.target.value})}
        className="title-input"
      />
      <select
        value={snippet.language}
        onChange={(e) => setSnippet({...snippet, language: e.target.value})}
        className="language-select"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="typescript">TypeScript</option>
      </select>
      <textarea
        placeholder="Paste your code here..."
        value={snippet.code}
        onChange={(e) => setSnippet({...snippet, code: e.target.value})}
        className="code-input"
        rows="8"
      />
      <div className="form-actions">
        <button onClick={handleSubmit} className="save-btn">Save Snippet</button>
        <button onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </div>
  );
}

SnippetForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
