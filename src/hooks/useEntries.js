import { useState, useEffect } from 'react';
import { fetchEntries, insertMeal, insertMovement, removeMeal, removeMovement, removeAll } from './useStorage';
import { today } from '../utils/dateHelpers';
import { appendToSheet } from '../utils/sheetsSync';

export function useEntries(userId) {
  const [data, setData] = useState({ entries: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchEntries(userId).then((d) => {
      setData(d);
      setLoading(false);
    });
  }, [userId]);

  const upsertEntry = (date, updater) => {
    setData((prev) => {
      const entries = [...prev.entries];
      const idx = entries.findIndex((e) => e.date === date);
      if (idx === -1) entries.push(updater({ date, meals: [], movements: [] }));
      else entries[idx] = updater({ ...entries[idx] });
      return { ...prev, entries };
    });
  };

  const addMeal = async (meal) => {
    const date = today();
    const saved = await insertMeal(userId, date, meal);
    upsertEntry(date, (e) => ({
      ...e,
      meals: [...e.meals, { id: saved.id, mealTime: saved.meal_time, time: saved.time, foods: saved.foods, notes: saved.notes || '' }],
    }));
    appendToSheet({ date, type: 'Meal', time: meal.time, detail: `${meal.mealTime}: ${meal.foods}`, urgency: '', notes: meal.notes || '', minutesAfterWaking: '' });
  };

  const addMovement = async (mov) => {
    const date = today();
    const saved = await insertMovement(userId, date, mov);
    upsertEntry(date, (e) => ({
      ...e,
      movements: [...e.movements, { id: saved.id, time: saved.time, urgency: saved.urgency, notes: saved.notes || '', minutesAfterWaking: saved.minutes_after_waking }],
    }));
    appendToSheet({ date, type: 'Movement', time: mov.time, detail: '', urgency: mov.urgency, notes: mov.notes || '', minutesAfterWaking: mov.minutesAfterWaking || '' });
  };

  const deleteMeal = async (date, id) => {
    await removeMeal(userId, id);
    upsertEntry(date, (e) => ({ ...e, meals: e.meals.filter((m) => m.id !== id) }));
  };

  const deleteMovement = async (date, id) => {
    await removeMovement(userId, id);
    upsertEntry(date, (e) => ({ ...e, movements: e.movements.filter((m) => m.id !== id) }));
  };

  const clearAll = async () => {
    if (window.confirm('Delete all data? This cannot be undone.')) {
      await removeAll(userId);
      setData({ entries: [] });
    }
  };

  return { data, loading, addMeal, addMovement, deleteMeal, deleteMovement, clearAll };
}
