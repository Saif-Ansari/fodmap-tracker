import React from 'react';

const MovementDots = ({ count, size = 14 }) => {
  const max = 8;
  const color = count <= 2 ? '#10B981' : count <= 4 ? '#F59E0B' : '#EF4444';
  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {Array.from({ length: Math.min(count, max) }).map((_, i) => (
        <div key={i} style={{ width: size, height: size, borderRadius: '50%', background: color }} />
      ))}
      {count > max && <span style={{ fontSize: 11, color: '#6B7280' }}>+{count - max}</span>}
    </div>
  );
};

export default MovementDots;
