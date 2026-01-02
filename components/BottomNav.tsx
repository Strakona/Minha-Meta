import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const getLinkClass = ({ isActive }: { isActive: boolean }) => 
    `flex flex-col items-center justify-center w-full h-full transition-colors group ${
      isActive ? 'text-primary' : 'text-gray-400 hover:text-primary dark:text-gray-500 dark:hover:text-gray-300'
    }`;

  return (
    <nav className="fixed bottom-0 w-full bg-surface-light dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 px-2 z-50">
      <div className="flex justify-between items-center w-full mx-auto h-16">
        <NavLink to="/" className={getLinkClass}>
          <span className="material-icons-round text-2xl mb-1 group-hover:scale-110 transition-transform">dashboard</span>
          <span className="text-[10px] font-medium">Grid</span>
        </NavLink>
        
        <NavLink to="/analytics" className={getLinkClass}>
          <span className="material-icons-round text-2xl mb-1 group-hover:scale-110 transition-transform">analytics</span>
          <span className="text-[10px] font-medium">Análise</span>
        </NavLink>

        <div className="w-12">
            {/* Spacer for FAB */}
        </div>

        <NavLink to="/history" className={getLinkClass}>
          <span className="material-icons-round text-2xl mb-1 group-hover:scale-110 transition-transform">history</span>
          <span className="text-[10px] font-medium">Histórico</span>
        </NavLink>
        
        <NavLink to="/profile" className={getLinkClass}>
          <span className="material-icons-round text-2xl mb-1 group-hover:scale-110 transition-transform">person</span>
          <span className="text-[10px] font-medium">Perfil</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNav;