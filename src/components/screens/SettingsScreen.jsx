import React, { useState } from 'react';
import { Download, Trash2 } from 'lucide-react';
import { S } from '../../constants/theme';
import { exportCSV } from '../../utils/exportHelpers';

const SettingsScreen = ({ data, onClear, onSignOut }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const entryCount = data.entries.filter((e) => e.meals.length > 0 || e.movements.length > 0).length;

  const handleConfirmClear = () => {
    exportCSV(data);
    onClear();
    setShowConfirm(false);
  };

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
        <button onClick={() => setShowConfirm(true)} style={{ ...S.btnOutline, color: '#EF4444', borderColor: '#EF4444' }}>
          Clear All Data
        </button>
      </div>

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div style={{ ...S.modal, alignItems: 'center', padding: '0 20px' }} onClick={() => setShowConfirm(false)}>
          <div style={{ ...S.modalBox, borderRadius: 20, maxWidth: 360 }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Trash2 size={20} color="#EF4444" />
              <span style={{ ...S.modalTitle, marginBottom: 0 }}>Clear All Data?</span>
            </div>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
              This will permanently delete all <strong>{entryCount} days</strong> of logged data.
              Your data will be <strong>downloaded as a CSV backup</strong> before clearing.
            </p>
            <div style={{ ...S.row, gap: 10 }}>
              <button onClick={() => setShowConfirm(false)} style={{ ...S.btnOutline, flex: 1 }}>
                Cancel
              </button>
              <button onClick={handleConfirmClear} style={{ ...S.btn, flex: 1, background: '#EF4444' }}>
                Download & Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
