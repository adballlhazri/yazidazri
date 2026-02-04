import React from 'react';
import { Menu, X, Gamepad2 } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView, isScrolled }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navClasses = `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
    isScrolled ? 'bg-dark/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'
  }`;

  const linkClass = (view: ViewState) => `
    cursor-pointer text-sm font-medium tracking-wide hover:text-primary transition-colors
    ${currentView === view ? 'text-primary' : 'text-gray-300'}
  `;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => onChangeView('home')}
        >
          <Gamepad2 className="w-8 h-8 text-primary group-hover:rotate-12 transition-transform" />
          <span className="font-display font-bold text-xl tracking-tighter">
            ELYAZID<span className="text-primary">.DEV</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => onChangeView('home')} className={linkClass('home')}>HOME</button>
          <button onClick={() => onChangeView('portfolio')} className={linkClass('portfolio')}>PORTFOLIO</button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-dark border-b border-white/10 p-6 flex flex-col gap-4 shadow-2xl">
          <button onClick={() => { onChangeView('home'); setIsOpen(false); }} className="text-left py-2">HOME</button>
          <button onClick={() => { onChangeView('portfolio'); setIsOpen(false); }} className="text-left py-2">PORTFOLIO</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;