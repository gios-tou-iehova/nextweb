'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    }, 1200);
  };

  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 120px) 0',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle lines background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 80px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '760px',
            margin: '0 auto',
            textAlign: 'center',
          }}
        >
          {/* Icon */}
          <div style={{
            width: '60px',
            height: '60px',
            border: '1px solid rgba(196,30,58,0.25)',
            background: 'rgba(196,30,58,0.06)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}>
            <Mail size={24} color="#c41e3a" />
          </div>

          {/* Header */}
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            color: '#f5f0e8',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Join The <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Roster.</span>
          </h2>

          <p style={{
            color: 'rgba(158,155,148,0.55)',
            fontSize: '14px',
            lineHeight: 1.75,
            marginBottom: '40px',
            maxWidth: '540px',
            margin: '0 auto 40px',
            fontFamily: 'Inter, sans-serif',
          }}>
            Subscribe to our private roster for exclusive seasonal offerings, master grooming guides, and premium fashion updates.
          </p>

          {/* Newsletter Form */}
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} style={{
              display: 'flex',
              gap: '12px',
              maxWidth: '540px',
              margin: '0 auto',
              alignItems: 'center',
            }} id="newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                style={{
                  flex: 1,
                  padding: '16px 24px',
                  background: '#0a0a0f',
                  border: '1px solid rgba(255,255,255,0.06)',
                  color: '#f5f0e8',
                  fontSize: '13px',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary"
                style={{
                  padding: '16px 32px',
                  fontSize: '10px',
                  letterSpacing: '2px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  height: '49px',
                  boxSizing: 'border-box',
                }}
              >
                {isLoading ? 'JOINING...' : 'JOIN NOW'}
                <Send size={12} />
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                background: 'rgba(74,222,128,0.05)',
                border: '1px solid rgba(74,222,128,0.2)',
                padding: '20px 30px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                margin: '0 auto',
              }}
            >
              <CheckCircle size={18} color="#4ade80" />
              <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: 700, fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>
                WELCOME TO THE ROSTER. CHECK YOUR INBOX.
              </span>
            </motion.div>
          )}

          {/* Benefits Grid */}
          <div style={{
            marginTop: '64px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.04)',
          }}>
            {[
              { t: "Exclusive Offers", d: "First access to seasonal drops" },
              { t: "Grooming Guides", d: "Expert advice weekly" },
              { t: "Style Updates", d: "Latest in men's fashion culture" }
            ].map((b, idx) => (
              <div key={idx} style={{ background: '#050505', padding: '24px 16px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#f5f0e8', marginBottom: '4px', fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }}>{b.t}</div>
                <div style={{ fontSize: '11px', color: 'rgba(158,155,148,0.45)', fontFamily: 'Inter, sans-serif' }}>{b.d}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          #newsletter-form {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          #newsletter-form button {
            width: 100% !important;
            justify-content: center !important;
          }
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Newsletter;
