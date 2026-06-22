import React from 'react';
import { Utensils, Activity, Trash2 } from 'lucide-react';
import { S } from '../../constants/theme';
import { URGENCY_LEVELS } from '../../constants/fodmap';
import { today, todayLabel, getDayEntry } from '../../utils/dateHelpers';
import MovementDots from '../MovementDots';

const HomeScreen = ({ data, onAddMeal, onAddMovement, onDeleteMeal, onDeleteMovement }) => {
  const todayEntry = getDayEntry(data.entries, today());
  const movementCount = todayEntry.movements.length;
  const mealCount = todayEntry.meals.length;

  const last7 = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split('T')[0];
    const entry = getDayEntry(data.entries, dateStr);
    return { date: dateStr, day: d.toLocaleDateString('en-IN', { weekday: 'short' }), count: entry.movements.length };
  });
  const maxCount = Math.max(...last7.map((d) => d.count), 1);

  return (
    <div style={{ padding: '16px 16px 0' }}>
      {/* TODAY HERO */}
      <div style={{ ...S.card, background: 'linear-gradient(135deg, #0B6B5B 0%, #0d8a73 100%)', color: '#fff', marginBottom: 12 }}>
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>{todayLabel()}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>Bowel movements today</div>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1, color: movementCount <= 4 ? '#fff' : '#FCA5A5' }}>
              {movementCount}
            </div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>
              {movementCount === 0
                ? 'None logged yet'
                : movementCount <= 2
                ? 'Looking good'
                : movementCount <= 4
                ? 'Within your range'
                : 'Above usual range'}
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 6 }}>Meals logged</div>
            <div style={{ fontSize: 52, fontWeight: 700, lineHeight: 1 }}>{mealCount}</div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>today</div>
          </div>
        </div>
        {movementCount > 0 && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
            <MovementDots count={movementCount} size={12} />
          </div>
        )}
      </div>

      {/* QUICK LOG BUTTONS */}
      <div style={{ ...S.row, marginBottom: 12 }}>
        <button style={{ ...S.btn, flex: 1 }} onClick={onAddMeal}>
          <Utensils size={17} /> Log Meal
        </button>
        <button style={{ ...S.btn, flex: 1, background: '#064e3b' }} onClick={onAddMovement}>
          <Activity size={17} /> Log Movement
        </button>
      </div>

      {/* 7-DAY CHART */}
      <div style={S.card}>
        <div style={S.cardTitle}>7-Day Movement Trend</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 60 }}>
          {last7.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div
                style={{
                  width: '100%',
                  background: d.date === today() ? '#0B6B5B' : '#E8F5F1',
                  borderRadius: '4px 4px 0 0',
                  height: d.count === 0 ? 4 : (d.count / maxCount) * 52,
                  minHeight: 4,
                  transition: 'height 0.3s',
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  color: d.date === today() ? '#0B6B5B' : '#9CA3AF',
                  fontWeight: d.date === today() ? 700 : 400,
                }}
              >
                {d.day}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TODAY'S LOG */}
      <div style={S.card}>
        <div style={S.cardTitle}>Today's Log</div>

        {todayEntry.meals.length === 0 && todayEntry.movements.length === 0 && (
          <div style={S.emptyState}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🌿</div>
            <div style={{ fontSize: 14, fontWeight: 500 }}>Nothing logged yet</div>
            <div style={{ fontSize: 13, marginTop: 4 }}>Tap the buttons above to start</div>
          </div>
        )}

        {todayEntry.movements.length > 0 && (
          <>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>MOVEMENTS</div>
            {todayEntry.movements.map((m) => {
              const u = URGENCY_LEVELS.find((u) => u.value === m.urgency);
              return (
                <div
                  key={m.id}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}
                >
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: u?.color, marginTop: 4, flexShrink: 0 }} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 500 }}>
                        {m.time} · <span style={{ color: u?.color }}>{u?.label}</span>
                      </div>
                      {m.minutesAfterWaking && (
                        <div style={{ fontSize: 12, color: '#6B7280' }}>{m.minutesAfterWaking} min after waking</div>
                      )}
                      {m.notes && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{m.notes}</div>}
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteMovement(today(), m.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1D5DB', padding: 4 }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}
          </>
        )}

        {todayEntry.meals.length > 0 && todayEntry.movements.length > 0 && <div style={S.divider} />}

        {todayEntry.meals.length > 0 && (
          <>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: '#6B7280',
                marginBottom: 8,
                marginTop: todayEntry.movements.length > 0 ? 4 : 0,
              }}
            >
              MEALS
            </div>
            {todayEntry.meals.map((m) => (
              <div
                key={m.id}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #F3F4F6' }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flex: 1 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#0B6B5B', marginTop: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0B6B5B' }}>
                      {m.mealTime} · {m.time}
                    </div>
                    <div style={{ fontSize: 13, color: '#374151', marginTop: 2, lineHeight: 1.5 }}>{m.foods}</div>
                    {m.notes && <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>{m.notes}</div>}
                  </div>
                </div>
                <button
                  onClick={() => onDeleteMeal(today(), m.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#D1D5DB', padding: 4 }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
