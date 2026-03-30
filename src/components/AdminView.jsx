import React, { useState, useRef } from 'react';
import { Btn, Input, Badge, CATEGORIES, CONDITIONS } from './UI';

export default function AdminView({ items, onAdd, onUpdate, onDelete, showToast, onBack }) {
  const [editing, setEditing] = useState(null); // null | 'new' | item.id
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'Other', condition: 'Good', images: [], status: 'available' });
  const [imageFiles, setImageFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const startEdit = (item) => {
    setForm({ title: item.title, description: item.description, price: String(item.price), category: item.category, condition: item.condition, images: item.images || [], status: item.status || 'available' });
    setImageFiles([]);
    setEditing(item.id);
  };
  const startNew = () => {
    setForm({ title: '', description: '', price: '', category: 'Other', condition: 'Good', images: [], status: 'available' });
    setImageFiles([]);
    setEditing('new');
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(prev => [...prev, ...files]);
  };

  const handleSave = async () => {
    if (!form.title) return;
    setSaving(true);
    try {
      const entry = { ...form, price: Number(form.price) || 0, imageFiles };
      if (editing === 'new') {
        // Fire and forget — onSnapshot will update the UI
        onAdd(entry).catch(err => console.error('Save error:', err));
      } else {
        onUpdate(editing, entry).catch(err => console.error('Update error:', err));
      }
      // Don't await — move on immediately
      showToast(editing === 'new' ? 'Item added!' : 'Item updated!');
      setEditing(null);
      setImageFiles([]);
    } catch (err) {
      console.error('Save error:', err);
      showToast('Error saving item', 'error');
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return;
    onDelete(id).catch(err => console.error('Delete error:', err));
    showToast('Item removed');
  };

  // ── Item Form ──
  if (editing !== null) {
    return (
      <div className="fade-up" style={{ maxWidth: 640, margin: '0 auto' }}>
        <button onClick={() => { setEditing(null); setImageFiles([]); }} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--sub)', fontSize: '0.9rem', fontWeight: 600, marginBottom: 24, padding: 0, cursor: 'pointer' }}>
          ← Back to listings
        </button>
        <div style={{ background: '#fff', borderRadius: 16, padding: 32, border: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: 24 }}>{editing === 'new' ? 'Add New Item' : 'Edit Item'}</h2>
          <Input label="Title *" placeholder="IKEA KALLAX Shelf" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          <Input label="Description" textarea placeholder="Describe the item — size, color, any wear…" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <Input label="Price ($)" type="number" placeholder="0" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--sub)' }}>Category</span>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, background: '#fff', fontSize: '0.95rem' }}>
                {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--sub)' }}>Condition</span>
              <select value={form.condition} onChange={e => setForm({ ...form, condition: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, background: '#fff', fontSize: '0.95rem' }}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          {editing !== 'new' && (
            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6, color: 'var(--sub)' }}>Status</span>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ width: '100%', padding: '12px 14px', border: '1.5px solid var(--border)', borderRadius: 8, background: '#fff', fontSize: '0.95rem' }}>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </label>
          )}

          {/* Images */}
          <div style={{ marginBottom: 20 }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: 8, color: 'var(--sub)' }}>Photos</span>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {/* Existing images */}
              {form.images.map((img, i) => (
                <div key={`existing-${i}`} style={{ width: 90, height: 90, borderRadius: 10, overflow: 'hidden', position: 'relative', border: '1px solid var(--border)' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                    style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
                </div>
              ))}
              {/* New file previews */}
              {imageFiles.map((file, i) => (
                <div key={`new-${i}`} style={{ width: 90, height: 90, borderRadius: 10, overflow: 'hidden', position: 'relative', border: '2px solid var(--success)' }}>
                  <img src={URL.createObjectURL(file)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => setImageFiles(f => f.filter((_, j) => j !== i))}
                    style={{ position: 'absolute', top: 4, right: 4, width: 22, height: 22, borderRadius: '50%', background: 'rgba(0,0,0,0.6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '0.7rem' }}>✕</button>
                  <span style={{ position: 'absolute', bottom: 2, left: 2, fontSize: '0.6rem', background: 'var(--success)', color: '#fff', padding: '1px 4px', borderRadius: 4 }}>NEW</span>
                </div>
              ))}
              <button onClick={() => fileRef.current?.click()}
                style={{ width: 90, height: 90, borderRadius: 10, border: '2px dashed var(--border)', background: 'var(--tag)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer', color: 'var(--sub)', fontSize: '0.75rem' }}>
                ＋ Add
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={handleImageSelect} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Btn onClick={handleSave} style={{ flex: 1 }} disabled={saving}>
              {saving ? '⏳ Saving...' : '✓ Save Item'}
            </Btn>
            <Btn variant="ghost" onClick={() => { setEditing(null); setImageFiles([]); }}>Cancel</Btn>
          </div>
        </div>
      </div>
    );
  }

  // ── Admin List ──
  return (
    <div className="fade-up">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', color: 'var(--sub)', fontSize: '0.9rem', fontWeight: 600, padding: 0, marginBottom: 8, cursor: 'pointer' }}>
            ← Back to store
          </button>
          <h2 style={{ fontSize: '1.5rem' }}>Manage Listings</h2>
          <p style={{ color: 'var(--sub)', fontSize: '0.88rem' }}>{items.length} items total</p>
        </div>
        <Btn onClick={startNew}>＋ Add Item</Btn>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fff', borderRadius: 16, border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📦</div>
          <p style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: 8 }}>No items yet</p>
          <p style={{ color: 'var(--sub)', fontSize: '0.9rem', marginBottom: 20 }}>Start adding items to your moving sale</p>
          <Btn onClick={startNew}>＋ Add First Item</Btn>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: '#fff', borderRadius: 12, padding: 16, border: '1px solid var(--border)' }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: 'var(--tag)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.images?.[0] ? <img src={item.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ opacity: 0.3, fontSize: '1.5rem' }}>🖼</span>}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h3 style={{ fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</h3>
                  <Badge
                    color={item.status === 'sold' ? '#B91C1C' : item.status === 'reserved' ? '#B45309' : 'var(--success)'}
                    bg={item.status === 'sold' ? '#FEF2F2' : item.status === 'reserved' ? '#FEF3C7' : 'var(--success-bg)'}>
                    {item.status || 'available'}
                  </Badge>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--sub)' }}>{item.category} · {item.condition} · {item.price === 0 ? 'Free' : `$${item.price}`}</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Btn small variant="ghost" onClick={() => startEdit(item)}>✏️</Btn>
                <Btn small variant="danger" onClick={() => handleDelete(item.id)}>🗑</Btn>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
