import React from 'react';
import { Btn } from './UI';

export default function Header({ adminAuth, view, setView, setAdminAuth, unreadCount }) {
  return (
    <header style={{ background: '#fff', borderBottom: '1px solid var(--border)', padding: '0 24px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }} onClick={() => { setView('store'); }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontFamily: "'DM Serif Display', serif", fontSize: '1.2rem' }}>M</span>
          </div>
          <div>
            <h1 style={{ fontSize: '1.15rem', lineHeight: 1.2 }}>Moving Sale</h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--sub)', letterSpacing: '0.04em' }}>Everything must go — MN → India</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {adminAuth && (
            <Btn small variant="ghost" onClick={() => setView(view === 'inquiries' ? 'admin' : 'inquiries')}>
              📥{' '}
              <span style={{ position: 'relative' }}>
                Inquiries
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: -8, right: -14, width: 18, height: 18, borderRadius: '50%', background: 'var(--accent)', color: '#fff', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {unreadCount}
                  </span>
                )}
              </span>
            </Btn>
          )}
          <Btn small variant="ghost" onClick={() => {
            if (adminAuth) { setView(view === 'admin' ? 'store' : 'admin'); }
            else { setView('login'); }
          }}>
            {adminAuth ? '⚙' : '🔒'}{' '}
            {adminAuth ? 'Admin' : 'Seller Login'}
          </Btn>
          {adminAuth && (
            <Btn small variant="ghost" onClick={() => { setAdminAuth(false); setView('store'); }}
              style={{ color: 'var(--accent)', borderColor: '#F0D0C8' }}>
              ✕ Logout
            </Btn>
          )}
        </div>
      </div>
    </header>
  );
}
