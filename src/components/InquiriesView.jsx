import React from 'react';
import { Btn, Badge } from './UI';
import { SELLER_EMAILS } from '../config/emailjs';

export default function InquiriesView({ inquiries, items, onMarkRead, onDeleteInquiry, onUpdateItem, showToast, onBack }) {

  const markReserved = (itemId) => {
    onUpdateItem(itemId, { status: 'reserved' }).catch(err => console.error(err));
    showToast('Item marked as reserved!');
  };

  return (
    <div className="fade-up">
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--sub)', fontSize: '0.9rem', fontWeight: 600, marginBottom: 24, padding: 0, cursor: 'pointer' }}>
        ← Back to admin
      </button>
      <h2 style={{ fontSize: '1.5rem', marginBottom: 8 }}>Inquiries</h2>
      <p style={{ color: 'var(--sub)', fontSize: '0.88rem', marginBottom: 24 }}>
        {inquiries.length} total · {inquiries.filter(q => !q.read).length} unread
      </p>

      {inquiries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No inquiries yet</p>
          <p style={{ color: 'var(--sub)', fontSize: '0.9rem', marginTop: 4 }}>When someone expresses interest, it'll show up here</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inquiries.map(q => {
            const dateStr = q.createdAt?.toDate ? q.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
            return (
              <div key={q.id} style={{ background: q.read ? '#fff' : 'var(--warm)', borderRadius: 14, padding: 20, border: `1px solid ${q.read ? 'var(--border)' : '#F0D9C0'}`, position: 'relative' }}>
                {!q.read && <div style={{ position: 'absolute', top: 20, right: 20, width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: 4 }}>{q.name}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--sub)' }}>{q.email} {q.phone ? `· ${q.phone}` : ''}</p>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--sub)' }}>{dateStr}</span>
                </div>
                <Badge>🏷 {q.itemTitle}</Badge>
                {q.message && <p style={{ marginTop: 10, fontSize: '0.9rem', color: 'var(--sub)', lineHeight: 1.6, fontStyle: 'italic' }}>"{q.message}"</p>}
                <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
                  <Btn small variant="success" onClick={() => {
                    const subject = encodeURIComponent(`Re: Interest in ${q.itemTitle}`);
                    const body = encodeURIComponent(`Hi ${q.name},\n\nThanks for your interest in "${q.itemTitle}"!\n\n`);
                    window.open(`mailto:${q.email}?subject=${subject}&body=${body}`, '_blank');
                  }}>✉ Reply</Btn>
                  {!q.read && <Btn small variant="ghost" onClick={() => onMarkRead(q.id)}>✓ Mark Read</Btn>}
                  <Btn small variant="ghost" onClick={() => markReserved(q.itemId)}>Reserve Item</Btn>
                  <Btn small variant="danger" onClick={() => onDeleteInquiry(q.id)}>🗑</Btn>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
