import PropTypes from 'prop-types';
import RelatedLinks from '../../../components/RelatedLinks';

export default function CommandCard({ command, onCopy, onEdit, onDelete, onAddLink, onRemoveLink }) {
  const handleCopyAll = () => {
    if (command.isWorkflow && command.commands) {
      // Copy all commands, filtering out comments (both # and //)
      const commandText = command.commands
        .filter(cmd => !cmd.startsWith('#') && !cmd.startsWith('//'))
        .join('\n');
      onCopy(commandText);
    } else {
      onCopy(command.command);
    }
  };

  return (
    <div className={`command-card ${command.dangerous ? 'dangerous' : ''}`}>
      <div className="command-card-header">
        <div>
          <h3>{command.title}</h3>
          <div className="command-meta">
            <span className="category-badge">{command.category}</span>
            {command.dangerous && (
              <span className="danger-badge">⚠️ Dangerous</span>
            )}
          </div>
        </div>
        <div className="command-actions">
          <button 
            onClick={() => onAddLink(command.id)} 
            className="link-btn" 
            title="Add link"
          >
            🔗
          </button>
          <button 
            onClick={handleCopyAll} 
            className="copy-btn" 
            title="Copy commands"
          >
            📋
          </button>
          <button 
            onClick={() => onDelete(command.id)} 
            className="delete-btn" 
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="command-content">
        {command.isWorkflow && command.commands ? (
          <div className="workflow-commands">
            {command.commands.map((cmd, index) => {
              const isComment = cmd.startsWith('#') || cmd.startsWith('//');
              const stepNumber = isComment 
                ? null 
                : command.commands.slice(0, index).filter(c => !c.startsWith('#') && !c.startsWith('//')).length + 1;
              
              return (
                <div 
                  key={index} 
                  className={isComment ? 'command-comment' : 'command-step'}
                >
                  {!isComment && (
                    <span className="step-number">{stepNumber}.</span>
                  )}
                  <code>{cmd}</code>
                  {!isComment && (
                    <button
                      onClick={() => onCopy(cmd)}
                      className="copy-step-btn"
                      title="Copy this command"
                    >
                      📋
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="command-code">
            <code>{command.command}</code>
          </div>
        )}

        <div className="command-section">
          <strong>Description:</strong>
          <p>{command.description}</p>
        </div>

        <div className="command-section">
          <strong>Use case:</strong>
          <p>{command.useCase}</p>
        </div>

        {command.notes && (
          <div className="command-section command-notes">
            <strong>💡 Notes:</strong>
            <p>{command.notes}</p>
          </div>
        )}
      </div>

      {command.relatedLinks && command.relatedLinks.length > 0 && (
        <div className="command-links">
          <RelatedLinks 
            links={command.relatedLinks} 
            onRemove={(link) => onRemoveLink(command.id, link)}
          />
        </div>
      )}
    </div>
  );
}

CommandCard.propTypes = {
  command: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    command: PropTypes.string,
    commands: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    useCase: PropTypes.string.isRequired,
    dangerous: PropTypes.bool.isRequired,
    isWorkflow: PropTypes.bool,
    notes: PropTypes.string,
    relatedLinks: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })),
  }).isRequired,
  onCopy: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddLink: PropTypes.func.isRequired,
  onRemoveLink: PropTypes.func.isRequired,
};
