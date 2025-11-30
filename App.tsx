import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { 
  Dashboard, 
  Tutor, 
  Notes, 
  Planner, 
  Exam, 
  Community 
} from './components/Features';
import { AppRoute } from './types';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);

  const renderRoute = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return <Dashboard onNavigate={setCurrentRoute} />;
      case AppRoute.TUTOR:
        return <Tutor />;
      case AppRoute.NOTES:
        return <Notes />;
      case AppRoute.PLANNER:
        return <Planner />;
      case AppRoute.EXAM:
        return <Exam />;
      case AppRoute.COMMUNITY:
        return <Community />;
      default:
        return <Dashboard onNavigate={setCurrentRoute} />;
    }
  };

  return (
    <Layout currentRoute={currentRoute} onNavigate={setCurrentRoute}>
      {renderRoute()}
    </Layout>
  );
};

export default App;