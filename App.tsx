import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { SavingsProvider, useSavings } from './context';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import BottomNav from './components/BottomNav';
import WelcomeScreen from './components/WelcomeScreen';
import GoalSelection from './components/GoalSelection';
import Auth from './components/Auth';

const NavigationHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useSavings();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return <>{children}</>;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark pb-20 transition-colors duration-200">
      <main className="min-h-screen relative bg-background-light dark:bg-background-dark overflow-hidden transition-colors duration-200">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

const App: React.FC = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <ThemeProvider>
      <SavingsProvider>
        {showWelcome ? (
          <WelcomeScreen onDismiss={() => setShowWelcome(false)} />
        ) : (
          <Router>
            <NavigationHandler>
              <Layout>
                <Routes>
                  <Route path="/" element={<GoalSelection />} />
                  <Route path="/goals" element={<GoalSelection />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </NavigationHandler>
          </Router>
        )}
      </SavingsProvider>
    </ThemeProvider>
  );
};

export default App;