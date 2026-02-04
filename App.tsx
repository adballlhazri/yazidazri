import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AdminPanel from './components/AdminPanel';
import { Project, ViewState } from './types';
import { INITIAL_PROJECTS, USER_PROFILE } from './constants';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  
  // Simulated Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret Admin Access: Ctrl + Shift + Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'y' || e.key === 'Y')) {
        e.preventDefault();
        setCurrentView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPassword === 'yazid') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const renderContent = () => {
    if (currentView === 'admin' && !isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="bg-card p-8 rounded-xl border border-white/10 w-full max-w-md animate-fadeIn">
             <h2 className="text-2xl font-display font-bold mb-6 text-center">Admin Access</h2>
             <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Password (hint: yazid)</label>
                  <input 
                    type="password" 
                    className="w-full bg-dark border border-white/10 rounded p-3 text-white focus:border-primary focus:outline-none transition-colors"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    autoFocus
                  />
                </div>
                {loginError && <p className="text-red-500 text-sm">Invalid password</p>}
                <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-cyan-300 transition-colors">
                  Login
                </button>
             </form>
             <button onClick={() => setCurrentView('home')} className="w-full text-center text-sm text-gray-500 mt-4 hover:text-white">
                Back to Home
             </button>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero profile={USER_PROFILE} onCtaClick={() => setCurrentView('portfolio')} />
            <Portfolio projects={projects} />
            
            {/* Footer with secret triple-click trigger */}
            <footer className="py-8 border-t border-white/10 text-center text-gray-500 text-sm">
                <p 
                    className="cursor-default select-none hover:text-gray-400 transition-colors"
                    onClick={(e) => e.detail === 3 && setCurrentView('admin')}
                    title="Copyright"
                >
                    &copy; {new Date().getFullYear()} Elyazid Azri. All rights reserved.
                </p>
            </footer>
          </>
        );
      case 'portfolio':
        return <Portfolio projects={projects} />;
      case 'admin':
        return (
          <AdminPanel 
            projects={projects} 
            setProjects={setProjects} 
            onLogout={() => { setIsAuthenticated(false); setLoginPassword(''); setCurrentView('home'); }} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-primary selection:text-black">
      <Navbar 
        currentView={currentView} 
        onChangeView={setCurrentView} 
        isScrolled={isScrolled} 
      />
      
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;