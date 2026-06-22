import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { S } from '../../constants/theme';
import { URGENCY_LEVELS } from '../../constants/fodmap';
import { timeNow } from '../../utils/dateHelpers';

const LogMovementModal = ({ onClose, onSave }) => {
  const [time, setTime] = useState(timeNow());
  const [urgency, setUrgency] = useState('medium');
  const [notes, setNotes] = useState('');
  const [minutesAfterWaking, setMinutesAfterWaking] = useState('');

  const save = () => {
    onSave({
      id: Date.now(),
      time,
      urgency,
      notes: notes.trim(),
      minutesAfterWaking: minutesAfterWaking ? parseInt(minutesAfterWaking) : null,
    });
    onClose();
  };

  return (
    <div style={S.modal} onClick={onClose}>
      <div style={S.modalBox} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={S.modalTitle}>Log a Movement</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
            <X size={22} />
          </button>
        </div>

        <label style={S.label}>Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ ...S.input, marginBottom: 16 }}
        />

        <label style={S.label}>Urgency</label>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          {URGENCY_LEVELS.map((u) => (
            <button
              key={u.value}
              onClick={() => setUrgency(u.value)}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: `2px solid ${urgency === u.value ? u.color : '#E5E7EB'}`,
                borderRadius: 12,
                background: urgency === u.value ? u.bg : '#fff',
                color: urgency === u.value ? u.color : '#6B7280',
                fontWeight: 600,
                fontSize: 13,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {u.label}
            </button>
          ))}
        </div>

        <label style={S.label}>
          Minutes after waking{' '}
          <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(if morning)</span>
        </label>
        <input
          type="number"
          value={minutesAfterWaking}
          onChange={(e) => setMinutesAfterWaking(e.target.value)}
          placeholder="e.g. 30"
          style={{ ...S.input, marginBottom: 16 }}
        />

        <label style={S.label}>
          Notes <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
        </label>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. after lunch, felt bloated"
          style={{ ...S.input, marginBottom: 20 }}
        />

        <button style={S.btn} onClick={save}>
          <Check size={18} /> Save Movement
        </button>
      </div>
    </div>
  );
};

export default LogMovementModal;
