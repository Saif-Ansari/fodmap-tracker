import React, { useState } from 'react';
import { S } from '../../constants/theme';

const AuthScreen = ({ onSignIn, onSignUp }) => {
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!email || !password) return;
    setError('');
    setMessage('');
    setLoading(true);
    const fn = mode === 'signin' ? onSignIn : onSignUp;
    const { error } = await fn(email, password);
    if (error) {
      setError(error.message);
    } else if (mode === 'signup') {
      setMessage('Check your email to confirm your account, then sign in.');
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FAFAF8',
        padding: 20,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: 400 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 10 }}>🌿</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>FODMAP Tracker</div>
          <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 4 }}>Low-FODMAP Elimination Protocol</div>
        </div>

        <div style={S.card}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: 20 }}>
            {mode === 'signin' ? 'Sign in' : 'Create account'}
          </div>

          <label style={S.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{ ...S.input, marginBottom: 14 }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          <label style={S.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ ...S.input, marginBottom: 20 }}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />

          {error && (
            <div style={{ fontSize: 13, color: '#EF4444', marginBottom: 14, lineHeight: 1.5 }}>{error}</div>
          )}
          {message && (
            <div style={{ fontSize: 13, color: '#10B981', marginBottom: 14, lineHeight: 1.5 }}>{message}</div>
          )}

          <button
            style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}
            onClick={submit}
            disabled={loading}
          >
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Create account'}
          </button>

          <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: '#6B7280' }}>
            {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setError(''); setMessage(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#0B6B5B',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'inherit',
              }}
            >
              {mode === 'signin' ? 'Sign up' : 'Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
