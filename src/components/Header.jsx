import React from 'react';
import { S } from '../constants/theme';

const Header = () => (
  <div className="mobile-header" style={S.header}>
    <div style={S.headerTitle}>🌿 Gut Tracker</div>
    <div style={S.headerSub}>Low-FODMAP Elimination Phase</div>
  </div>
);

export default Header;
