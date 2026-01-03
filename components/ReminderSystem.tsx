import React, { useEffect, useState } from 'react';
import { useSavings } from '../context';

const ReminderSystem: React.FC = () => {
    const { goals, isLoading } = useSavings();
    const [showReminder, setShowReminder] = useState(false);
    const [daysInactive, setDaysInactive] = useState(0);

    useEffect(() => {
        if (isLoading || goals.length === 0) return;

        const checkInactivity = () => {
            let lastPaymentDate = new Date(0); // Epoch

            goals.forEach(goal => {
                goal.slots.forEach(slot => {
                    if (slot.status === 'paid' && slot.paidAt) {
                        const paidDate = new Date(slot.paidAt);
                        if (paidDate > lastPaymentDate) {
                            lastPaymentDate = paidDate;
                        }
                    }
                });
            });

            // If no payments ever, maybe don't show or show a different welcome? 
            // Let's assume we only remind if they have started.
            if (lastPaymentDate.getTime() === 0) return;

            const now = new Date();
            const diffTime = Math.abs(now.getTime() - lastPaymentDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays >= 3) {
                setDaysInactive(diffDays);
                // Check if we already showed it this session to avoid annoyance
                const sessionReminded = sessionStorage.getItem('reminder_shown');
                if (!sessionReminded) {
                    setShowReminder(true);
                    sessionStorage.setItem('reminder_shown', 'true');
                }
            }
        };

        checkInactivity();
    }, [goals, isLoading]);

    if (!showReminder) return null;

    return (
        <div className="fixed bottom-4 right-4 max-w-sm w-full z-[100] animate-slide-in-right md:right-8 md:bottom-8">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 rounded-2xl shadow-2xl border-l-4 border-yellow-500 relative overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={() => setShowReminder(false)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                >
                    <span className="material-icons-round text-sm">close</span>
                </button>

                <div className="flex items-start gap-4">
                    <div className="bg-yellow-500/20 p-3 rounded-full shrink-0">
                        <span className="material-icons-round text-yellow-400 text-xl animate-pulse">history</span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-1">Não perca o ritmo! 🔥</h4>
                        <p className="text-gray-300 text-sm leading-snug mb-3">
                            Faz <strong>{daysInactive} dias</strong> que você não marca nenhum slot.
                            Que tal um depósito de R$ 5,00 hoje para manter o hábito?
                        </p>
                        <button
                            onClick={() => setShowReminder(false)}
                            className="text-xs font-bold text-yellow-400 hover:text-yellow-300 uppercase tracking-wide flex items-center gap-1"
                        >
                            Marcar Slot Agora
                            <span className="material-icons-round text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReminderSystem;
