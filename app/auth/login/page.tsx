'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost/backend/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        document.cookie = `auth_token=${data.data.token}; path=/; max-age=86400; SameSite=Lax`;
        toast.success('Welcome back.');
        setTimeout(() => {
          if (data.data.user.role === 'admin') {
            router.push('/admin/dashboard');
          } else {
            router.push('/dashboard');
          }
        }, 900);
      } else {
        toast.error(data.message || 'Invalid credentials');
      }
    } catch {
      toast.error('Cannot connect to server. Make sure XAMPP is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111118',
            color: '#f0ece4',
            border: '1px solid rgba(196,30,58,0.3)',
            borderRadius: '2px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '13px',
            letterSpacing: '0.5px',
          },
        }}
      />

      {/* ── LEFT PANEL — Editorial Visual ─────────────────────── */}
      <div
        className="hide-mobile"
        style={{
          flex: '0 0 52%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&h=1200&fit=crop&crop=face)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }} />

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(5,5,5,0.85) 0%, rgba(196,30,58,0.18) 60%, rgba(5,5,5,0.7) 100%)',
        }} />

        {/* Editorial grid lines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px)
          `,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(40px, 5vw, 60px)',
        }}>
          {/* Top — Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                border: '1px solid rgba(196,30,58,0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ fontSize: '18px' }}>✂</span>
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '20px',
                fontWeight: 700,
                letterSpacing: '1px',
                color: '#f5f0e8',
              }}>
                ELITE <span style={{ color: '#c41e3a' }}>BARBER</span>
              </span>
            </div>
          </motion.div>

          {/* Middle — Large editorial headline */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              width: '40px',
              height: '1px',
              background: '#c41e3a',
              marginBottom: '24px',
            }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 900,
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              color: '#f5f0e8',
              marginBottom: '28px',
            }}>
              Where Style<br />
              <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Meets</span><br />
              Precision.
            </h2>
            <p style={{
              color: 'rgba(245,240,232,0.55)',
              fontSize: '14px',
              lineHeight: '1.7',
              maxWidth: '380px',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '0.3px',
            }}>
              Step into a world of classic craftsmanship and modern elegance. Every appointment, a masterpiece.
            </p>
          </motion.div>

          {/* Bottom — Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', gap: '40px' }}
          >
            {[
              { num: '15+', label: 'Master Barbers' },
              { num: '12K+', label: 'Happy Clients' },
              { num: '25Y', label: 'Of Excellence' },
            ].map((s, i) => (
              <div key={i}>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '28px',
                  fontWeight: 800,
                  color: '#c41e3a',
                  lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.4)',
                  marginTop: '4px',
                }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Issue number watermark */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          fontFamily: "'Playfair Display', serif",
          fontSize: '11px',
          letterSpacing: '4px',
          color: 'rgba(255,255,255,0.08)',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
        }}>
          Issue No. 001 — The Craft Issue
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ────────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(40px, 6vw, 80px) clamp(24px, 5vw, 70px)',
        background: '#0a0a0f',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient glow */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(196,30,58,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>

          {/* Mobile logo */}
          <div className="show-mobile" style={{ marginBottom: '36px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
              <div style={{
                width: '32px', height: '32px',
                border: '1px solid rgba(196,30,58,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '16px' }}>✂</span>
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700 }}>
                ELITE <span style={{ color: '#c41e3a' }}>BARBER</span>
              </span>
            </div>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}>
              <div style={{ width: '28px', height: '1px', background: '#c41e3a' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '4px',
                textTransform: 'uppercase',
                color: '#c41e3a',
              }}>
                Member Access
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#f5f0e8',
              lineHeight: '1.1',
              marginBottom: '12px',
            }}>
              Welcome<br /><span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Back.</span>
            </h1>
            <p style={{
              color: 'rgba(158,155,148,0.7)',
              fontSize: '13px',
              letterSpacing: '0.3px',
            }}>
              Sign in to manage your appointments & profile.
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
            {/* Email */}
            <div>
              <label className="form-label">Email Address</label>
              <input
                className="form-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            {/* Password */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
              </div>
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
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: 'rgba(158,155,148,0.5)',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#c41e3a'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '16px',
                marginTop: '8px',
                fontSize: '11px',
                letterSpacing: '3px',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '14px', height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'rotateSlow 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                  Signing In...
                </span>
              ) : (
                'Sign In →'
              )}
            </button>
          </motion.form>

          {/* Footer links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ marginTop: '40px' }}
          >
            <div style={{
              width: '100%',
              height: '1px',
              background: 'rgba(255,255,255,0.05)',
              marginBottom: '28px',
            }} />
            <p style={{
              textAlign: 'center',
              color: 'rgba(158,155,148,0.6)',
              fontSize: '13px',
            }}>
              New to Elite Barber?{' '}
              <Link href="/auth/register" style={{
                color: '#c41e3a',
                textDecoration: 'none',
                fontWeight: 600,
                letterSpacing: '0.3px',
                transition: 'color 0.2s',
              }}>
                Create Account
              </Link>
            </p>

            {/* Demo credentials */}
            <div style={{
              marginTop: '28px',
              padding: '18px 20px',
              border: '1px solid rgba(196,30,58,0.15)',
              borderLeft: '2px solid #c41e3a',
              background: 'rgba(196,30,58,0.04)',
            }}>
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px',
                fontWeight: 700,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: '#c41e3a',
                marginBottom: '10px',
              }}>
                Demo Access
              </div>
              <div style={{
                display: 'grid',
                gap: '6px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '12px',
                color: 'rgba(158,155,148,0.7)',
              }}>
                <div><span style={{ color: 'rgba(245,240,232,0.4)', marginRight: '8px' }}>Customer:</span>peter@test.com / customer123</div>
                <div><span style={{ color: 'rgba(245,240,232,0.4)', marginRight: '8px' }}>Admin:</span>admin@barbersalon.com / Admin@1234</div>
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