'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, X, Edit2, User, Mail, Phone, MapPin, Star, Loader2, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  loyalty_points: number;
  avatar?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        toast.error('Please login again');
        return;
      }
      
      const userData = JSON.parse(storedUser);
      
      // Try to fetch profile from server
      try {
        const response = await fetch('http://localhost/backend/api/profile/get', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        if (data.status === 'success' && data.data) {
          setUser(data.data);
          setEditForm({
            name: data.data.name || '',
            email: data.data.email || '',
            phone: data.data.phone || '',
            bio: data.data.bio || '',
            location: data.data.location || ''
          });
          setLoading(false);
          return;
        }
      } catch (err) {
        // Fallback to localStorage
      }
      
      // Fallback to localStorage
      setUser({
        ...userData,
        bio: localStorage.getItem(`bio_${userData.id}`) || '',
        location: localStorage.getItem(`location_${userData.id}`) || '',
        created_at: new Date().toISOString()
      });
      setEditForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        bio: localStorage.getItem(`bio_${userData.id}`) || '',
        location: localStorage.getItem(`location_${userData.id}`) || ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image must be less than 2MB');
      return;
    }

    setUploading(true);
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/backend/api/profile/upload-avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Profile picture updated!');
        if (user) {
          setUser({ ...user, avatar_url: data.data.avatar_url });
        }
      } else {
        toast.error(data.message || 'Upload failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost/backend/api/profile/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editForm)
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Profile updated successfully!');
        if (user) {
          setUser({ ...user, ...editForm });
          const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
          storedUser.name = editForm.name;
          storedUser.email = editForm.email;
          storedUser.phone = editForm.phone;
          localStorage.setItem('user', JSON.stringify(storedUser));
        }
        setIsEditing(false);
      } else {
        toast.error(data.message || 'Update failed');
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '40px', animation: 'spin 1s linear infinite' }}>✂️</div>
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '100px', paddingBottom: '60px' }}>
      <Toaster position="top-right" />
      
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>
            My <span style={{ color: '#ff3b30' }}>Profile</span>
          </h1>
          <p style={{ color: '#a1a1aa' }}>Manage your personal information</p>
        </div>

        <div style={{
          background: '#14141e',
          borderRadius: '24px',
          padding: 'clamp(20px, 5vw, 40px)',
          border: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* Avatar Section */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: '#1a1a2e',
                border: '3px solid #ff3b30',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {user?.avatar_url ? (
                  <img src={user.avatar_url} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ fontSize: '48px', fontWeight: 700, color: '#ff3b30' }}>
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                style={{
                  position: 'absolute',
                  bottom: '5px',
                  right: '5px',
                  background: '#ff3b30',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {uploading ? <Loader2 size={16} color="white" style={{ animation: 'spin 1s linear infinite' }} /> : <Camera size={16} color="white" />}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </div>
            <p style={{ fontSize: '12px', color: '#a1a1aa', marginTop: '12px' }}>Click camera to upload profile picture</p>
          </div>

          {/* Profile Info */}
          {!isEditing ? (
            <div>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <User size={18} color="#ff3b30" />
                  <span style={{ fontWeight: 600 }}>Full Name</span>
                </div>
                <p style={{ color: '#a1a1aa', marginLeft: '30px' }}>{user?.name}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Mail size={18} color="#ff3b30" />
                  <span style={{ fontWeight: 600 }}>Email Address</span>
                </div>
                <p style={{ color: '#a1a1aa', marginLeft: '30px' }}>{user?.email}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Phone size={18} color="#ff3b30" />
                  <span style={{ fontWeight: 600 }}>Phone Number</span>
                </div>
                <p style={{ color: '#a1a1aa', marginLeft: '30px' }}>{user?.phone || 'Not provided'}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <MapPin size={18} color="#ff3b30" />
                  <span style={{ fontWeight: 600 }}>Location</span>
                </div>
                <p style={{ color: '#a1a1aa', marginLeft: '30px' }}>{user?.location || 'Not set'}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <Star size={18} color="#f59e0b" />
                  <span style={{ fontWeight: 600 }}>Loyalty Points</span>
                </div>
                <p style={{ color: '#f59e0b', marginLeft: '30px', fontSize: '20px', fontWeight: 700 }}>{user?.loyalty_points || 0} points</p>
              </div>

              <div style={{ marginTop: '30px', textAlign: 'center' }}>
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn-primary"
                  style={{ padding: '12px 32px' }}
                >
                  <Edit2 size={16} style={{ marginRight: '8px' }} /> Edit Profile
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#a1a1aa' }}>Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  style={{ width: '100%', padding: '12px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#a1a1aa' }}>Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  style={{ width: '100%', padding: '12px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#a1a1aa' }}>Phone</label>
                <input
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  style={{ width: '100%', padding: '12px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#a1a1aa' }}>Bio</label>
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '12px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', color: '#a1a1aa' }}>Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  style={{ width: '100%', padding: '12px', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                  style={{ padding: '12px 24px' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="btn-primary"
                  style={{ padding: '12px 24px' }}
                >
                  <Save size={16} style={{ marginRight: '8px' }} /> Save Changes
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}