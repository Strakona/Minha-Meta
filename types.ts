export interface Slot {
  id: number;
  value: number;
  status: 'pending' | 'paid';
  paidAt?: string; // ISO Date string
}

export interface Transaction {
  id: string;
  slotId: number;
  amount: number;
  date: string;
  type: 'manual' | 'weekly' | 'quick';
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  slots: Slot[];
  createdAt: string;
  themeColor?: string; // Optional for future UI enhancements
}

export interface AppState {
  goals: SavingsGoal[];
  activeGoalId: string | null;
  transactions: Transaction[]; // Global transactions or per goal? For now global or derived
  filter: 'all' | 'pending' | 'completed';
}

export enum ViewState {
  GRID = 'GRID',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE',
  STATS = 'STATS'
}