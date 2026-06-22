import React from 'react';
import { Home, List, BarChart2, ChevronRight } from 'lucide-react';
import { S } from '../constants/theme';

const TABS = [
  { id: 'home', label: 'Today', Icon: Home },
  { id: 'history', label: 'History', Icon: List },
  { id: 'insights', label: 'Insights', Icon: BarChart2 },
  { id: 'settings', label: 'Settings', Icon: ChevronRight },
];

const BottomNav = ({ activeTab, onTabChange }) => (
  <nav className="mobile-bottom-nav" style={S.nav}>
    {TABS.map(({ id, label, Icon }) => (
      <button
        key={id}
        style={{ ...S.navBtn, ...(activeTab === id ? S.navBtnActive : {}) }}
        onClick={() => onTabChange(id)}
      >
        <Icon size={20} />
        <span>{label}</span>
      </button>
    ))}
  </nav>
);

export default BottomNav;
