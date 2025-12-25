import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import TemplateCard from './components/TemplateCard';
import TemplateDetail from './components/TemplateDetail';
import LinkingModal from '../../components/LinkingModal';
import './ProjectBootstrap.css';

export default function ProjectBootstrap() {
  const [linkingTemplateId, setLinkingTemplateId] = useState(null);

  const { bootstrap, getAllAvailableItems } = useAppContext();
  const {
    templates,
    allTemplates,
    selectedTemplate,
    selectTemplate,
    copyToClipboard,
    addLink,
    removeLink,
  } = bootstrap;


  const handleAddLink = (itemToLink) => {
    if (linkingTemplateId) {
      addLink(linkingTemplateId, itemToLink);
      setLinkingTemplateId(null);
    }
  };

  if (selectedTemplate) {
    return (
      <TemplateDetail
        template={selectedTemplate}
        onBack={() => selectTemplate(null)}
        onCopy={copyToClipboard}
      />
    );
  }

  return (
    <div className="project-bootstrap">
      <div className="bootstrap-header">
        <div>
          <h2>🚀 Project Bootstrap</h2>
          <p>Start every project clean, fast, and predictable</p>
        </div>
      </div>

      <div className="templates-grid">
        {templates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={selectTemplate}
            onAddLink={setLinkingTemplateId}
            onRemoveLink={removeLink}
          />
        ))}
      </div>

      <LinkingModal
        isOpen={linkingTemplateId !== null}
        onClose={() => setLinkingTemplateId(null)}
        availableItems={getAllAvailableItems()}
        onAddLink={handleAddLink}
        currentLinks={
          linkingTemplateId 
            ? allTemplates.find(t => t.id === linkingTemplateId)?.relatedLinks || []
            : []
        }
      />
    </div>
  );
}
