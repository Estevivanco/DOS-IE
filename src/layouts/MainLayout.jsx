import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import './MainLayout.css';

export default function MainLayout() {
  return (
    <div className="main-layout">
      <Navigation />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
