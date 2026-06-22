import React from 'react';
import { Download } from 'lucide-react';
import { S } from '../../constants/theme';
import { exportCSV } from '../../utils/exportHelpers';

const SettingsScreen = ({ data, onClear, onSignOut }) => {
  const entryCount = data.entries.filter((e) => e.meals.length > 0 || e.movements.length > 0).length;

  return (
    <div style={{ padding: '16px 16px 0' }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#111827' }}>Settings</div>

      {/* EXPORT */}
      <div style={S.card}>
        <div style={S.cardTitle}>Export Data</div>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16, lineHeight: 1.6 }}>
          Download your full log as a CSV. <strong>{entryCount} days</strong> of data logged.
        </p>
        <button style={S.btn} onClick={() => exportCSV(data)}>
          <Download size={17} /> Download CSV
        </button>
      </div>

      {/* DANGER ZONE */}
      <div style={{ ...S.card, border: '1px solid #FEE2E2' }}>
        <div style={{ ...S.cardTitle, color: '#EF4444' }}>Danger Zone</div>
        <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 12 }}>Clear all logged data. This cannot be undone. Export first.</p>
        <button onClick={onClear} style={{ ...S.btnOutline, color: '#EF4444', borderColor: '#EF4444' }}>
          Clear All Data
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
