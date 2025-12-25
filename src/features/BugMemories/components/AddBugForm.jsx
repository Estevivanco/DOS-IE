import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddBugForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    problem: '',
    category: 'React / State',
    symptom: '',
    cause: '',
    fix: '',
    howToAvoid: '',
    whereItHappened: '',
    language: 'javascript',
    severity: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.problem && formData.symptom && formData.cause && formData.fix) {
      onAdd(formData);
      setFormData({
        problem: '',
        category: 'React / State',
        symptom: '',
        cause: '',
        fix: '',
        howToAvoid: '',
        whereItHappened: '',
        language: 'javascript',
        severity: 'medium'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-bug-form">
      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="problem">Problem Title *</label>
          <input
            type="text"
            id="problem"
            name="problem"
            value={formData.problem}
            onChange={handleChange}
            placeholder="e.g., Infinite loop in useEffect"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category *</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="React / State">React / State</option>
            <option value="React / Hooks">React / Hooks</option>
            <option value="JavaScript">JavaScript</option>
            <option value="API / Async">API / Async</option>
            <option value="CSS / Styling">CSS / Styling</option>
            <option value="Performance">Performance</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="severity">Severity *</label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="symptom">Symptom *</label>
          <input
            type="text"
            id="symptom"
            name="symptom"
            value={formData.symptom}
            onChange={handleChange}
            placeholder="What did you see happening?"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="cause">Root Cause *</label>
          <input
            type="text"
            id="cause"
            name="cause"
            value={formData.cause}
            onChange={handleChange}
            placeholder="What actually caused it?"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="fix">The Fix (code) *</label>
          <textarea
            id="fix"
            name="fix"
            value={formData.fix}
            onChange={handleChange}
            placeholder="Show the code that fixed it"
            rows="4"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="howToAvoid">How to Avoid</label>
          <input
            type="text"
            id="howToAvoid"
            name="howToAvoid"
            value={formData.howToAvoid}
            onChange={handleChange}
            placeholder="Prevention tips for the future"
          />
        </div>

        <div className="form-group">
          <label htmlFor="whereItHappened">Where It Happened</label>
          <input
            type="text"
            id="whereItHappened"
            name="whereItHappened"
            value={formData.whereItHappened}
            onChange={handleChange}
            placeholder="e.g., Dashboard project"
          />
        </div>

        <div className="form-group">
          <label htmlFor="language">Language</label>
          <select
            id="language"
            name="language"
            value={formData.language}
            onChange={handleChange}
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="css">CSS</option>
            <option value="html">HTML</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Bug Memory
        </button>
      </div>
    </form>
  );
}

AddBugForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
