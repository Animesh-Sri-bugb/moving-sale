import React, { useState, useCallback } from 'react';
import { useItems, useInquiries } from './hooks/useFirestore';
import Header from './components/Header';
import StoreView from './components/StoreView';
import DetailView from './components/DetailView';
import LoginView from './components/LoginView';
import AdminView from './components/AdminView';
import InquiriesView from './components/InquiriesView';
import { Toast, Spinner } from './components/UI';

export default function App() {
  const { items, loading, addItem, updateItem, deleteItem } = useItems();
  const { inquiries, addInquiry, markRead, deleteInquiry } = useInquiries();
  const [view, setView] = useState('store');
  const [selectedId, setSelectedId] = useState(null);
  const [adminAuth, setAdminAuth] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  }, []);

  const selectedItem = items.find(i => i.id === selectedId);
  const unreadCount = inquiries.filter(q => !q.read).length;

  if (loading) return <Spinner />;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header
        adminAuth={adminAuth}
        view={view}
        setView={setView}
        setAdminAuth={setAdminAuth}
        unreadCount={unreadCount}
      />
      <Toast toast={toast} />

      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px 80px' }}>
        {view === 'store' && (
          <StoreView items={items} onSelectItem={(id) => { setSelectedId(id); setView('detail'); }} />
        )}

        {view === 'detail' && selectedItem && (
          <DetailView
            item={selectedItem}
            onBack={() => setView('store')}
            onInquiry={addInquiry}
            showToast={showToast}
          />
        )}

        {view === 'login' && (
          <LoginView onAuth={() => { setAdminAuth(true); setView('admin'); }} onBack={() => setView('store')} />
        )}

        {view === 'admin' && adminAuth && (
          <AdminView
            items={items}
            onAdd={addItem}
            onUpdate={updateItem}
            onDelete={deleteItem}
            showToast={showToast}
            onBack={() => setView('store')}
          />
        )}

        {view === 'inquiries' && adminAuth && (
          <InquiriesView
            inquiries={inquiries}
            items={items}
            onMarkRead={markRead}
            onDeleteInquiry={deleteInquiry}
            onUpdateItem={updateItem}
            showToast={showToast}
            onBack={() => setView('admin')}
          />
        )}
      </main>
    </div>
  );
}
