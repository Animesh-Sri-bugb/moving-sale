import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Btn, Input, Badge } from './UI';
import { EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUBLIC_KEY, SELLER_NAME } from '../config/emailjs';

// Auto-link URLs in text
function Linkify({ children }) {
  if (typeof children !== 'string') return children;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/g;
  const parts = children.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      const href = part.startsWith('http') ? part : `https://${part}`;
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline', wordBreak: 'break-all' }}>{part}</a>;
    }
    return part;
  });
}

export default function DetailView({ item, onBack, onInquiry, showToast }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);

  const handleSubmit = async () => {
    if (!form.name || !form.email) return;
    setSending(true);
    // Send email via EmailJS (fire and forget)
    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      from_name: form.name,
      from_email: form.email,
      phone: form.phone || 'N/A',
      item_title: item.title,
      item_price: item.price === 0 ? 'Free' : `$${item.price}`,
      message: form.message || 'No additional message',
    }, EMAILJS_PUBLIC_KEY).catch(err => console.error('EmailJS error:', err));

    // Save to Firestore (fire and forget — onSnapshot handles UI)
    onInquiry({
      ...form,
      itemId: item.id,
      itemTitle: item.title,
    }).catch(err => console.error('Inquiry save error:', err));

    setSending(false);
    setSent(true);
    showToast('Interest sent! We\'ll be in touch soon.');
  };

  return (
    <div className="fade-up">
      <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--sub)', fontSize: '0.9rem', fontWeight: 600, marginBottom: 24, padding: 0, cursor: 'pointer' }}>
        ← Back to listings
      </button>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
        {/* Images */}
        <div>
          <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: 14, overflow: 'hidden', background: 'var(--tag)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            {item.images?.[imgIdx] ? (
              <img src={item.images[imgIdx]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span style={{ fontSize: '4rem', opacity: 0.3 }}>🖼</span>
            )}
          </div>
          {item.images?.length > 1 && (
            <div style={{ display: 'flex', gap: 8 }}>
              {item.images.map((img, i) => (
                <div key={i} onClick={() => setImgIdx(i)}
                  style={{ width: 64, height: 64, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', border: i === imgIdx ? '2px solid var(--accent)' : '2px solid transparent', opacity: i === imgIdx ? 1 : 0.6, transition: 'all 0.2s' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info + Form */}
        <div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <Badge>{item.category}</Badge>
            <Badge>{item.condition}</Badge>
            {item.status === 'reserved' && <Badge color="#B45309" bg="#FEF3C7">Reserved</Badge>}
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 8 }}>{item.title}</h2>
          <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2rem', color: 'var(--accent)', marginBottom: 16 }}>
            {item.price === 0 ? 'Free' : `$${item.price}`}
          </p>
          <p style={{ color: 'var(--sub)', lineHeight: 1.7, marginBottom: 28, fontSize: '0.95rem' }}><Linkify>{item.description}</Linkify></p>

          {!sent ? (
            <div style={{ background: 'var(--warm)', borderRadius: 14, padding: 24, border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Interested? Let us know!</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--sub)', marginBottom: 20 }}>Fill out the form and we'll get back to you.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <Input label="Your Name *" placeholder="Jane Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                <Input label="Email *" placeholder="jane@email.com" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              </div>
              <Input label="Phone (optional)" placeholder="(612) 555-0123" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <Input label="Message" textarea placeholder="Any questions or when you'd like to pick up…" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <Btn onClick={handleSubmit} style={{ width: '100%' }} disabled={!form.name || !form.email || sending}>
                {sending ? '⏳ Sending...' : '❤️ I\'m Interested'}
              </Btn>
            </div>
          ) : (
            <div className="scale-in" style={{ background: 'var(--success-bg)', borderRadius: 14, padding: 32, textAlign: 'center', border: '1px solid #BBD6C2' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🎉</div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--success)', marginBottom: 8 }}>Interest Submitted!</h3>
              <p style={{ color: 'var(--sub)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                We've received your interest and you'll hear from us soon to coordinate pickup!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
