import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { S } from '../../constants/theme';
import { MEAL_TIMES } from '../../constants/fodmap';
import { timeNow } from '../../utils/dateHelpers';

const LogMealModal = ({ onClose, onSave }) => {
  const [mealTime, setMealTime] = useState(MEAL_TIMES[0]);
  const [time, setTime] = useState(timeNow());
  const [foods, setFoods] = useState('');
  const [notes, setNotes] = useState('');

  const save = () => {
    if (!foods.trim()) return;
    onSave({ id: Date.now(), mealTime, time, foods: foods.trim(), notes: notes.trim() });
    onClose();
  };

  return (
    <div style={S.modal} onClick={onClose}>
      <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={S.modalTitle}>Log a Meal</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
            <X size={22} />
          </button>
        </div>

        <label style={S.label}>Meal type</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
          {MEAL_TIMES.map((m) => (
            <button key={m} onClick={() => setMealTime(m)} style={{ ...S.tag, ...(mealTime === m ? S.tagActive : {}) }}>
              {m}
            </button>
          ))}
        </div>

        <label style={S.label}>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ ...S.input, marginBottom: 16 }}
        />

        <label style={S.label}>
          What did you eat?{' '}
          <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(be specific with portions)</span>
        </label>
        <textarea
          value={foods}
          onChange={(e) => setFoods(e.target.value)}
          placeholder="e.g. ½ cup moong dal + 2 bajra chapati + egg whites + small curd"
          style={{ ...S.input, minHeight: 90, resize: 'vertical', marginBottom: 16 }}
        />

        <label style={S.label}>
          Notes <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any observations..."
          style={{ ...S.input, marginBottom: 20 }}
        />

        <button style={S.btn} onClick={save}>
          <Check size={18} /> Save Meal
        </button>
      </div>
    </div>
  );
};

export default LogMealModal;
