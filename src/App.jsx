import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import Home from './components/Home';
import SnippetRecall from './features/SnippetRecall/SnippetRecall';
import BugMemories from './features/BugMemories/BugMemories';
import ProjectBootstrap from './features/ProjectBootstrap/ProjectBootstrap';
import DecisionLog from './features/DecisionLog/DecisionLog';
import GitCommands from './features/GitCommands/GitCommands';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="snippets" element={<SnippetRecall />} />
              <Route path="bugs" element={<BugMemories />} />
              <Route path="bootstrap" element={<ProjectBootstrap />} />
              <Route path="decisions" element={<DecisionLog />} />
              <Route path="git" element={<GitCommands />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
