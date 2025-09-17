export const perWeek = (centsPerDay: number) => centsPerDay * 7;

export const euro0 = (cents: number) => 
  (cents / 100).toLocaleString('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });