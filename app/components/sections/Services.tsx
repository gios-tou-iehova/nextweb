'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  category: string;
}

const categoryMeta: Record<string, { emoji: string; accent: string; tag: string }> = {
  Haircut:  { emoji: '✂️', accent: '#ff3b30', tag: 'SIGNATURE CUT' },
  Beard:    { emoji: '🧔', accent: '#f97316', tag: 'BEARD CRAFT' },
  Shave:    { emoji: '🪒', accent: '#eab308', tag: 'HOT SHAVE' },
  Combo:    { emoji: '💈', accent: '#22c55e', tag: 'FULL COMBO' },
  Premium:  { emoji: '👑', accent: '#a855f7', tag: 'PREMIUM' },
  default:  { emoji: '✂️', accent: '#ff3b30', tag: 'SERVICE' },
};

const serviceImages: Record<string, string> = {
  Haircut: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=700&h=900&fit=crop&crop=face',
  Beard:   'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=700&h=900&fit=crop&crop=face',
  Shave:   'https://images.unsplash.com/photo-1622286346003-c8b4473cd8c8?w=700&h=900&fit=crop&crop=face',
  Combo:   'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=700&h=900&fit=crop&crop=face',
  Premium: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=700&h=900&fit=crop&crop=face',
  default: 'https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=700&h=900&fit=crop&crop=face',
};

const categories = ['All', 'Haircut', 'Beard', 'Shave', 'Combo', 'Premium'];

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/services`);
      const data = await res.json();
      if (data.status === 'success') setServices(data.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const featured = filtered[featuredIndex] ?? filtered[0];

  const getMeta = (cat: string) => categoryMeta[cat] ?? categoryMeta.default;
  const getImg  = (cat: string) => serviceImages[cat] ?? serviceImages.default;

  // drag-to-scroll
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 1.5;
  };
  const onMouseUp = () => { isDragging.current = false; };

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  });

  const scrollBy = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section style={{ padding: '100px 0', background: '#080808', textAlign: 'center' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          style={{ fontSize: '40px', display: 'inline-block' }}
        >✂️</motion.div>
        <p style={{ color: '#555', marginTop: '16px', letterSpacing: '2px', fontSize: '12px' }}>
          LOADING COLLECTION...
        </p>
      </section>
    );
  }

  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 130px) 0 0',
      background: '#080808',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ── Ambient background ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 60% 50% at 80% 20%, rgba(255,59,48,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 40% 40% at 10% 80%, rgba(168,85,247,0.05) 0%, transparent 60%)
        `,
      }} />

      {/* ── HEADER ── */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '0',
          paddingBottom: '32px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                color: '#ff3b30',
                letterSpacing: '5px',
                fontSize: '11px',
                marginBottom: '14px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Sparkles size={12} /> THE COLLECTION <Sparkles size={12} />
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4rem)',
                fontWeight: 900,
                fontFamily: "'Playfair Display', serif",
                lineHeight: 1.0,
                letterSpacing: '-0.02em',
              }}
            >
              Signature{' '}
              <span style={{
                background: 'linear-gradient(135deg, #ff3b30, #ff9d98)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>
                Services
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            <Link href="/services" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.04, background: '#ff3b30', color: 'white' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,59,48,0.4)',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  color: '#ff3b30',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  letterSpacing: '0.5px',
                  transition: 'all 0.3s ease',
                }}
              >
                Explore All <ArrowRight size={15} />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* ── CATEGORY PILLS ── */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px',
          padding: '28px 0 36px',
        }}>
          {categories.map((cat) => {
            const active = activeCategory === cat;
            const meta = getMeta(cat);
            return (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => { setActiveCategory(cat); setFeaturedIndex(0); }}
                style={{
                  background: active ? meta.accent : 'rgba(255,255,255,0.04)',
                  color: active ? 'white' : '#888',
                  border: active ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  padding: '9px 22px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.25s ease',
                  boxShadow: active ? `0 4px 20px ${meta.accent}55` : 'none',
                }}
              >
                {cat === 'All' ? '✦ ALL' : `${meta.emoji} ${cat.toUpperCase()}`}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── FEATURED HERO CARD ── */}
      <AnimatePresence mode="wait">
        {featured ? (
          <motion.div
            key={featured.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container"
            style={{ position: 'relative', zIndex: 2, marginBottom: '60px' }}
          >
            <div style={{
              position: 'relative',
              borderRadius: '28px',
              overflow: 'hidden',
              height: 'clamp(320px, 45vw, 520px)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
            }}>
              {/* Left — image */}
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <motion.img
                  key={featured.id + '-img'}
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  src={getImg(featured.category)}
                  alt={featured.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* dark overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(90deg, transparent 60%, rgba(10,10,15,0.95) 100%)',
                }} />
                {/* Issue number */}
                <div style={{
                  position: 'absolute',
                  top: '24px',
                  left: '24px',
                  fontSize: 'clamp(80px, 12vw, 140px)',
                  fontWeight: 900,
                  color: 'rgba(255,255,255,0.06)',
                  fontFamily: "'Playfair Display', serif",
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {String(featuredIndex + 1).padStart(2, '0')}
                </div>
                {/* Category tag */}
                <div style={{
                  position: 'absolute',
                  bottom: '24px',
                  left: '24px',
                  background: getMeta(featured.category).accent,
                  padding: '6px 16px',
                  borderRadius: '50px',
                  fontSize: '10px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: 'white',
                }}>
                  {getMeta(featured.category).tag}
                </div>
              </div>

              {/* Right — content */}
              <div style={{
                background: 'linear-gradient(135deg, #0f0f18 0%, #14141e 100%)',
                padding: 'clamp(28px, 4vw, 52px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Glow */}
                <div style={{
                  position: 'absolute', top: '-40%', right: '-20%',
                  width: '300px', height: '300px',
                  background: `radial-gradient(circle, ${getMeta(featured.category).accent}22 0%, transparent 70%)`,
                  borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none',
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  {/* Price */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: `${getMeta(featured.category).accent}18`,
                    border: `1px solid ${getMeta(featured.category).accent}44`,
                    padding: '6px 16px',
                    borderRadius: '50px',
                    marginBottom: '20px',
                  }}>
                    <span style={{
                      fontSize: 'clamp(16px, 2.5vw, 22px)',
                      fontWeight: 900,
                      color: getMeta(featured.category).accent,
                    }}>
                      ₦{parseInt(featured.price).toLocaleString()}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)',
                    fontWeight: 900,
                    fontFamily: "'Playfair Display', serif",
                    lineHeight: 1.1,
                    marginBottom: '16px',
                    letterSpacing: '-0.02em',
                  }}>
                    {featured.name}
                  </h3>

                  {/* Divider */}
                  <div style={{
                    width: '40px', height: '2px',
                    background: getMeta(featured.category).accent,
                    marginBottom: '16px',
                    borderRadius: '2px',
                  }} />

                  {/* Description */}
                  <p style={{
                    color: '#888',
                    fontSize: 'clamp(13px, 1.5vw, 15px)',
                    lineHeight: 1.7,
                    marginBottom: '24px',
                    maxWidth: '340px',
                  }}>
                    {featured.description || 'A premium grooming experience crafted by our master barbers with meticulous attention to detail.'}
                  </p>

                  {/* Duration */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#555',
                    fontSize: '13px',
                    marginBottom: '32px',
                  }}>
                    <Clock size={14} color={getMeta(featured.category).accent} />
                    <span>{featured.duration_minutes} min session</span>
                    <span style={{ color: '#333' }}>•</span>
                    <span>Expert barber</span>
                  </div>
                </div>

                {/* CTA */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <Link href="/booking" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        background: `linear-gradient(135deg, ${getMeta(featured.category).accent}, ${getMeta(featured.category).accent}cc)`,
                        border: 'none',
                        padding: 'clamp(12px, 2vw, 16px) clamp(24px, 4vw, 40px)',
                        borderRadius: '50px',
                        color: 'white',
                        fontWeight: 800,
                        fontSize: '13px',
                        letterSpacing: '1.5px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        boxShadow: `0 8px 30px ${getMeta(featured.category).accent}44`,
                      }}
                    >
                      BOOK THIS SERVICE <ArrowRight size={16} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ── HORIZONTAL SCROLL STRIP ── */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Scroll arrows */}
        <button
          onClick={() => scrollBy(-1)}
          style={{
            position: 'absolute', left: '16px', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#ff3b30')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(10,10,15,0.85)')}
        >
          <ChevronLeft size={20} color="white" />
        </button>
        <button
          onClick={() => scrollBy(1)}
          style={{
            position: 'absolute', right: '16px', top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 10,
            background: 'rgba(10,10,15,0.85)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%',
            width: '44px', height: '44px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#ff3b30')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(10,10,15,0.85)')}
        >
          <ChevronRight size={20} color="white" />
        </button>

        {/* Fade edges */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(90deg, #080808, transparent)',
          zIndex: 5, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px',
          background: 'linear-gradient(270deg, #080808, transparent)',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          onMouseDown={onMouseDown}
          style={{
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '8px 80px 48px',
            cursor: 'grab',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div style={{ display: 'flex', gap: '20px', width: 'fit-content' }}>
            {filtered.map((service, idx) => {
              const meta = getMeta(service.category);
              const isActive = featuredIndex === idx;
              const isHovered = hoveredId === service.id;

              return (
                <motion.div
                  key={`${service.id}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  onClick={() => setFeaturedIndex(idx)}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    width: 'clamp(240px, 28vw, 300px)',
                    flexShrink: 0,
                    borderRadius: '20px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: isActive
                      ? `2px solid ${meta.accent}`
                      : '2px solid rgba(255,255,255,0.04)',
                    transition: 'all 0.35s ease',
                    transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: isActive
                      ? `0 16px 50px ${meta.accent}44`
                      : isHovered
                        ? '0 12px 40px rgba(0,0,0,0.5)'
                        : '0 4px 20px rgba(0,0,0,0.3)',
                    background: '#0f0f18',
                    position: 'relative',
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: 'clamp(200px, 25vw, 280px)', overflow: 'hidden' }}>
                    <img
                      src={getImg(service.category)}
                      alt={service.name}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        transition: 'transform 0.6s ease',
                        transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      }}
                    />
                    {/* Gradient */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(10,10,20,0.95) 100%)',
                    }} />

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="active-pill"
                        style={{
                          position: 'absolute', top: '12px', left: '12px',
                          background: meta.accent,
                          padding: '4px 12px',
                          borderRadius: '50px',
                          fontSize: '9px',
                          fontWeight: 800,
                          letterSpacing: '1.5px',
                          color: 'white',
                        }}
                      >
                        FEATURED
                      </motion.div>
                    )}

                    {/* Price */}
                    <div style={{
                      position: 'absolute', top: '12px', right: '12px',
                      background: 'rgba(0,0,0,0.7)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${meta.accent}55`,
                      padding: '5px 12px',
                      borderRadius: '50px',
                      fontSize: '13px',
                      fontWeight: 800,
                      color: meta.accent,
                    }}>
                      ₦{parseInt(service.price).toLocaleString()}
                    </div>

                    {/* Name overlay */}
                    <div style={{
                      position: 'absolute', bottom: '14px', left: '14px', right: '14px',
                    }}>
                      <div style={{
                        fontSize: '10px', fontWeight: 700,
                        color: meta.accent, letterSpacing: '2px', marginBottom: '4px',
                      }}>
                        {meta.tag}
                      </div>
                      <div style={{
                        fontSize: 'clamp(14px, 2vw, 17px)',
                        fontWeight: 800,
                        fontFamily: "'Playfair Display', serif",
                        lineHeight: 1.2,
                        color: 'white',
                      }}>
                        {service.name}
                      </div>
                    </div>
                  </div>

                  {/* Footer strip */}
                  <div style={{
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: `1px solid rgba(255,255,255,0.05)`,
                  }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      color: '#555', fontSize: '12px',
                    }}>
                      <Clock size={12} color={meta.accent} />
                      {service.duration_minutes} min
                    </div>
                    <Link href="/booking" style={{ textDecoration: 'none' }} onClick={(e) => e.stopPropagation()}>
                      <motion.button
                        whileHover={{ scale: 1.08, color: meta.accent }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: isActive ? meta.accent : '#555',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          letterSpacing: '0.5px',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        Book <ArrowRight size={12} />
                      </motion.button>
                    </Link>
                  </div>

                  {/* Bottom accent bar */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    height: '3px',
                    background: isActive ? meta.accent : 'transparent',
                    transition: 'background 0.3s ease',
                  }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SCROLL HINT ── */}
      <div style={{
        textAlign: 'center',
        paddingBottom: 'clamp(50px, 8vw, 80px)',
        color: '#333',
        fontSize: '11px',
        letterSpacing: '3px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}>
        <div style={{ width: '30px', height: '1px', background: '#333' }} />
        DRAG TO EXPLORE
        <div style={{ width: '30px', height: '1px', background: '#333' }} />
      </div>

      <style>{`
        div::-webkit-scrollbar { display: none; }

        @media (max-width: 900px) {
          /* Featured card stacks */
          div[style*="gridTemplateColumns: '1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          div[style*="height: clamp(320px, 45vw, 520px)"] {
            height: auto !important;
          }
        }

        @media (max-width: 640px) {
          div[style*="padding: '8px 80px 48px'"] {
            padding: 8px 20px 40px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
