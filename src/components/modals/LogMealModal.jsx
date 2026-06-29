import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { S } from '../../constants/theme';
import { MEAL_TIMES } from '../../constants/fodmap';
import { timeNow, fmt, today } from '../../utils/dateHelpers';

const LogMealModal = ({ onClose, onSave, initial = null, forDate }) => {
  const [mealTime, setMealTime] = useState(initial?.mealTime || MEAL_TIMES[0]);
  const [time, setTime] = useState(initial?.time || timeNow());
  const [foods, setFoods] = useState(initial?.foods || '');
  const [notes, setNotes] = useState(initial?.notes || '');

  const isEdit = !!initial;
  const isPastDate = forDate && forDate !== today();

  const save = () => {
    if (!foods.trim()) return;
    onSave({ mealTime, time, foods: foods.trim(), notes: notes.trim() });
  };

  return (
    <div style={S.modal} onClick={onClose}>
      <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
          <div>
            <span style={S.modalTitle}>{isEdit ? 'Edit Meal' : 'Log a Meal'}</span>
            {isPastDate && (
              <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{fmt(forDate)}</div>
            )}
          </div>
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
          <Check size={18} /> {isEdit ? 'Save Changes' : 'Save Meal'}
        </button>
      </div>
    </div>
  );
};

export default LogMealModal;
