'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, User, Star, Mail, Phone } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Barber {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string;
  rating: string;
  total_bookings: number;
  is_active: number;
}

export default function AdminBarbers() {
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    specialties: '',
    rating: '4.9',
    commission_rate: '50'
  });

  useEffect(() => {
    fetchBarbers();
  }, []);

  const fetchBarbers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/backend/api/admin/barbers', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();
      if (data.status === 'success') {
        setBarbers(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load barbers');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingBarber 
        ? `http://localhost/backend/api/admin/barbers/${editingBarber.id}`
        : 'http://localhost/backend/api/admin/barbers';
      const method = editingBarber ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success(editingBarber ? 'Barber updated' : 'Barber created');
        setShowModal(false);
        setEditingBarber(null);
        setFormData({ name: '', email: '', phone: '', bio: '', specialties: '', rating: '4.9', commission_rate: '50' });
        fetchBarbers();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this barber?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost/backend/api/admin/barbers/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Barber deleted');
        fetchBarbers();
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (barber: Barber) => {
    setEditingBarber(barber);
    setFormData({
      name: barber.name,
      email: barber.email,
      phone: barber.phone,
      bio: barber.bio || '',
      specialties: barber.specialties || '',
      rating: barber.rating || '4.9',
      commission_rate: '50'
    });
    setShowModal(true);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ width: '36px', height: '36px', border: '1px solid rgba(196,30,58,0.2)', borderTopColor: '#c41e3a', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" toastOptions={{ style: { background: '#111118', color: '#f0ece4', border: '1px solid rgba(196,30,58,0.3)', borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '13px' } }} />
      
      {/* Header */}
      <div style={{ marginBottom: '36px', paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '24px', height: '1px', background: '#c41e3a' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>Team</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e8' }}>
            Barbers <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Management.</span>
          </h1>
        </div>
        <button 
          onClick={() => { setEditingBarber(null); setFormData({ name: '', email: '', phone: '', bio: '', specialties: '', rating: '4.9', commission_rate: '50' }); setShowModal(true); }} 
          className="btn-primary" 
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '10px', letterSpacing: '2px' }}
        >
          <Plus size={14} /> Add Master Barber
        </button>
      </div>

      {/* Barbers Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {barbers.map((barber, index) => (
          <motion.div
            key={barber.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              background: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '28px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              {/* Header Info */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '44px', height: '44px', background: '#c41e3a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 900, color: 'white' }}>
                    {barber.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#f5f0e8', margin: 0 }}>{barber.name}</h3>
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c41e3a', marginTop: '2px', display: 'block' }}>
                      MASTER ARTIST
                    </span>
                  </div>
                </div>
                
                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(barber)} style={{ background: 'transparent', border: 'none', color: 'rgba(158,155,148,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}>
                    <Edit2 size={13} />
                  </button>
                  <button onClick={() => handleDelete(barber.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(158,155,148,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c41e3a'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}>
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {/* Bio & Specialties */}
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(158,155,148,0.55)', lineHeight: 1.65, marginBottom: '16px' }}>
                {barber.bio || 'Expert master barber specializing in modern textures and absolute precision styling.'}
              </p>
              
              {/* Specialties Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {barber.specialties?.split(',').map((skill, i) => (
                  <span key={i} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid rgba(196,30,58,0.2)', color: 'rgba(196,30,58,0.7)' }}>
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Star size={11} color="#c9a84c" fill="#c9a84c" />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '11px', fontWeight: 700, color: '#c9a84c' }}>{barber.rating || '4.9'}</span>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(158,155,148,0.4)' }}>• {barber.total_bookings || 0} sessions</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', color: 'rgba(158,155,148,0.45)' }}>{barber.phone}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setShowModal(false)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.06)', padding: '36px', width: '100%', maxWidth: '440px', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #c41e3a, transparent)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '6px' }}>Master Roster</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 800, color: '#f5f0e8' }}>{editingBarber ? 'Edit Barber Profile' : 'Register Barber'}</h2>
                </div>
                <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(158,155,148,0.5)' }}>
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Marcus Aurelius" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="Email address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="Phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="form-label">Specialties (comma separated)</label>
                  <input type="text" className="form-input" placeholder="e.g. Skin Fade, Beard Trim" value={formData.specialties} onChange={(e) => setFormData({ ...formData, specialties: e.target.value })} />
                </div>

                <div>
                  <label className="form-label">Bio Details</label>
                  <textarea className="form-input" placeholder="Brief expert statement..." value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} style={{ minHeight: '60px', resize: 'vertical' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Rating</label>
                    <select className="form-input" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} required>
                      <option value="4.7">4.7 ★</option>
                      <option value="4.8">4.8 ★</option>
                      <option value="4.9">4.9 ★</option>
                      <option value="5.0">5.0 ★</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Commission (%)</label>
                    <input type="number" className="form-input" placeholder="50" value={formData.commission_rate} onChange={(e) => setFormData({ ...formData, commission_rate: e.target.value })} required />
                  </div>
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '10px', letterSpacing: '2px', marginTop: '8px' }}>
                  {editingBarber ? 'Save Barber Details' : 'Register Barber'} →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}