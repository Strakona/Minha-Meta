import React from 'react';
import { useSavings } from '../context';
import { formatCurrency, formatDate } from '../utils';

const History: React.FC = () => {
  const { transactions } = useSavings();

  return (
    <div className="w-full">
       {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 pt-4 pb-4 flex items-center justify-between">
          <div className="w-8"></div>
          <h1 className="text-lg font-semibold tracking-tight">Histórico</h1>
          <button className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <span className="material-icons-round text-2xl text-text-light dark:text-text-dark">filter_list</span>
          </button>
        </div>
      </header>
      
      {/* Content */}
      <div className="px-4 pt-4 pb-4">
        <div className="animate-fade-in-up">
          <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft overflow-hidden border border-gray-100 dark:border-gray-800">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="group flex items-center p-4 border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-4">
                    <span className="material-icons-round text-green-600 dark:text-green-400">arrow_downward</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-semibold text-text-light dark:text-text-dark">Depósito Manual</h4>
                      <span className="font-bold text-success dark:text-success">+ {formatCurrency(tx.amount)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-subtext-light dark:text-subtext-dark">
                      <span className="flex items-center">{formatDate(tx.date)}</span>
                      <span className="bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded text-xs font-medium">Slot #{tx.slotId}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-subtext-light">
                Nenhuma transação encontrada.
              </div>
            )}
          </div>
        </div>

        <div className="text-center py-6">
          <button className="text-primary text-sm font-medium hover:text-primary-dark transition-colors">
            Carregar mais antigos
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;