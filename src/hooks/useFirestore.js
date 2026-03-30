import { useState, useEffect, useCallback } from 'react';
import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  query, orderBy, onSnapshot, Timestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ── Compress image to base64 (aggressive for Firestore doc limits) ──
function compressImage(file, maxDim = 480, quality = 0.45) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const result = canvas.toDataURL('image/jpeg', quality);
        console.log(`Image compressed: ${(result.length / 1024).toFixed(0)}KB`);
        resolve(result);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Items ───────────────────────────────────────────
export function useItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }, (err) => {
      console.error('Firestore items error:', err);
      setLoading(false);
    });
    return unsub;
  }, []);

  const addItem = useCallback(async (data) => {
    const { imageFiles, ...rest } = data;
    const base64Images = [];
    if (imageFiles?.length) {
      for (const file of imageFiles) {
        const b64 = await compressImage(file);
        base64Images.push(b64);
      }
    }
    const docData = {
      ...rest,
      images: [...(rest.images || []), ...base64Images],
      status: 'available',
      createdAt: Timestamp.now(),
    };
    const totalSize = JSON.stringify(docData).length;
    console.log(`Firestore doc size: ${(totalSize / 1024).toFixed(0)}KB`);
    if (totalSize > 900000) {
      throw new Error(`Document too large (${(totalSize / 1024).toFixed(0)}KB). Try fewer or smaller images.`);
    }
    await addDoc(collection(db, 'items'), docData);
  }, []);

  const updateItem = useCallback(async (id, data) => {
    const { imageFiles, ...rest } = data;
    const newImages = [];
    if (imageFiles?.length) {
      for (const file of imageFiles) {
        const b64 = await compressImage(file);
        newImages.push(b64);
      }
    }
    const updateData = { ...rest };
    if (newImages.length) {
      updateData.images = [...(rest.images || []), ...newImages];
    }
    await updateDoc(doc(db, 'items', id), updateData);
  }, []);

  const deleteItem = useCallback(async (id) => {
    await deleteDoc(doc(db, 'items', id));
  }, []);

  return { items, loading, addItem, updateItem, deleteItem };
}

// ── Inquiries ───────────────────────────────────────
export function useInquiries() {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setInquiries(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => {
      console.error('Firestore inquiries error:', err);
    });
    return unsub;
  }, []);

  const addInquiry = useCallback(async (data) => {
    await addDoc(collection(db, 'inquiries'), {
      ...data,
      read: false,
      createdAt: Timestamp.now(),
    });
  }, []);

  const markRead = useCallback(async (id) => {
    await updateDoc(doc(db, 'inquiries', id), { read: true });
  }, []);

  const deleteInquiry = useCallback(async (id) => {
    await deleteDoc(doc(db, 'inquiries', id));
  }, []);

  return { inquiries, addInquiry, markRead, deleteInquiry };
}
