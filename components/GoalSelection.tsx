import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSavings } from '../context';
import { formatCurrency } from '../utils';
import { SavingsGoal } from '../types';

const GoalSelection: React.FC = () => {
  const navigate = useNavigate();
  const { goals, addGoal, selectGoal, deleteGoal, editGoal } = useSavings();
  
  // State for Create Modal
  const [isCreating, setIsCreating] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');

  // State for Edit Modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editGoalName, setEditGoalName] = useState('');
  const [editGoalAmount, setEditGoalAmount] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalName || !newGoalAmount) return;

    const amount = parseFloat(newGoalAmount);
    if (isNaN(amount) || amount <= 0) return;

    addGoal(newGoalName, amount);
    setIsCreating(false);
    setNewGoalName('');
    setNewGoalAmount('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoalId || !editGoalName || !editGoalAmount) return;

    const amount = parseFloat(editGoalAmount);
    if (isNaN(amount) || amount <= 0) return;

    const currentGoal = goals.find(g => g.id === editingGoalId);
    // If changing amount, warn user
    if (currentGoal && currentGoal.targetAmount !== amount) {
        if (!window.confirm("Alterar o valor da meta irá recalcular os slots e reiniciar o progresso. Deseja continuar?")) {
            return;
        }
    }

    editGoal(editingGoalId, editGoalName, amount);
    setIsEditing(false);
    setEditingGoalId(null);
  };

  const openEditModal = (e: React.MouseEvent, goal: SavingsGoal) => {
    e.stopPropagation();
    setEditingGoalId(goal.id);
    setEditGoalName(goal.name);
    setEditGoalAmount(goal.targetAmount.toString());
    setIsEditing(true);
  };

  const handleSelect = (id: string) => {
    selectGoal(id);
    navigate('/dashboard');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    // Using a timeout to ensure the UI doesn't try to navigate or do anything weird
    // and ensuring the click didn't bubble unexpectedly before this
    if (window.confirm('Tem certeza que deseja excluir esta meta?')) {
        deleteGoal(id);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark p-4 flex flex-col">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Minhas Metas
        </h1>
        <p className="text-subtext-light dark:text-subtext-dark mt-1">
          Escolha um objetivo ou crie um novo
        </p>
      </header>

      {/* List of Goals */}
      <div className="flex-1 space-y-4 overflow-y-auto pb-24 no-scrollbar">
        {goals.map((goal) => {
            const totalSaved = goal.slots.reduce((acc, s) => s.status === 'paid' ? acc + s.value : acc, 0);
            const realTotal = goal.slots.reduce((acc, s) => acc + s.value, 0);
            const percentage = Math.round((totalSaved / realTotal) * 100);

            return (
                <div 
                key={goal.id} 
                onClick={() => handleSelect(goal.id)}
                className="group relative bg-surface-light dark:bg-surface-dark rounded-2xl p-5 shadow-soft border border-gray-100 dark:border-gray-800 cursor-pointer hover:shadow-glow transition-all active:scale-[0.98]"
                >
                <div className="flex justify-between items-start mb-4 relative z-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="material-icons-round text-primary text-2xl">flag</span>
                    </div>
                    
                    {/* Actions Container - High Z-index */}
                    <div className="flex gap-1 z-30">
                        <button 
                            onClick={(e) => openEditModal(e, goal)}
                            className="p-2 text-gray-400 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all"
                            title="Editar"
                        >
                            <span className="material-icons-round text-xl">edit</span>
                        </button>
                        <button 
                            onClick={(e) => handleDelete(e, goal.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all"
                            title="Excluir"
                        >
                            <span className="material-icons-round text-xl">delete_outline</span>
                        </button>
                    </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{goal.name}</h3>
                <p className="text-sm text-subtext-light dark:text-subtext-dark mb-4">Meta: {formatCurrency(goal.targetAmount)}</p>
                
                <div className="flex items-end justify-between mb-2">
                    <span className="text-2xl font-bold text-primary">{formatCurrency(totalSaved)}</span>
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-subtext-light dark:text-subtext-dark">
                        {percentage}%
                    </span>
                </div>

                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                    ></div>
                </div>
                </div>
            );
        })}

        {goals.length === 0 && !isCreating && (
            <div className="text-center py-10 opacity-60">
                <span className="material-icons-round text-5xl mb-2 text-gray-300">add_task</span>
                <p className="text-subtext-light dark:text-subtext-dark">Nenhuma meta criada ainda.</p>
            </div>
        )}
      </div>

      {/* Floating Add Button - Z-Index 50 ensures it's above other elements */}
      {!isCreating && !isEditing && (
        <div className="fixed bottom-24 right-6 z-40">
            <button 
                onClick={() => setIsCreating(true)}
                className="h-14 w-14 bg-gradient-to-tr from-primary to-purple-600 rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center text-white hover:scale-110 transition-transform duration-200"
            >
                <span className="material-icons-round text-2xl">add</span>
            </button>
        </div>
      )}

      {/* Create Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Nova Meta</h2>
                    <button onClick={() => setIsCreating(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-icons-round">close</span>
                    </button>
                </div>

                <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-1">Nome da Meta</label>
                        <input 
                            type="text" 
                            placeholder="Ex: Viagem, Carro Novo, Reserva" 
                            value={newGoalName}
                            onChange={(e) => setNewGoalName(e.target.value)}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-1">Valor Alvo (R$)</label>
                        <input 
                            type="number" 
                            placeholder="Ex: 5000" 
                            value={newGoalAmount}
                            onChange={(e) => setNewGoalAmount(e.target.value)}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                         <p className="text-xs text-subtext-light dark:text-subtext-dark mt-2">
                            O app criará automaticamente uma grade de depósitos progressivos.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={!newGoalName || !newGoalAmount}
                            className="w-full py-4 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                        >
                            Criar Meta
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark:bg-surface-dark w-full max-w-md rounded-2xl p-6 shadow-2xl animate-fade-in-up">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Editar Meta</h2>
                    <button onClick={() => { setIsEditing(false); setEditingGoalId(null); }} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-icons-round">close</span>
                    </button>
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-1">Nome da Meta</label>
                        <input 
                            type="text" 
                            value={editGoalName}
                            onChange={(e) => setEditGoalName(e.target.value)}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                            autoFocus
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-subtext-light dark:text-subtext-dark mb-1">Valor Alvo (R$)</label>
                        <input 
                            type="number" 
                            value={editGoalAmount}
                            onChange={(e) => setEditGoalAmount(e.target.value)}
                            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                        />
                         <p className="text-xs text-orange-500 mt-2 font-medium">
                            Atenção: Alterar o valor irá reiniciar seu progresso nesta meta.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button 
                            type="submit" 
                            disabled={!editGoalName || !editGoalAmount}
                            className="w-full py-4 bg-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all"
                        >
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default GoalSelection;