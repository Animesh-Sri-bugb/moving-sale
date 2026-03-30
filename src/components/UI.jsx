import React from 'react';

export const CATEGORIES = ['All', 'Electronics', 'Furniture', 'Kitchen', 'Books', 'Clothing', 'Sports', 'Decor', 'Other'];
export const CONDITIONS = ['Like New', 'Good', 'Fair', 'Well Loved'];

export function Btn({ children, variant = 'primary', small, style, ...p }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 600,
    borderRadius: 8, transition: 'all 0.2s', fontSize: small ? '0.85rem' : '0.95rem',
    padding: small ? '8px 16px' : '12px 24px', letterSpacing: '0.01em',
  };
  const variants = {
    primary: { background: 'var(--accent)', color: '#fff' },
    ghost: { background: 'transparent', color: 'var(--ink)', border: '1.5px solid var(--border)' },
    danger: { background: '#FEF2F2', color: '#B91C1C', border: '1.5px solid #FECACA' },
    success: { background: 'var(--success)', color: '#fff' },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} {...p}>{children}</button>;
}

export function Input({ label, textarea, style, ...p }) {
  const s = {
    width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8,
    background: '#fff', outline: 'none', fontSize: '0.95rem', transition: 'border 0.2s',
  };
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <label style={{ display: 'block', marginBottom: 16, ...style }}>
      {label && <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--sub)' }}>{label}</span>}
      <Tag style={{ ...s, ...(textarea ? { minHeight: 100, resize: 'vertical' } : {}) }}
        onFocus={e => e.target.style.borderColor = 'var(--accent)'}
        onBlur={e => e.target.style.borderColor = 'var(--border)'}
        {...p} />
    </label>
  );
}

export const Badge = ({ children, color = 'var(--sub)', bg = 'var(--tag)' }) => (
  <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600, background: bg, color, letterSpacing: '0.02em' }}>
    {children}
  </span>
);

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="scale-in" style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 999,
      padding: '14px 24px', borderRadius: 12,
      background: toast.type === 'success' ? 'var(--success)' : 'var(--accent)',
      color: '#fff', fontWeight: 600, fontSize: '0.9rem',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', gap: 8,
    }}>
      {toast.type === 'success' ? '✓' : '✉'} {toast.msg}
    </div>
  );
}

export function Spinner() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: 'var(--sub)', fontSize: '0.9rem' }}>Loading listings…</p>
      </div>
    </div>
  );
}
