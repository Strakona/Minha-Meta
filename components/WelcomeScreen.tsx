import React from 'react';

interface WelcomeScreenProps {
  onDismiss: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDismiss }) => {
  return (
    <div 
      onClick={onDismiss}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-500"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center animate-fade-in-up">
        {/* Logo / Icon */}
        <div className="w-24 h-24 bg-gradient-to-tr from-primary to-purple-600 rounded-3xl shadow-glow flex items-center justify-center mb-8 transform rotate-3 hover:rotate-6 transition-transform duration-500">
          <span className="material-icons-round text-5xl text-white">savings</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-400">
          Minha Meta
        </h1>
        
        <p className="text-subtext-light dark:text-subtext-dark text-lg mb-12 tracking-wide font-medium">
          Sua jornada começa aqui.
        </p>

        {/* Tap to Start Indicator */}
        <div className="absolute bottom-[-150px] flex flex-col items-center animate-bounce-short opacity-70">
           <span className="text-sm uppercase tracking-widest text-subtext-light dark:text-subtext-dark mb-2">Toque para entrar</span>
           <div className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center">
             <span className="material-icons-round text-primary">arrow_forward</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;