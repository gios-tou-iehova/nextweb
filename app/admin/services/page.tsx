'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Save, X, Scissors, Clock, DollarSign } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  category: string;
  is_active: number;
}

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '',
    category: ''
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/backend/api/admin/services', {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();
      if (data.status === 'success') {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingService 
        ? `http://localhost/backend/api/admin/services/${editingService.id}`
        : 'http://localhost/backend/api/admin/services';
      const method = editingService ? 'PUT' : 'POST';

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
        toast.success(editingService ? 'Service updated' : 'Service created');
        setShowModal(false);
        setEditingService(null);
        setFormData({ name: '', description: '', price: '', duration_minutes: '', category: '' });
        fetchServices();
      } else {
        toast.error(data.message || 'Operation failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost/backend/api/admin/services/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Service deleted');
        fetchServices();
      } else {
        toast.error(data.message || 'Delete failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description || '',
      price: service.price,
      duration_minutes: service.duration_minutes.toString(),
      category: service.category || ''
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
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>Menu</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e8' }}>
            Services <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Catalogue.</span>
          </h1>
        </div>
        <button
          onClick={() => { setEditingService(null); setFormData({ name: '', description: '', price: '', duration_minutes: '', category: '' }); setShowModal(true); }}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '10px', letterSpacing: '2px' }}
        >
          <Plus size={14} /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            style={{
              background: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '200px'
            }}
          >
            {/* Top Row: Category & Actions */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#c9a84c', background: 'rgba(201,168,76,0.06)', padding: '3px 8px', border: '1px solid rgba(201,168,76,0.15)' }}>
                  {service.category || 'Grooming'}
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(service)} style={{ background: 'transparent', border: 'none', color: 'rgba(158,155,148,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c9a84c'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}>
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(service.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(158,155,148,0.5)', cursor: 'pointer', transition: 'color 0.2s', padding: 0 }}
                    onMouseEnter={e => e.currentTarget.style.color = '#c41e3a'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#f5f0e8', marginBottom: '8px' }}>{service.name}</h3>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(158,155,148,0.55)', lineHeight: 1.6, marginBottom: '20px' }}>
                {service.description || 'No description provided.'}
              </p>
            </div>

            {/* Bottom Row: Duration & Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(158,155,148,0.5)' }}>
                <Clock size={12} />
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px' }}>{service.duration_minutes} min</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 900, color: '#c41e3a' }}>
                ₦{parseInt(service.price).toLocaleString()}
              </span>
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
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '6px' }}>Catalog</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 800, color: '#f5f0e8' }}>{editingService ? 'Edit Service' : 'Add Service'}</h2>
                </div>
                <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.07)', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(158,155,148,0.5)' }}>
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label className="form-label">Service Name</label>
                  <input type="text" className="form-input" placeholder="e.g. Executive Beard Sculpting" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                
                <div>
                  <label className="form-label">Description</label>
                  <input type="text" className="form-input" placeholder="Description of service perks" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="form-label">Category</label>
                    <select className="form-input" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} required>
                      <option value="">Select</option>
                      <option value="Haircut">Haircut</option>
                      <option value="Beard">Beard</option>
                      <option value="Shave">Shave</option>
                      <option value="Combo">Combo</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Duration (min)</label>
                    <input type="number" className="form-input" placeholder="e.g. 45" value={formData.duration_minutes} onChange={(e) => setFormData({ ...formData, duration_minutes: e.target.value })} required />
                  </div>
                </div>

                <div>
                  <label className="form-label">Price (₦)</label>
                  <input type="number" className="form-input" placeholder="e.g. 15000" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
                </div>

                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '10px', letterSpacing: '2px', marginTop: '8px' }}>
                  {editingService ? 'Update Service' : 'Create Service'} →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}