export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Generates slots 1..N where the sum is >= targetAmount
export const generateSlotsForTarget = (targetAmount: number): any[] => {
  // Formula for Sum of 1..n is n(n+1)/2 = Target
  // n^2 + n - 2*Target = 0
  // Quadratic formula: n = (-1 + sqrt(1 - 4(1)(-2T))) / 2
  // n = (-1 + sqrt(1 + 8T)) / 2
  
  let n = Math.ceil((-1 + Math.sqrt(1 + 8 * targetAmount)) / 2);
  
  // Ensure we have at least 1 slot
  if (n < 1) n = 1;

  return Array.from({ length: n }, (_, i) => ({
    id: i + 1,
    value: i + 1,
    status: 'pending'
  }));
};

export const generateInitialSlots = (count: number): any[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    value: i + 1,
    status: 'pending'
  }));
};