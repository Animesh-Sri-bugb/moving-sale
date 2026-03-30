import React, { useState } from 'react';
import { Badge, CATEGORIES } from './UI';

export default function StoreView({ items, onSelectItem }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = items.filter(i => {
    const matchCat = category === 'All' || i.category === category;
    const matchSearch = !search || i.title?.toLowerCase().includes(search.toLowerCase()) || i.description?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch && i.status !== 'sold';
  });

  return (
    <div className="fade-up">
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, var(--warm), #FFF5EB)', borderRadius: 16, padding: '40px 36px', marginBottom: 32, border: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', marginBottom: 8, lineHeight: 1.2 }}>
          We're Moving Across<br />the World ✈️
        </h2>
        <p style={{ color: 'var(--sub)', fontSize: '1.05rem', maxWidth: 500, lineHeight: 1.6, marginBottom: 20 }}>
          Quality items at great prices — everything must find a new home before we head to India. Browse, pick what you love, and let us know!
        </p>
        <div style={{ display: 'flex', gap: 12, fontSize: '0.85rem', color: 'var(--sub)', flexWrap: 'wrap' }}>
          <Badge color="var(--success)" bg="var(--success-bg)">{items.filter(i => i.status !== 'sold').length} items available</Badge>
          <Badge>📍 St. Paul, MN</Badge>
          <Badge>🚚 Pickup only</Badge>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 28, alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 260px', maxWidth: 360 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--sub)', fontSize: '1.1rem' }}>🔍</span>
          <input placeholder="Search items…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1.5px solid var(--border)', borderRadius: 10, background: '#fff', outline: 'none', fontSize: '0.95rem' }} />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              style={{ padding: '8px 16px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600, border: 'none',
                background: category === c ? 'var(--accent)' : 'var(--tag)', color: category === c ? '#fff' : 'var(--sub)', transition: 'all 0.2s', cursor: 'pointer' }}>
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--sub)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 500 }}>No items match your search</p>
          <p style={{ fontSize: '0.9rem', marginTop: 4 }}>Try a different category or search term</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {filtered.map((item, idx) => (
            <div key={item.id} className="fade-up" style={{ animationDelay: `${idx * 0.06}s`, background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onClick={() => onSelectItem(item.id)}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
              <div style={{ width: '100%', height: 220, background: 'var(--tag)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {item.images?.[0] ? (
                  <img src={item.images[0]} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '2rem', opacity: 0.3 }}>🖼</span>
                )}
                {item.status === 'reserved' && (
                  <div style={{ position: 'absolute', top: 12, left: 12 }}>
                    <Badge color="#B45309" bg="#FEF3C7">Reserved</Badge>
                  </div>
                )}
              </div>
              <div style={{ padding: '16px 18px 18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 6 }}>
                  <h3 style={{ fontSize: '1.05rem', lineHeight: 1.3, flex: 1 }}>{item.title}</h3>
                  <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: '1.15rem', color: 'var(--accent)', whiteSpace: 'nowrap', marginLeft: 8 }}>
                    {item.price === 0 ? 'Free' : `$${item.price}`}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--sub)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</p>
                <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
                  <Badge>{item.category}</Badge>
                  <Badge>{item.condition}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
