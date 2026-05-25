'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Check } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api/proxy'}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password, role: 'customer' }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setSuccessMessage('Account created. Redirecting to sign in...');
        toast.success('Welcome to Elite Barber!');
        setTimeout(() => router.push('/auth/login'), 2000);
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch {
      setErrorMessage('Cannot connect to server. Make sure XAMPP is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);

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
          },
        }}
      />

      {/* ── LEFT PANEL — Visual ─────────────────────────────── */}
      <div
        className="hide-mobile"
        style={{
          flex: '0 0 48%',
          position: 'relative',
          overflow: 'hidden',
          background: '#0d0d12',
        }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=900&h=1200&fit=crop&crop=face)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          opacity: 0.35,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.9) 100%)',
        }} />

        {/* Vertical magazine text */}
        <div style={{
          position: 'absolute',
          left: '32px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '9px',
          letterSpacing: '6px',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.4)',
          whiteSpace: 'nowrap',
        }}>
          The Grooming Authority — Est. 1999
        </div>

        <div style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(40px, 5vw, 60px)',
          paddingLeft: 'clamp(60px, 6vw, 80px)',
        }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(196,30,58,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: '18px' }}>✂</span>
                </div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '20px', fontWeight: 700,
                  color: '#f5f0e8', letterSpacing: '1px',
                }}>
                  ELITE <span style={{ color: '#c41e3a' }}>BARBER</span>
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{ width: '40px', height: '1px', background: '#c9a84c', marginBottom: '24px' }} />
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 900,
              lineHeight: '0.95',
              letterSpacing: '-0.03em',
              color: '#f5f0e8',
              marginBottom: '24px',
            }}>
              Join the<br />
              <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Elite</span><br />
              Circle.
            </h2>
            <p style={{
              color: 'rgba(245,240,232,0.45)',
              fontSize: '13px',
              lineHeight: '1.7',
              maxWidth: '340px',
              fontFamily: 'Inter, sans-serif',
            }}>
              Create your account and gain access to premium appointments, exclusive offers, and a world-class grooming experience.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
          >
            {[
              'Priority appointment booking',
              'Exclusive member discounts',
              'Personalized style history',
            ].map((benefit, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '20px', height: '20px',
                  border: '1px solid rgba(196,30,58,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Check size={10} color="#c41e3a" />
                </div>
                <span style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px',
                  color: 'rgba(245,240,232,0.5)',
                  letterSpacing: '0.3px',
                }}>{benefit}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ───────────────────────────────── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(40px, 5vw, 70px) clamp(24px, 5vw, 70px)',
        background: '#0a0a0f',
        overflowY: 'auto',
        position: 'relative',
      }}>
        {/* Ambient */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '350px', height: '350px',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>

          {/* Mobile logo */}
          <div className="show-mobile" style={{ marginBottom: '36px', textAlign: 'center' }}>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700 }}>
                ELITE <span style={{ color: '#c41e3a' }}>BARBER</span>
              </span>
            </Link>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            style={{ marginBottom: '44px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
              <div style={{ width: '28px', height: '1px', background: '#c9a84c' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px', fontWeight: 700,
                letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c',
              }}>Create Account</span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.6rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              color: '#f5f0e8',
              lineHeight: '1.1',
              marginBottom: '10px',
            }}>
              Begin Your<br /><span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Journey.</span>
            </h1>
            <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px' }}>
              Join thousands of satisfied members worldwide.
            </p>
          </motion.div>

          {/* Alerts */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '14px 18px',
                border: '1px solid rgba(196,30,58,0.3)',
                borderLeft: '3px solid #c41e3a',
                background: 'rgba(196,30,58,0.06)',
                marginBottom: '24px',
                color: '#e05060',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {errorMessage}
            </motion.div>
          )}

          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '14px 18px',
                border: '1px solid rgba(74,222,128,0.3)',
                borderLeft: '3px solid #4ade80',
                background: 'rgba(74,222,128,0.05)',
                marginBottom: '24px',
                color: '#4ade80',
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
              }}
            >
              {successMessage}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
          >
            <div>
              <label className="form-label">Full Name</label>
              <input className="form-input" type="text" value={name}
                onChange={(e) => setName(e.target.value)} required placeholder="John Doe" />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required placeholder="your@email.com" />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input className="form-input" type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)} required placeholder="+234 800 000 0000" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label className="form-label" style={{ marginBottom: 0 }}>Password</label>
                {password.length > 0 && (
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    color: passwordStrength ? '#4ade80' : '#c41e3a',
                  }}>
                    {passwordStrength ? '✓ Strong' : '⚠ Weak'}
                  </span>
                )}
              </div>
              <div style={{ position: 'relative' }}>
                <input className="form-input" type={showPassword ? 'text' : 'password'}
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  required placeholder="Min. 8 chars, uppercase & number"
                  style={{ paddingRight: '52px' }} />
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
              {/* Password strength bar */}
              {password.length > 0 && (
                <div style={{
                  marginTop: '8px',
                  height: '2px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '1px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: passwordStrength ? '100%' : `${Math.min(password.length * 8, 60)}%`,
                    background: passwordStrength ? '#4ade80' : '#c41e3a',
                    transition: 'width 0.3s, background 0.3s',
                  }} />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
              style={{
                width: '100%', padding: '16px',
                marginTop: '8px', fontSize: '11px', letterSpacing: '3px',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                background: isLoading ? undefined : '#c41e3a',
              }}
            >
              {isLoading ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{
                    width: '14px', height: '14px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white', borderRadius: '50%',
                    animation: 'rotateSlow 0.8s linear infinite',
                    display: 'inline-block',
                  }} />
                  Creating Account...
                </span>
              ) : 'Create Account →'}
            </button>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            style={{ marginTop: '36px', textAlign: 'center' }}
          >
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginBottom: '24px' }} />
            <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px' }}>
              Already have an account?{' '}
              <Link href="/auth/login" style={{ color: '#c41e3a', textDecoration: 'none', fontWeight: 600 }}>
                Sign In
              </Link>
            </p>
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