'use client';

import { useEffect, useState } from 'react';
import { Bell, CheckCircle, XCircle, Info, Mail, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: number;
  created_at: string;
}

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      
      const response = await fetch('http://localhost/backend/api/notifications/get', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        setNotifications(data.data);
        const unread = data.data.filter((n: Notification) => n.is_read === 0).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`http://localhost/backend/api/notifications/mark-read/${id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle size={14} color="#c9a84c" />;
      case 'error': return <XCircle size={14} color="#c41e3a" />;
      case 'admin': return <Mail size={14} color="#c41e3a" />;
      default: return <Info size={14} color="#c9a84c" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'success': return 'rgba(201,168,76,0.04)';
      case 'error': return 'rgba(196,30,58,0.04)';
      case 'admin': return 'rgba(196,30,58,0.04)';
      default: return 'rgba(201,168,76,0.04)';
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 0.2s',
          color: isOpen ? '#c41e3a' : 'rgba(158,155,148,0.6)',
        }}
        onMouseEnter={e => { if (!isOpen) e.currentTarget.style.color = '#f5f0e8'; }}
        onMouseLeave={e => { if (!isOpen) e.currentTarget.style.color = 'rgba(158,155,148,0.6)'; }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            background: '#c41e3a',
            color: 'white',
            fontSize: '8px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            borderRadius: '50%',
            width: '14px',
            height: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              width: '320px',
              maxWidth: '90vw',
              background: '#0a0a0f',
              border: '1px solid rgba(255,255,255,0.06)',
              zIndex: 1000,
              marginTop: '12px',
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #c41e3a, transparent)' }} />
            
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div>
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c41e3a', display: 'block', marginBottom: '2px' }}>
                  Inbox
                </span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 800, color: '#f5f0e8', margin: 0 }}>
                  Notifications
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(158,155,148,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <X size={14} />
              </button>
            </div>

            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {loading ? (
                <div style={{ padding: '30px', textAlign: 'center' }}>
                  <div style={{ width: '20px', height: '20px', margin: '0 auto', border: '1px solid rgba(196,30,58,0.2)', borderTopColor: '#c41e3a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
              ) : notifications.length === 0 ? (
                <div style={{ padding: '36px 20px', textAlign: 'center', color: 'rgba(158,155,148,0.45)' }}>
                  <Bell size={24} style={{ marginBottom: '10px', opacity: 0.3, marginLeft: 'auto', marginRight: 'auto' }} />
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', margin: 0 }}>No fresh notifications</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => markAsRead(notif.id)}
                    style={{
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      background: notif.is_read ? 'transparent' : getBgColor(notif.type),
                      cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <div style={{ marginTop: '2px' }}>{getIcon(notif.type)}</div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '13px', color: '#f5f0e8', margin: '0 0 4px 0' }}>{notif.title}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', color: 'rgba(158,155,148,0.5)', margin: '0 0 6px 0', lineHeight: 1.5 }}>{notif.message}</p>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', color: 'rgba(158,155,148,0.3)', letterSpacing: '0.5px' }}>
                          {new Date(notif.created_at).toLocaleDateString()} at {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      {!notif.is_read && (
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#c41e3a', marginTop: '4px' }} />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}