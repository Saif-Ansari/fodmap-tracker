import { supabase } from '../lib/supabase';

export const fetchEntries = async (userId) => {
  const [{ data: meals }, { data: movements }] = await Promise.all([
    supabase.from('meals').select('*').eq('user_id', userId),
    supabase.from('movements').select('*').eq('user_id', userId),
  ]);

  const map = {};
  for (const m of meals || []) {
    if (!map[m.date]) map[m.date] = { date: m.date, meals: [], movements: [] };
    map[m.date].meals.push({
      id: m.id,
      mealTime: m.meal_time,
      time: m.time,
      foods: m.foods,
      notes: m.notes || '',
    });
  }
  for (const m of movements || []) {
    if (!map[m.date]) map[m.date] = { date: m.date, meals: [], movements: [] };
    map[m.date].movements.push({
      id: m.id,
      time: m.time,
      urgency: m.urgency,
      notes: m.notes || '',
      minutesAfterWaking: m.minutes_after_waking,
    });
  }
  return { entries: Object.values(map) };
};

export const insertMeal = async (userId, date, meal) => {
  const { data, error } = await supabase
    .from('meals')
    .insert({ user_id: userId, date, meal_time: meal.mealTime, time: meal.time, foods: meal.foods, notes: meal.notes || null })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const insertMovement = async (userId, date, mov) => {
  const { data, error } = await supabase
    .from('movements')
    .insert({ user_id: userId, date, time: mov.time, urgency: mov.urgency, notes: mov.notes || null, minutes_after_waking: mov.minutesAfterWaking || null })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const removeMeal = async (userId, id) => {
  const { error } = await supabase.from('meals').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
};

export const removeMovement = async (userId, id) => {
  const { error } = await supabase.from('movements').delete().eq('id', id).eq('user_id', userId);
  if (error) throw error;
};

export const removeAll = async (userId) => {
  await Promise.all([
    supabase.from('meals').delete().eq('user_id', userId),
    supabase.from('movements').delete().eq('user_id', userId),
  ]);
};
