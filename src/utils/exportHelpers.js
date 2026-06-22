import { today } from './dateHelpers';

export const exportCSV = (data) => {
  const rows = [['Date', 'Type', 'Time', 'Detail', 'Urgency', 'Notes', 'Mins After Waking']];
  data.entries.forEach((e) => {
    e.meals.forEach((m) =>
      rows.push([e.date, 'Meal', m.time, `${m.mealTime}: ${m.foods}`, '', m.notes, ''])
    );
    e.movements.forEach((m) =>
      rows.push([e.date, 'Movement', m.time, '', m.urgency, m.notes, m.minutesAfterWaking || ''])
    );
  });
  const csv = rows
    .map((r) => r.map((c) => `"${(c || '').toString().replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gut-tracker-${today()}.csv`;
  a.click();
};
