import React, { useState } from 'react';
import { S } from './constants/theme';
import { useAuth } from './hooks/useAuth';
import { useEntries } from './hooks/useEntries';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import AuthScreen from './components/screens/AuthScreen';
import HomeScreen from './components/screens/HomeScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import InsightsScreen from './components/screens/InsightsScreen';
import SettingsScreen from './components/screens/SettingsScreen';
import LogMealModal from './components/modals/LogMealModal';
import LogMovementModal from './components/modals/LogMovementModal';

export default function App() {
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const { data, loading: dataLoading, addMeal, addMovement, deleteMeal, deleteMovement, clearAll } = useEntries(user?.id);
  const [tab, setTab] = useState('home');
  const [showMealModal, setShowMealModal] = useState(false);
  const [showMovModal, setShowMovModal] = useState(false);

  if (authLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF8', fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 13, color: '#9CA3AF' }}>Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen onSignIn={signIn} onSignUp={signUp} />;
  }

  return (
    <div className="app-layout" style={S.wrap}>
      <Sidebar activeTab={tab} onTabChange={setTab} onSignOut={signOut} />

      <div className="app-content">
        <Header />

        {dataLoading ? (
          <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF', fontSize: 13 }}>Loading your data…</div>
        ) : (
          <>
            {tab === 'home' && (
              <HomeScreen
                data={data}
                onAddMeal={() => setShowMealModal(true)}
                onAddMovement={() => setShowMovModal(true)}
                onDeleteMeal={deleteMeal}
                onDeleteMovement={deleteMovement}
              />
            )}
            {tab === 'history' && <HistoryScreen data={data} onDeleteMeal={deleteMeal} onDeleteMovement={deleteMovement} />}
            {tab === 'insights' && <InsightsScreen data={data} />}
            {tab === 'settings' && <SettingsScreen data={data} onClear={clearAll} onSignOut={signOut} />}
          </>
        )}

        <BottomNav activeTab={tab} onTabChange={setTab} />
      </div>

      {showMealModal && <LogMealModal onClose={() => setShowMealModal(false)} onSave={addMeal} />}
      {showMovModal && <LogMovementModal onClose={() => setShowMovModal(false)} onSave={addMovement} />}
    </div>
  );
}
