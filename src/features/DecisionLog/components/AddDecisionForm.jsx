import { useState } from 'react';
import PropTypes from 'prop-types';

export default function AddDecisionForm({ onAdd, onCancel }) {
  const [formData, setFormData] = useState({
    project: '',
    decision: '',
    why: '',
    tradeoffs: '',
    wouldChange: '',
    category: 'Architecture',
    status: 'active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.project && formData.decision && formData.why) {
      // Convert comma-separated strings to arrays
      const decisionData = {
        ...formData,
        why: formData.why.split('\n').filter(w => w.trim()),
        tradeoffs: formData.tradeoffs.split('\n').filter(t => t.trim()),
        date: new Date().toISOString().split('T')[0]
      };
      
      onAdd(decisionData);
      
      setFormData({
        project: '',
        decision: '',
        why: '',
        tradeoffs: '',
        wouldChange: '',
        category: 'Architecture',
        status: 'active'
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="add-decision-form">
      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="project">Project Name *</label>
          <input
            type="text"
            id="project"
            name="project"
            value={formData.project}
            onChange={handleChange}
            placeholder="e.g., E-commerce Dashboard"
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
            <option value="Architecture">Architecture</option>
            <option value="State Management">State Management</option>
            <option value="Styling">Styling</option>
            <option value="Framework">Framework</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="Tooling">Tooling</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="decision">Decision Title *</label>
          <input
            type="text"
            id="decision"
            name="decision"
            value={formData.decision}
            onChange={handleChange}
            placeholder="e.g., Use Context API instead of Redux"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="why">Why? (one reason per line) *</label>
          <textarea
            id="why"
            name="why"
            value={formData.why}
            onChange={handleChange}
            placeholder="Team is small, no need for Redux complexity&#10;Only 3 global states needed&#10;Faster to implement"
            rows="4"
            required
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="tradeoffs">Tradeoffs (one per line)</label>
          <textarea
            id="tradeoffs"
            name="tradeoffs"
            value={formData.tradeoffs}
            onChange={handleChange}
            placeholder="No time-travel debugging&#10;Harder to scale if team grows&#10;Less structured than Redux"
            rows="3"
          />
        </div>

        <div className="form-group full-width">
          <label htmlFor="wouldChange">Future Perspective</label>
          <textarea
            id="wouldChange"
            name="wouldChange"
            value={formData.wouldChange}
            onChange={handleChange}
            placeholder="What would you change if you could go back?"
            rows="2"
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="active">Active</option>
            <option value="resolved">Resolved</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel} className="cancel-btn">
          Cancel
        </button>
        <button type="submit" className="submit-btn">
          Add Decision
        </button>
      </div>
    </form>
  );
}

AddDecisionForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
