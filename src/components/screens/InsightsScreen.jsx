import React from 'react';
import { AlertCircle } from 'lucide-react';
import { S } from '../../constants/theme';
import { URGENCY_LEVELS } from '../../constants/fodmap';

const InsightsScreen = ({ data }) => {
  const entries = data.entries.filter((e) => e.movements.length > 0);

  if (entries.length < 3) {
    return (
      <div style={{ padding: 16 }}>
        <div style={S.emptyState}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>📊</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>Keep logging</div>
          <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.6 }}>
            Insights appear after a few days of data. Patterns need time to emerge — stay consistent.
          </div>
        </div>
      </div>
    );
  }

  const totalDays = entries.length;
  const totalMovements = entries.reduce((s, e) => s + e.movements.length, 0);
  const avg = (totalMovements / totalDays).toFixed(1);
  const best = Math.min(...entries.map((e) => e.movements.length));

  const allMovements = entries.flatMap((e) => e.movements);
  const urgencyCounts = { low: 0, medium: 0, high: 0 };
  allMovements.forEach((m) => {
    if (urgencyCounts[m.urgency] !== undefined) urgencyCounts[m.urgency]++;
  });

  const thisWeekEntries = entries.filter((e) => {
    const days = (new Date() - new Date(e.date)) / (1000 * 60 * 60 * 24);
    return days <= 7;
  });
  const lastWeekEntries = entries.filter((e) => {
    const days = (new Date() - new Date(e.date)) / (1000 * 60 * 60 * 24);
    return days > 7 && days <= 14;
  });
  const thisWeekAvg = thisWeekEntries.length
    ? (thisWeekEntries.reduce((s, e) => s + e.movements.length, 0) / thisWeekEntries.length).toFixed(1)
    : null;
  const lastWeekAvg = lastWeekEntries.length
    ? (lastWeekEntries.reduce((s, e) => s + e.movements.length, 0) / lastWeekEntries.length).toFixed(1)
    : null;
  const improving = thisWeekAvg && lastWeekAvg && parseFloat(thisWeekAvg) < parseFloat(lastWeekAvg);

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#111827' }}>Insights</div>

      {/* SUMMARY STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 12 }}>
        {[
          { label: 'Avg / day', value: avg, color: parseFloat(avg) <= 4 ? '#10B981' : '#F59E0B' },
          { label: 'Best day', value: best, color: '#10B981' },
          { label: 'Days logged', value: totalDays, color: '#0B6B5B' },
        ].map((s) => (
          <div key={s.label} style={{ ...S.card, textAlign: 'center', marginBottom: 0, padding: '14px 8px' }}>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#6B7280', marginTop: 3 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* WEEK ON WEEK */}
      {thisWeekAvg && lastWeekAvg && (
        <div
          style={{
            ...S.card,
            background: improving ? '#F0FDF4' : '#FFF7ED',
            border: `1px solid ${improving ? '#BBF7D0' : '#FED7AA'}`,
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div style={{ fontSize: 28 }}>{improving ? '📉' : '📈'}</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: improving ? '#065F46' : '#92400E' }}>
                {improving ? 'Trending better' : 'Trending higher'}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
                This week avg: <strong>{thisWeekAvg}</strong> vs last week: <strong>{lastWeekAvg}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* URGENCY BREAKDOWN */}
      <div style={S.card}>
        <div style={S.cardTitle}>Urgency Breakdown</div>
        {URGENCY_LEVELS.map((u) => {
          const count = urgencyCounts[u.value];
          const pct = allMovements.length ? Math.round((count / allMovements.length) * 100) : 0;
          return (
            <div key={u.value} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: u.color }}>{u.label}</span>
                <span style={{ fontSize: 13, color: '#6B7280' }}>
                  {count} ({pct}%)
                </span>
              </div>
              <div style={{ height: 8, background: '#F3F4F6', borderRadius: 4, overflow: 'hidden' }}>
                <div
                  style={{ height: '100%', width: `${pct}%`, background: u.color, borderRadius: 4, transition: 'width 0.5s' }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* TIP */}
      <div style={{ ...S.card, background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
        <div style={{ display: 'flex', gap: 10 }}>
          <AlertCircle size={18} color="#3B82F6" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: 13, color: '#1E40AF', lineHeight: 1.6 }}>
            <strong>Tip:</strong> Share this log with your doctor or paste your daily entries to Claude to spot
            meal-movement patterns and identify your triggers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsScreen;
