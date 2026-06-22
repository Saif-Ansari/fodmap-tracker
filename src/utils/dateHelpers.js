export const today = () => new Date().toISOString().split('T')[0];

export const fmt = (iso) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

export const timeNow = () => new Date().toTimeString().slice(0, 5);

export const todayLabel = () =>
  new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

export const getDayEntry = (entries, date) =>
  entries.find((e) => e.date === date) || { date, meals: [], movements: [] };
