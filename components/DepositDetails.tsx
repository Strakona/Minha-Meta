import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSavings } from '../context';
import { formatCurrency, formatDate } from '../utils';

const DepositDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { slots, activeGoal, markAsPaid, undoPayment } = useSavings();

  const slotId = parseInt(id || '0');
  const slot = slots.find(s => s.id === slotId);

  if (!slot) return <div>Slot not found</div>;

  const isPaid = slot.status === 'paid';

  const handleToggle = () => {
    if (isPaid) {
      undoPayment(slotId);
    } else {
      markAsPaid(slotId);
      // Optional: Navigate back after success
      // setTimeout(() => navigate(-1), 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-background-light dark:bg-background-dark w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pt-2">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-primary"
        >
          <span className="material-icons-round text-3xl">chevron_left</span>
        </button>
        <h1 className="text-lg font-semibold">Deposit Details</h1>
        <button className="p-2 -mr-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors text-primary">
          <span className="material-icons-round text-2xl">more_horiz</span>
        </button>
      </div>

      <div className="flex-1 w-full mx-auto">
        {/* Main Card */}
        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft p-6 mb-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 relative transition-all duration-300">
            <span className="text-4xl font-bold text-primary">{slot.id}</span>
            {isPaid && (
              <div className="absolute -bottom-1 -right-1 bg-success rounded-full p-1 border-4 border-surface-light dark:border-surface-dark flex items-center justify-center animate-bounce-short">
                <span className="material-icons-round text-white text-sm">check</span>
              </div>
            )}
          </div>
          
          <h2 className="text-2xl font-bold mb-1">Slot #{slot.id}</h2>
          <p className="text-subtext-light dark:text-subtext-dark mb-6">{activeGoal?.name || 'Minha Meta'}</p>
          
          <div className="w-full h-px bg-gray-200 dark:bg-gray-700 mb-6"></div>
          
          <div className="mb-2">
            <span className="text-sm uppercase tracking-wide text-subtext-light dark:text-subtext-dark font-medium">Deposit Value</span>
          </div>
          <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            {formatCurrency(slot.value)}
          </div>

          <div className="w-full bg-background-light dark:bg-black/30 rounded-lg p-4 flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <span className="material-icons-round text-primary text-xl">calendar_today</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-subtext-light dark:text-subtext-dark font-medium">Date Deposited</p>
                <p className="font-medium text-sm">
                  {isPaid && slot.paidAt ? formatDate(slot.paidAt).split(',')[0] : 'Pending'}
                </p>
              </div>
            </div>
            <button className="text-primary text-sm font-medium opacity-50 cursor-not-allowed">Edit</button>
          </div>

          <div className="w-full bg-background-light dark:bg-black/30 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-md">
                <span className="material-icons-round text-primary text-xl">access_time</span>
              </div>
              <div className="text-left">
                <p className="text-xs text-subtext-light dark:text-subtext-dark font-medium">Time</p>
                <p className="font-medium text-sm">
                   {isPaid && slot.paidAt ? formatDate(slot.paidAt).split(',')[1] : '--:--'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {!isPaid ? (
            <button 
              onClick={handleToggle}
              className="w-full py-4 bg-primary hover:bg-blue-600 active:bg-blue-700 transition-colors text-white font-semibold rounded-xl text-lg shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2"
            >
              <span className="material-icons-round">check_circle</span>
              Mark as Deposited
            </button>
          ) : (
            <button 
              onClick={handleToggle}
              className="w-full py-4 bg-surface-light dark:bg-surface-dark text-red-500 font-medium rounded-xl text-md flex items-center justify-center gap-2 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors shadow-sm"
            >
              <span className="material-icons-round">undo</span>
              Undo Deposit
            </button>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-subtext-light dark:text-subtext-dark px-6">
          Marking this slot will add {formatCurrency(slot.value)} to your total savings progress.
        </p>
      </div>
    </div>
  );
};

export default DepositDetails;