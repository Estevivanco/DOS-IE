import { useState, useMemo } from 'react';

const INITIAL_DECISIONS = [
  {
    id: 1,
    project: 'Event Planner',
    decision: 'Use localStorage instead of backend',
    why: [
      'Time limited - 2 week sprint',
      'Focus on frontend logic first',
      'No authentication requirements',
      'Prototype validation stage'
    ],
    tradeoffs: [
      'No persistence across devices',
      'Manual sync logic needed',
      'Data loss if browser cache cleared',
      'Limited to 5-10MB storage'
    ],
    wouldChange: 'Yes → move to Firebase or REST API when scaling',
    date: '2025-12-20',
    category: 'Architecture',
    status: 'active',
    relatedLinks: [
      { type: 'bug', id: 1, title: 'List renders twice' },
      { type: 'snippet', id: 1, title: 'Remove from List' }
    ]
  },
  {
    id: 2,
    project: 'Dashboard App',
    decision: 'Context API over Redux',
    why: [
      'Small to medium app size',
      'Avoid Redux boilerplate',
      'Team unfamiliar with Redux',
      'Faster development time'
    ],
    tradeoffs: [
      'Context re-renders can be wasteful',
      'No dev tools like Redux',
      'Harder to debug state changes',
      'May need refactor if app grows'
    ],
    wouldChange: 'Maybe → consider Zustand if performance issues arise',
    date: '2025-11-15',
    category: 'State Management',
    status: 'active',
    relatedLinks: [
      { type: 'bug', id: 2, title: 'Infinite loop in useEffect' }
    ]
  },
  {
    id: 3,
    project: 'E-commerce Site',
    decision: 'CSS Modules instead of Tailwind',
    why: [
      'Team already knows CSS well',
      'Want component-scoped styles',
      'Avoid large Tailwind bundle',
      'More design flexibility'
    ],
    tradeoffs: [
      'Slower development vs utility classes',
      'More files to manage',
      'Need to write custom styles',
      'No pre-built components'
    ],
    wouldChange: 'No → CSS Modules working great for our needs',
    date: '2025-10-05',
    category: 'Styling',
    status: 'resolved'
  }
];

export function useDecisionLog() {
  const [decisions, setDecisions] = useState(INITIAL_DECISIONS);
  const [filterText, setFilterText] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredDecisions = useMemo(() => {
    return decisions.filter(decision => {
      const matchesText = 
        decision.project.toLowerCase().includes(filterText.toLowerCase()) ||
        decision.decision.toLowerCase().includes(filterText.toLowerCase()) ||
        decision.why.some(w => w.toLowerCase().includes(filterText.toLowerCase()));
      
      const matchesCategory = filterCategory === 'all' || decision.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || decision.status === filterStatus;
      
      return matchesText && matchesCategory && matchesStatus;
    });
  }, [decisions, filterText, filterCategory, filterStatus]);

  const addDecision = (decision) => {
    const newDecision = { ...decision, id: Date.now() };
    setDecisions([...decisions, newDecision]);
  };

  const removeDecision = (id) => {
    setDecisions(decisions.filter(d => d.id !== id));
  };

  const updateDecision = (id, updatedData) => {
    setDecisions(decisions.map(decision => 
      decision.id === id ? { ...decision, ...updatedData } : decision
    ));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const addLink = (decisionId, link) => {
    setDecisions(decisions.map(decision => {
      if (decision.id === decisionId) {
        const relatedLinks = decision.relatedLinks || [];
        return { ...decision, relatedLinks: [...relatedLinks, link] };
      }
      return decision;
    }));
  };

  const removeLink = (decisionId, linkToRemove) => {
    setDecisions(decisions.map(decision => {
      if (decision.id === decisionId) {
        const relatedLinks = decision.relatedLinks || [];
        return {
          ...decision,
          relatedLinks: relatedLinks.filter(
            link => !(link.id === linkToRemove.id && link.type === linkToRemove.type)
          )
        };
      }
      return decision;
    }));
  };

  return {
    decisions,
    filteredDecisions,
    filterText,
    filterCategory,
    filterStatus,
    setFilterText,
    setFilterCategory,
    setFilterStatus,
    addDecision,
    removeDecision,
    updateDecision,
    addLink,
    removeLink,
    copyToClipboard,
  };
}
