import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function EditSnippetModal({ snippet, onSave, onCancel }) {
  const [editedSnippet, setEditedSnippet] = useState({
    title: '',
    code: '',
    language: 'javascript'
  });

  useEffect(() => {
    if (snippet) {
      setEditedSnippet({
        title: snippet.title,
        code: snippet.code,
        language: snippet.language
      });
    }
  }, [snippet]);

  const handleSave = () => {
    if (editedSnippet.title && editedSnippet.code) {
      onSave(snippet.id, editedSnippet);
    }
  };

  if (!snippet) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Snippet</h3>
        <div className="edit-form">
          <input
            type="text"
            placeholder="Snippet title..."
            value={editedSnippet.title}
            onChange={(e) => setEditedSnippet({...editedSnippet, title: e.target.value})}
            className="title-input"
          />
          <select
            value={editedSnippet.language}
            onChange={(e) => setEditedSnippet({...editedSnippet, language: e.target.value})}
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
            value={editedSnippet.code}
            onChange={(e) => setEditedSnippet({...editedSnippet, code: e.target.value})}
            className="code-input"
            rows="12"
          />
          <div className="form-actions">
            <button onClick={handleSave} className="save-btn">Save Changes</button>
            <button onClick={onCancel} className="cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

EditSnippetModal.propTypes = {
  snippet: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
