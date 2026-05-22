'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, X } from 'lucide-react';
import Link from 'next/link';

const FloatingBooking = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isVisible ? (
        <motion.div
          key="floating-booking"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 1000,
          }}
        >
          {!isExpanded ? (
            // Floating Button
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsExpanded(true)}
              style={{
                width: '56px',
                height: '56px',
                background: '#c41e3a',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <Calendar size={20} color="white" />
              
              {/* Pulse Animation */}
              <div style={{
                position: 'absolute',
                inset: '-3px',
                border: '1px solid #c41e3a',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
            </motion.button>
          ) : (
            // Expanded Quick Booking Card
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                width: '300px',
                background: '#0a0a0f',
                padding: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #c41e3a, transparent)' }} />
              {/* Header */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
              }}>
                <div>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '8px', letterSpacing: '2px', textTransform: 'uppercase', color: '#c41e3a', display: 'block', marginBottom: '2px' }}>
                    IMMERSIVE SERVICE
                  </span>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 800,
                    fontFamily: "'Playfair Display', serif",
                    color: '#f5f0e8',
                    margin: 0,
                  }}>
                    Quick Reservation
                  </h3>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.06)',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={12} color="rgba(158,155,148,0.5)" />
                </button>
              </div>

              {/* Quick Info */}
              <div style={{
                background: 'rgba(196,30,58,0.05)',
                padding: '14px',
                marginBottom: '20px',
                border: '1px solid rgba(196,30,58,0.15)',
              }}>
                <div style={{
                  fontSize: '9px',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 700,
                  color: '#c41e3a',
                  marginBottom: '4px',
                  letterSpacing: '1px',
                }}>
                  ⚡ OPEN TODAY
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'rgba(158,155,148,0.7)',
                  fontFamily: 'Inter, sans-serif',
                }}>
                  Next slot: 2:30 PM - 3:00 PM
                </div>
              </div>

              {/* Quick Actions */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}>
                <Link href="/booking" style={{ textDecoration: 'none' }}>
                  <button
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '10px',
                      letterSpacing: '2px',
                    }}
                  >
                    Reserve Now →
                  </button>
                </Link>
              </div>

              {/* Contact Info */}
              <div style={{
                marginTop: '16px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                fontSize: '11px',
                color: 'rgba(158,155,148,0.4)',
                textAlign: 'center',
                fontFamily: 'Inter, sans-serif',
              }}>
                Or Call Desk: <span style={{ color: '#c9a84c', fontWeight: 600 }}>+234 123 456 7890</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.08);
          }
        }

        @media (max-width: 640px) {
          div[style*="bottom: 30px"] {
            bottom: 20px !important;
            right: 20px !important;
          }
          
          div[style*="width: 300px"] {
            width: calc(100vw - 40px) !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default FloatingBooking;
