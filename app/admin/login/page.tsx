'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost/backend/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        const user = data.data.user;
        if (user.role === 'admin') {
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('user', JSON.stringify(user));
          document.cookie = `auth_token=${data.data.token}; path=/; max-age=86400; SameSite=Lax`;
          toast.success('Access granted.');
          setTimeout(() => router.push('/admin/dashboard'), 800);
        } else {
          toast.error('Access denied. Admin credentials required.');
        }
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch {
      toast.error('Cannot connect to server. Make sure XAMPP is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050505',
      display: 'flex',
      alignItems: 'stretch',
    }}>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#111118', color: '#f0ece4',
          border: '1px solid rgba(196,30,58,0.3)',
          borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '13px',
        },
      }} />

      {/* ── LEFT DECORATIVE PANEL ──────────────────────────── */}
      <div className="hide-mobile" style={{
        flex: '0 0 44%',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a0f',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
      }}>
        {/* Animated diagonal lines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            rgba(196,30,58,0.04) 0px,
            rgba(196,30,58,0.04) 1px,
            transparent 1px,
            transparent 50px
          )`,
        }} />

        {/* Red glow orb */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px', height: '300px',
          background: 'radial-gradient(ellipse, rgba(196,30,58,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', textAlign: 'center', zIndex: 2 }}>
          {/* Shield icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            style={{
              width: '80px', height: '80px',
              border: '1px solid rgba(196,30,58,0.3)',
              margin: '0 auto 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative',
            }}
          >
            <div style={{
              position: 'absolute', inset: '4px',
              border: '1px solid rgba(196,30,58,0.15)',
            }} />
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', fontWeight: 700,
              letterSpacing: '5px', textTransform: 'uppercase',
              color: '#c41e3a', marginBottom: '16px',
            }}>Restricted Access</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900, letterSpacing: '-0.03em',
              lineHeight: '1.1', color: '#f5f0e8',
            }}>
              Admin<br /><span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Portal.</span>
            </h2>
            <div style={{
              width: '40px', height: '1px',
              background: 'rgba(196,30,58,0.5)',
              margin: '24px auto',
            }} />
            <p style={{
              color: 'rgba(158,155,148,0.5)',
              fontSize: '13px', lineHeight: '1.7',
              fontFamily: 'Inter, sans-serif',
              maxWidth: '280px', margin: '0 auto',
            }}>
              Authorized personnel only. All access attempts are monitored and logged.
            </p>
          </motion.div>
        </div>

        {/* Bottom pattern label */}
        <div style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9px', letterSpacing: '4px',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.08)',
          whiteSpace: 'nowrap',
        }}>
          Elite Barber Administration System
        </div>
      </div>

      {/* ── RIGHT PANEL — Login Form ─────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 70px)',
        background: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: '32px', right: '32px',
          width: '30px', height: '30px',
          borderTop: '1px solid rgba(196,30,58,0.3)',
          borderRight: '1px solid rgba(196,30,58,0.3)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '32px', left: '32px',
          width: '30px', height: '30px',
          borderBottom: '1px solid rgba(196,30,58,0.3)',
          borderLeft: '1px solid rgba(196,30,58,0.3)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Mobile header */}
          <div className="show-mobile" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '56px', height: '56px',
              border: '1px solid rgba(196,30,58,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
          </div>

          {/* Form header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '28px', height: '1px', background: '#c41e3a' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a',
              }}>Authenticate</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 900, letterSpacing: '-0.03em',
              color: '#f5f0e8', lineHeight: '1.1', marginBottom: '12px',
            }}>
              Secure<br /><span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Sign In.</span>
            </h1>
            <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px' }}>
              Enter your administrator credentials to continue.
            </p>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
          >
            <div>
              <label className="form-label">Administrator Email</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@elitebarber.com"
              />
            </div>
            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  className="form-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  style={{ paddingRight: '52px' }}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '16px', top: '50%',
                    transform: 'translateY(-50%)', background: 'none', border: 'none',
                    color: 'rgba(158,155,148,0.5)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c41e3a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{
                width: '100%', padding: '16px',
                marginTop: '8px', fontSize: '11px', letterSpacing: '3px',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                  <span style={{
                    width: '14px', height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'rotateSlow 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                  Authenticating...
                </span>
              ) : 'Access Dashboard →'}
            </button>
          </motion.form>

          {/* Demo credentials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: '36px' }}
          >
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
            <div style={{
              padding: '16px 20px',
              border: '1px solid rgba(196,30,58,0.12)',
              borderLeft: '2px solid rgba(196,30,58,0.5)',
              background: 'rgba(196,30,58,0.03)',
            }}>
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '3px', textTransform: 'uppercase',
                color: 'rgba(196,30,58,0.7)', marginBottom: '10px',
              }}>Demo Admin Access</div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: 'rgba(158,155,148,0.6)', lineHeight: '1.6' }}>
                admin@barbersalon.com<br />
                <span style={{ color: 'rgba(158,155,148,0.4)' }}>Password: Admin@1234</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .form-input { box-sizing: border-box; }
      `}</style>
    </div>
  );
}