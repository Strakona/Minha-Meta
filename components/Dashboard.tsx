import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavings } from '../context';
import { formatCurrency } from '../utils';
import { Slot } from '../types';

type SortOption = 'id' | 'date_desc' | 'date_asc';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { slots, activeGoal, totalSaved, totalGoal, percentage, filter, setFilter, markAsPaid, undoPayment } = useSavings();

  const [sortBy, setSortBy] = useState<SortOption>('id');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  // Reset pagination and modal when filter or goal changes
  useEffect(() => {
    setShowAll(false);
    setSelectedSlot(null);
  }, [filter, activeGoal]);

  // If no goal is selected, redirect (safety check)
  if (!activeGoal) {
    // In a real app we might redirect here, but let's show a friendly empty state
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <p className="mb-4 text-lg">Nenhuma meta selecionada.</p>
        <button
          onClick={() => navigate('/goals')}
          className="px-6 py-3 bg-primary text-white rounded-xl"
        >
          Selecionar Meta
        </button>
      </div>
    )
  }

  // 1. Filter slots based on status tabs
  const filteredSlots = slots.filter(slot => {
    if (filter === 'pending') return slot.status === 'pending';
    if (filter === 'completed') return slot.status === 'paid';
    return true;
  });

  // 2. Sort the filtered slots based on selection
  const sortedSlots = [...filteredSlots].sort((a, b) => {
    if (sortBy === 'id') {
      return a.id - b.id;
    }

    // For date sorting, we prioritize Paid items to show "Deposits" first
    if (sortBy === 'date_desc') { // Most Recent
      if (a.status === 'paid' && b.status === 'paid') {
        return new Date(b.paidAt!).getTime() - new Date(a.paidAt!).getTime();
      }
      // Paid items come before Pending items
      if (a.status === 'paid') return -1;
      if (b.status === 'paid') return 1;
      // If both are pending, sort by ID
      return a.id - b.id;
    }

    if (sortBy === 'date_asc') { // Oldest
      if (a.status === 'paid' && b.status === 'paid') {
        return new Date(a.paidAt!).getTime() - new Date(b.paidAt!).getTime();
      }
      // Paid items come before Pending items
      if (a.status === 'paid') return -1;
      if (b.status === 'paid') return 1;
      // If both are pending, sort by ID
      return a.id - b.id;
    }

    return 0;
  });

  const remaining = totalGoal - totalSaved;

  const handleSortSelect = (option: SortOption) => {
    setSortBy(option);
    setShowSortMenu(false);
  };

  const handleSlotClick = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleModalAction = () => {
    if (!selectedSlot) return;

    if (selectedSlot.status === 'paid') {
      undoPayment(selectedSlot.id);
    } else {
      markAsPaid(selectedSlot.id);
    }
    setSelectedSlot(null);
  };

  const displayedSlots = showAll ? sortedSlots : sortedSlots.slice(0, 100);

  return (
    <div className="w-full px-4 pt-4 pb-4 min-h-screen" onClick={() => showSortMenu && setShowSortMenu(false)}>
      {/* Header */}
      <header className="mb-6 flex justify-between items-start pt-2 relative z-20">
        <div onClick={() => navigate('/goals')} className="cursor-pointer group">
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium text-subtext-light dark:text-subtext-dark uppercase tracking-wide">Minha Meta</p>
            <span className="material-icons-round text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">edit</span>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 truncate max-w-[200px] xs:max-w-xs">
            {activeGoal.name.toUpperCase()}
          </h1>
        </div>
        <div className="flex gap-2">
          {/* Sort Button */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowSortMenu(!showSortMenu);
              }}
              className={`p-2 rounded-full shadow-soft transition-colors ${sortBy !== 'id'
                ? 'bg-primary text-white'
                : 'bg-white dark:bg-surface-dark text-gray-500 hover:text-primary'
                }`}
            >
              <span className="material-icons-round">sort</span>
            </button>

            {/* Sort Dropdown Menu */}
            {showSortMenu && (
              <div className="absolute right-0 top-12 w-48 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 overflow-hidden z-50 animate-fade-in-up origin-top-right">
                <button
                  onClick={() => handleSortSelect('id')}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${sortBy === 'id' ? 'text-primary font-bold' : 'text-text-light dark:text-text-dark'}`}
                >
                  <span className="material-icons-round text-lg">123</span>
                  Por Valor (Padrão)
                </button>
                <button
                  onClick={() => handleSortSelect('date_desc')}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${sortBy === 'date_desc' ? 'text-primary font-bold' : 'text-text-light dark:text-text-dark'}`}
                >
                  <span className="material-icons-round text-lg">calendar_today</span>
                  Mais Recentes
                </button>
                <button
                  onClick={() => handleSortSelect('date_asc')}
                  className={`w-full text-left px-4 py-3 text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${sortBy === 'date_asc' ? 'text-primary font-bold' : 'text-text-light dark:text-text-dark'}`}
                >
                  <span className="material-icons-round text-lg">history</span>
                  Mais Antigos
                </button>
              </div>
            )}
          </div>

          {/* Settings/Goals Button */}
          <button
            onClick={() => navigate('/goals')}
            className="p-2 rounded-full bg-white dark:bg-surface-dark shadow-soft text-gray-500 hover:text-primary transition-colors"
          >
            <span className="material-icons-round">folder_open</span>
          </button>
        </div>
      </header>

      {/* Summary Card */}
      <div className="bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft mb-8 relative overflow-hidden group w-full">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-sm text-subtext-light dark:text-subtext-dark block mb-1">Total Guardado</span>
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatCurrency(totalSaved)}</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg">
              {percentage}% Concluído
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-subtext-light dark:text-subtext-dark text-right">Faltam {formatCurrency(remaining)} para a meta</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-3 mb-6 overflow-x-auto no-scrollbar pb-1">
        {(['all', 'pending', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${filter === f
              ? 'bg-primary text-white shadow-glow'
              : 'bg-white dark:bg-surface-dark text-subtext-light dark:text-subtext-dark border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            {f === 'all' ? 'Todos' : f === 'pending' ? 'Pendentes' : 'Concluídos'}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div id="slots-grid" className="bg-surface-light dark:bg-surface-dark rounded-3xl p-4 shadow-soft">
        <div className="grid grid-cols-5 gap-2.5 xs:grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14">
          {displayedSlots.map((slot) => (
            <div
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              className={`aspect-square flex items-center justify-center rounded-xl font-semibold text-sm shadow-sm cursor-pointer transition-all transform hover:scale-105 select-none relative group
                ${slot.status === 'paid'
                  ? 'bg-success text-white'
                  : 'bg-gray-50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 hover:border-gray-200 dark:hover:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
              `}
            >
              {slot.id}
              {slot.status === 'paid' && (
                <span className="material-icons-round absolute text-xs opacity-0 group-hover:opacity-100 transition-opacity">check</span>
              )}
            </div>
          ))}
        </div>

        {sortedSlots.length > 100 && (
          <div className="text-center py-6">
            {!showAll && (
              <p className="text-xs text-subtext-light dark:text-subtext-dark mb-2">Mostrando 100 de {sortedSlots.length} slots</p>
            )}
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-primary text-sm font-medium flex items-center justify-center mx-auto hover:underline"
            >
              {showAll ? 'Ver menos' : 'Ver todos'}
              <span className="material-icons-round text-base ml-1">
                {showAll ? 'expand_less' : 'expand_more'}
              </span>
            </button>
          </div>
        )}

        {sortedSlots.length === 0 && (
          <div className="py-12 text-center text-subtext-light">
            <span className="material-icons-round text-4xl mb-2 opacity-50">search_off</span>
            <p>Nenhum slot encontrado.</p>
          </div>
        )}
      </div>

      {/* Action Modal */}
      {selectedSlot && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedSlot(null)}
        >
          <div
            className="bg-white dark:bg-surface-dark w-full max-w-xs rounded-3xl p-6 shadow-2xl animate-scale-in text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
              <span className="material-icons-round text-3xl text-gray-500 dark:text-gray-400">
                {selectedSlot.status === 'paid' ? 'check' : 'savings'}
              </span>
            </div>

            <h2 className="text-xl font-bold mb-1">Slot #{selectedSlot.id}</h2>
            <p className="text-subtext-light dark:text-subtext-dark text-sm mb-6">{activeGoal.name}</p>

            <p className="text-4xl font-bold text-primary mb-8 tracking-tight">
              {formatCurrency(selectedSlot.value)}
            </p>

            <button
              onClick={handleModalAction}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${selectedSlot.status === 'paid'
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                  : 'bg-primary hover:bg-blue-600 shadow-blue-500/30'
                }`}
            >
              <span className="material-icons-round">
                {selectedSlot.status === 'paid' ? 'undo' : 'check_circle'}
              </span>
              {selectedSlot.status === 'paid' ? 'Retirado' : 'Depositado'}
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <button
          onClick={() => {
            const nextPending = slots.find(s => s.status === 'pending');
            if (nextPending) {
              setSelectedSlot(nextPending);
              const gridElement = document.getElementById('slots-grid');
              if (gridElement) {
                gridElement.scrollIntoView({ behavior: 'smooth' });
              }
            }
          }}
          className="h-14 w-14 bg-gradient-to-tr from-primary to-purple-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-200"
          aria-label="Depósito Rápido"
        >
          <span className="material-icons-round text-2xl">add</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;