import { useState, useEffect } from 'react';
import { fetchEntries, insertMeal, insertMovement, updateMeal, updateMovement, removeMeal, removeMovement, removeAll } from './useStorage';
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

  const addMeal = async (meal, date) => {
    const d = date || today();
    const saved = await insertMeal(userId, d, meal);
    upsertEntry(d, (e) => ({
      ...e,
      meals: [...e.meals, { id: saved.id, mealTime: saved.meal_time, time: saved.time, foods: saved.foods, notes: saved.notes || '' }],
    }));
    appendToSheet({ date: d, type: 'Meal', time: meal.time, detail: `${meal.mealTime}: ${meal.foods}`, urgency: '', notes: meal.notes || '', minutesAfterWaking: '' });
  };

  const addMovement = async (mov, date) => {
    const d = date || today();
    const saved = await insertMovement(userId, d, mov);
    upsertEntry(d, (e) => ({
      ...e,
      movements: [...e.movements, { id: saved.id, time: saved.time, urgency: saved.urgency, notes: saved.notes || '', minutesAfterWaking: saved.minutes_after_waking }],
    }));
    appendToSheet({ date: d, type: 'Movement', time: mov.time, detail: '', urgency: mov.urgency, notes: mov.notes || '', minutesAfterWaking: mov.minutesAfterWaking || '' });
  };

  const editMeal = async (date, id, meal) => {
    const saved = await updateMeal(userId, id, meal);
    upsertEntry(date, (e) => ({
      ...e,
      meals: e.meals.map((m) => m.id === id ? { id: saved.id, mealTime: saved.meal_time, time: saved.time, foods: saved.foods, notes: saved.notes || '' } : m),
    }));
  };

  const editMovement = async (date, id, mov) => {
    const saved = await updateMovement(userId, id, mov);
    upsertEntry(date, (e) => ({
      ...e,
      movements: e.movements.map((m) => m.id === id ? { id: saved.id, time: saved.time, urgency: saved.urgency, notes: saved.notes || '', minutesAfterWaking: saved.minutes_after_waking } : m),
    }));
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

  return { data, loading, addMeal, addMovement, editMeal, editMovement, deleteMeal, deleteMovement, clearAll };
}
