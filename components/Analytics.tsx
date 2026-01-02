import React from 'react';
import { useSavings } from '../context';
import { formatCurrency } from '../utils';

const Analytics: React.FC = () => {
  const { totalSaved, totalGoal, transactions } = useSavings();
  const percentage = Math.round((totalSaved / totalGoal) * 100);

  // Calculate simple stats
  const averageDeposit = transactions.length > 0 ? totalSaved / transactions.length : 0;
  const maxDeposit = transactions.length > 0 ? Math.max(...transactions.map(t => t.amount)) : 0;

  return (
    <div className="w-full">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 pt-4 pb-4">
          <h1 className="text-lg font-semibold tracking-tight">Análise</h1>
        </div>
      </header>
      
      <div className="px-4 pt-6 space-y-6">
        {/* Main Card */}
        <div className="bg-primary rounded-2xl p-6 text-white shadow-lg relative overflow-hidden w-full">
           <div className="absolute -top-10 -right-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300 opacity-20 rounded-full blur-xl"></div>
           <div className="relative z-10">
              <p className="text-blue-100 text-sm font-medium mb-1">Total Guardado</p>
              <h2 className="text-3xl font-bold">{formatCurrency(totalSaved)}</h2>
              
              <div className="mt-4 w-full bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-1000" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-blue-100">
                <span>R$ 0</span>
                <span>{percentage}% da meta</span>
                <span>{formatCurrency(totalGoal)}</span>
              </div>
           </div>
        </div>

        {/* Grid Stats */}
        <div>
            <h3 className="text-sm font-semibold text-subtext-light dark:text-subtext-dark uppercase tracking-wider mb-3 px-1">Estatísticas</h3>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary w-fit rounded-lg mb-3">
                        <span className="material-icons-round text-xl">analytics</span>
                    </div>
                    <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Média / Depósito</p>
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">{formatCurrency(averageDeposit)}</p>
                </div>
                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
                     <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 w-fit rounded-lg mb-3">
                        <span className="material-icons-round text-xl">emoji_events</span>
                    </div>
                    <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Maior Depósito</p>
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">{formatCurrency(maxDeposit)}</p>
                </div>
                 <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 w-fit rounded-lg mb-3">
                        <span className="material-icons-round text-xl">receipt_long</span>
                    </div>
                    <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Total Transações</p>
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">{transactions.length}</p>
                </div>
                 <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-soft border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 w-fit rounded-lg mb-3">
                        <span className="material-icons-round text-xl">savings</span>
                    </div>
                    <p className="text-xs text-subtext-light dark:text-subtext-dark mb-1">Restante</p>
                    <p className="text-lg font-bold text-text-light dark:text-text-dark">{formatCurrency(totalGoal - totalSaved)}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;