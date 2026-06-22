import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { S } from '../../constants/theme';
import { URGENCY_LEVELS } from '../../constants/fodmap';
import { fmt } from '../../utils/dateHelpers';

const HistoryScreen = ({ data, onDeleteMeal, onDeleteMovement }) => {
  const [expandedDate, setExpandedDate] = useState(null);

  const sortedEntries = [...data.entries]
    .filter((e) => e.meals.length > 0 || e.movements.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (sortedEntries.length === 0) {
    return (
      <div style={{ padding: 16 }}>
        <div style={S.emptyState}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>No history yet</div>
          <div style={{ fontSize: 13, marginTop: 6 }}>Your logged days will appear here</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#111827' }}>History</div>
      {sortedEntries.map((entry) => {
        const isOpen = expandedDate === entry.date;
        const movCount = entry.movements.length;
        const movColor = movCount <= 2 ? '#10B981' : movCount <= 4 ? '#F59E0B' : '#EF4444';
        return (
          <div key={entry.date} style={S.card}>
            <button
              onClick={() => setExpandedDate(isOpen ? null : entry.date)}
              style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>{fmt(entry.date)}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', marginTop: 3 }}>
                    {entry.meals.length} meal{entry.meals.length !== 1 ? 's' : ''} logged
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: movColor }}>{movCount}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>movements</div>
                  </div>
                  {isOpen ? <ChevronUp size={18} color="#9CA3AF" /> : <ChevronDown size={18} color="#9CA3AF" />}
                </div>
              </div>
            </button>

            {isOpen && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid #F3F4F6' }}>
                {entry.movements.length > 0 && (
                  <>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7280', marginBottom: 8, letterSpacing: '0.05em' }}>
                      MOVEMENTS
                    </div>
                    {entry.movements.map((m) => {
                      const u = URGENCY_LEVELS.find((u) => u.value === m.urgency);
                      return (
                        <div
                          key={m.id}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}
                        >
                          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <div style={{ width: 8, height: 8, borderRadius: '50%', background: u?.color }} />
                            <span style={{ fontSize: 13 }}>
                              {m.time} · <span style={{ color: u?.color, fontWeight: 500 }}>{u?.label}</span>
                            </span>
                            {m.notes ? <span style={{ fontSize: 12, color: '#9CA3AF' }}>· {m.notes}</span> : null}
                          </div>
                          <button
                            onClick={() => onDeleteMovement(entry.date, m.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1D5DB' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </>
                )}

                {entry.meals.length > 0 && (
                  <>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#6B7280',
                        marginBottom: 8,
                        marginTop: entry.movements.length > 0 ? 12 : 0,
                        letterSpacing: '0.05em',
                      }}
                    >
                      MEALS
                    </div>
                    {entry.meals.map((m) => (
                      <div key={m.id} style={{ padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: '#0B6B5B' }}>
                              {m.mealTime} · {m.time}
                            </div>
                            <div style={{ fontSize: 13, color: '#374151', marginTop: 2 }}>{m.foods}</div>
                            {m.notes && <div style={{ fontSize: 12, color: '#9CA3AF' }}>{m.notes}</div>}
                          </div>
                          <button
                            onClick={() => onDeleteMeal(entry.date, m.id)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1D5DB' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HistoryScreen;
