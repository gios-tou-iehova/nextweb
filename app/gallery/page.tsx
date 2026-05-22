'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=700&fit=crop&crop=face", label: "Precision Cut" },
  { src: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&h=700&fit=crop&crop=face", label: "Beard Sculpting" },
  { src: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&h=700&fit=crop&crop=face", label: "Classic Shave" },
  { src: "https://images.unsplash.com/photo-1622286346003-c8b4473cd8c8?w=700&h=700&fit=crop&crop=face", label: "Fade Master" },
  { src: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&h=700&fit=crop&crop=face", label: "Skin Fade" },
  { src: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=700&h=700&fit=crop&crop=face", label: "Executive Style" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&h=700&fit=crop&crop=face", label: "Gentleman Cut" },
  { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=700&h=700&fit=crop&crop=face", label: "Modern Texture" },
  { src: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=700&h=700&fit=crop&crop=face", label: "Pompadour" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=700&h=700&fit=crop&crop=face", label: "Undercut" },
  { src: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=700&h=700&fit=crop&crop=face", label: "Tapered Fade" },
  { src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=700&h=700&fit=crop&crop=face", label: "Caesar Cut" },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <div style={{ background: '#050505', minHeight: '100vh' }}>

        {/* ── HEADER ──────────────────────────────────────── */}
        <section style={{
          paddingTop: '150px', paddingBottom: '80px',
          position: 'relative', overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            position: 'absolute', bottom: '-20px', right: '5%',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 900, lineHeight: 1,
            color: 'rgba(196,30,58,0.03)', pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}>ART</div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>Our Work</span>
              </div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e8', lineHeight: '1.05', marginBottom: '20px' }}>
                The Art of<br /><span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Grooming.</span>
              </h1>
              <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '15px', maxWidth: '520px', lineHeight: 1.7 }}>
                Every image tells a story of precision and artistry. Explore our portfolio of premium cuts and styles.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── MASONRY GRID ──────────────────────────────────── */}
        <section style={{ padding: '80px 0 100px' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
              background: 'rgba(255,255,255,0.04)',
            }}>
              {IMAGES.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(img.src)}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  style={{
                    aspectRatio: '1/1',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    background: '#0a0a0f',
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
                      transform: hoveredIdx === i ? 'scale(1.08)' : 'scale(1)',
                    }}
                  />
                  {/* Hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.9) 100%)',
                    opacity: hoveredIdx === i ? 1 : 0,
                    transition: 'opacity 0.35s',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'flex-start', justifyContent: 'flex-end',
                    padding: '20px',
                  }}>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '16px', fontWeight: 700,
                      color: '#f5f0e8', marginBottom: '6px',
                    }}>{img.label}</div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '9px', fontWeight: 700,
                      letterSpacing: '2px', textTransform: 'uppercase', color: '#c41e3a',
                    }}>
                      <ZoomIn size={12} /> View
                    </div>
                  </div>
                  {/* Index badge */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    background: 'rgba(5,5,5,0.7)', backdropFilter: 'blur(8px)',
                    padding: '3px 10px',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px', fontWeight: 700,
                    letterSpacing: '1px', color: 'rgba(245,240,232,0.5)',
                    opacity: hoveredIdx === i ? 1 : 0,
                    transition: 'opacity 0.35s',
                  }}>#{String(i + 1).padStart(2, '0')}</div>
                </motion.div>
              ))}
            </div>

            {/* Count strip */}
            <div style={{
              marginTop: '40px', paddingTop: '24px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(158,155,148,0.35)' }}>
                {IMAGES.length} Works in Portfolio
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '16px', height: '1px', background: '#c41e3a' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a' }}>Elite Barber Studio</span>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />

      {/* ── LIGHTBOX ──────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.97)',
              backdropFilter: 'blur(12px)',
              zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '20px', cursor: 'pointer',
            }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: '28px', right: '28px',
                width: '44px', height: '44px',
                border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'white', zIndex: 10000,
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#c41e3a'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <X size={20} color="white" />
            </button>
            <motion.img
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              src={selected}
              alt="Gallery"
              onClick={e => e.stopPropagation()}
              style={{
                maxWidth: '88%', maxHeight: '88vh',
                objectFit: 'contain', cursor: 'default',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
