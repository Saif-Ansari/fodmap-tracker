import React from 'react';
import { Home, List, BarChart2, Settings, LogOut } from 'lucide-react';

const TABS = [
  { id: 'home', label: 'Today', Icon: Home },
  { id: 'history', label: 'History', Icon: List },
  { id: 'insights', label: 'Insights', Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: Settings },
];

const Sidebar = ({ activeTab, onTabChange, onSignOut }) => (
  <aside className="sidebar">
    <div style={{ marginBottom: 36 }}>
      <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px' }}>🌿 Gut Tracker</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 5, letterSpacing: '0.03em' }}>
        LOW-FODMAP · ELIMINATION
      </div>
    </div>

    <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {TABS.map(({ id, label, Icon }) => (
        <button
          key={id}
          className={`sidebar-nav-item${activeTab === id ? ' active' : ''}`}
          onClick={() => onTabChange(id)}
        >
          <Icon size={17} />
          {label}
        </button>
      ))}
    </nav>

    <div style={{ marginTop: 'auto', paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div
        style={{
          background: 'rgba(255,255,255,0.08)',
          borderRadius: 10,
          padding: '12px 14px',
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7,
        }}
      >
        <div style={{ fontWeight: 600, color: 'rgba(255,255,255,0.7)', marginBottom: 2 }}>Phase 1</div>
        <div>Strict Elimination</div>
        <div>Monash Protocol</div>
      </div>
      <button
        onClick={onSignOut}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.45)', fontSize: 13, fontFamily: 'inherit',
          padding: '8px 4px', borderRadius: 8, width: '100%',
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.45)'}
      >
        <LogOut size={15} /> Sign out
      </button>
    </div>
  </aside>
);

export default Sidebar;
