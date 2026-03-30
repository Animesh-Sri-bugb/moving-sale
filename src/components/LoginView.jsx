import React, { useState } from 'react';
import { Btn, Input } from './UI';

const ADMIN_PASS = 'bugb2026';

export default function LoginView({ onAuth, onBack }) {
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);

  const attempt = () => {
    if (pw === ADMIN_PASS) onAuth();
    else setErr(true);
  };

  return (
    <div style={{ maxWidth: 380, margin: '60px auto' }} className="fade-up">
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--sub)', fontSize: '0.9rem', fontWeight: 600, marginBottom: 24, padding: 0, cursor: 'pointer' }}>
        ← Back
      </button>
      <div style={{ background: '#fff', borderRadius: 16, padding: 36, border: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: 'var(--tag)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem' }}>🔒</div>
        <h2 style={{ fontSize: '1.3rem', marginBottom: 6 }}>Seller Access</h2>
        <p style={{ color: 'var(--sub)', fontSize: '0.88rem', marginBottom: 24 }}>Enter your admin password to manage listings</p>
        <Input placeholder="Password" type="password" value={pw}
          onChange={e => { setPw(e.target.value); setErr(false); }}
          onKeyDown={e => { if (e.key === 'Enter') attempt(); }}
          style={{ marginBottom: err ? 0 : 16 }} />
        {err && <p style={{ color: 'var(--accent)', fontSize: '0.82rem', marginBottom: 12, marginTop: -8 }}>Incorrect password. Try again.</p>}
        <Btn onClick={attempt} style={{ width: '100%' }}>Sign In</Btn>
      </div>
    </div>
  );
}
