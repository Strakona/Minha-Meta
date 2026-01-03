import React, { createContext, useContext, useState, useEffect } from 'react';
import { Slot, Transaction, SavingsGoal, UserProfile } from './types';
import { generateSlotsForTarget } from './utils';
import { supabase } from './lib/supabase';
import { User } from '@supabase/supabase-js';

interface SavingsContextType {
  goals: SavingsGoal[];
  activeGoal: SavingsGoal | undefined;
  slots: Slot[]; // derived from activeGoal
  transactions: Transaction[]; // derived from activeGoal
  totalSaved: number;
  totalGoal: number;
  percentage: number;
  filter: 'all' | 'pending' | 'completed';
  isLoading: boolean;
  user: User | null;
  profile: UserProfile | null;
  setFilter: (filter: 'all' | 'pending' | 'completed') => void;
  signOut: () => Promise<void>;
  upgradeToPremium: () => Promise<void>;

  // Actions
  addGoal: (name: string, targetAmount: number) => Promise<void>;
  editGoal: (id: string, name: string, targetAmount: number) => Promise<void>;
  selectGoal: (id: string) => void;
  deleteGoal: (id: string) => Promise<void>;
  markAsPaid: (id: number) => Promise<void>;
  undoPayment: (id: number) => Promise<void>;
}

const SavingsContext = createContext<SavingsContextType | undefined>(undefined);

export const SavingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(() => {
    return localStorage.getItem('active_goal_id') || null;
  });
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Auth Listener
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (!session) setIsLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        setGoals([]);
        setProfile(null);
        setActiveGoalId(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch data when user is available
  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  // Fetch data from Supabase
  const fetchData = async () => {
    if (!user) return;
    // Don't set loading true here to avoid unmounting components during updates
    // setIsLoading(true); 
    try {
      const { data: goalsData, error: goalsError } = await supabase
        .from('goals')
        .select(`
          *,
          slots (*)
        `)
        .order('created_at', { ascending: false });

      if (goalsError) throw goalsError;

      const formattedGoals: SavingsGoal[] = goalsData.map(g => ({
        id: g.id,
        name: g.name,
        targetAmount: g.target_amount,
        createdAt: g.created_at,
        slots: g.slots.sort((a: any, b: any) => a.id - b.id).map((s: any) => ({
          id: s.id,
          value: s.value,
          status: s.status,
          paidAt: s.paid_at
        }))
      }));

      setGoals(formattedGoals);

      // If no active goal and we have goals, select the first one
      if (!activeGoalId && formattedGoals.length > 0) {
        setActiveGoalId(formattedGoals[0].id);
      }

      // 2. Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile({
          id: profileData.id,
          email: profileData.email,
          plan: profileData.plan
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeGoalId) {
      localStorage.setItem('active_goal_id', activeGoalId);
    }
  }, [activeGoalId]);

  // Derived State
  const activeGoal = goals.find(g => g.id === activeGoalId);
  const slots = activeGoal ? activeGoal.slots : [];

  const totalGoal = activeGoal
    ? slots.reduce((acc, s) => acc + s.value, 0)
    : 0;

  const totalSaved = slots.reduce((acc, slot) => slot.status === 'paid' ? acc + slot.value : acc, 0);

  const percentage = totalGoal > 0 ? Math.round((totalSaved / totalGoal) * 100) : 0;

  const transactions: Transaction[] = slots
    .filter(s => s.status === 'paid')
    .sort((a, b) => new Date(b.paidAt!).getTime() - new Date(a.paidAt!).getTime())
    .map(s => ({
      id: `tx-${activeGoalId}-${s.id}`,
      slotId: s.id,
      amount: s.value,
      date: s.paidAt!,
      type: 'manual'
    }));

  // Actions
  const addGoal = async (name: string, targetAmount: number) => {
    if (!user) return;

    // Enforce 1-goal limit for free users
    if (profile?.plan === 'free' && goals.length >= 1) {
      alert("A versão gratuita é limitada a 1 meta. Faça upgrade para o Plano Premium para criar metas ilimitadas!");
      return;
    }

    try {
      // 1. Insert goal (user_id will be handled by trigger or manually)
      const { data: newGoalData, error: goalError } = await supabase
        .from('goals')
        .insert([{ name, target_amount: targetAmount, user_id: user.id }])
        .select()
        .single();

      if (goalError) throw goalError;

      // 2. Generate and insert slots
      const newSlots = generateSlotsForTarget(targetAmount);
      const slotsToInsert = newSlots.map(s => ({
        goal_id: newGoalData.id,
        id: s.id,
        value: s.value,
        status: 'pending'
      }));

      const { error: slotsError } = await supabase
        .from('slots')
        .insert(slotsToInsert);

      if (slotsError) throw slotsError;

      await fetchData(); // Refresh data
      setActiveGoalId(newGoalData.id);
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const editGoal = async (id: string, name: string, targetAmount: number) => {
    if (!user) return;
    try {
      const goal = goals.find(g => g.id === id);
      if (!goal) return;

      const amountChanged = goal.targetAmount !== targetAmount;

      const { error: goalUpdateError } = await supabase
        .from('goals')
        .update({ name, target_amount: targetAmount })
        .eq('id', id);

      if (goalUpdateError) throw goalUpdateError;

      if (amountChanged) {
        // Re-generate slots
        await supabase.from('slots').delete().eq('goal_id', id);

        const newSlots = generateSlotsForTarget(targetAmount);
        const slotsToInsert = newSlots.map(s => ({
          goal_id: id,
          id: s.id,
          value: s.value,
          status: 'pending'
        }));

        await supabase.from('slots').insert(slotsToInsert);
      }

      await fetchData();
    } catch (error) {
      console.error('Error editing goal:', error);
    }
  };

  const selectGoal = (id: string) => {
    setActiveGoalId(id);
  };

  const deleteGoal = async (id: string) => {
    if (!user) return;
    try {
      const { error } = await supabase.from('goals').delete().eq('id', id);
      if (error) throw error;

      if (activeGoalId === id) {
        setActiveGoalId(null);
      }
      await fetchData();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const markAsPaid = async (slotId: number) => {
    if (!activeGoalId || !user) return;

    try {
      const { error } = await supabase
        .from('slots')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('goal_id', activeGoalId)
        .eq('id', slotId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error marking as paid:', error);
    }
  };

  const undoPayment = async (slotId: number) => {
    if (!activeGoalId || !user) return;

    try {
      const { error } = await supabase
        .from('slots')
        .update({ status: 'pending', paid_at: null })
        .eq('goal_id', activeGoalId)
        .eq('id', slotId);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error undoing payment:', error);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const upgradeToPremium = async () => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ plan: 'premium' })
        .eq('id', user.id);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    }
  };

  return (
    <SavingsContext.Provider value={{
      goals,
      activeGoal,
      slots,
      transactions,
      totalSaved,
      totalGoal,
      percentage,
      filter,
      isLoading,
      user,
      profile,
      setFilter,
      signOut,
      upgradeToPremium,
      addGoal,
      editGoal,
      selectGoal,
      deleteGoal,
      markAsPaid,
      undoPayment
    }}>
      {children}
    </SavingsContext.Provider>
  );
};

export const useSavings = () => {
  const context = useContext(SavingsContext);
  if (!context) throw new Error("useSavings must be used within SavingsProvider");
  return context;
};