'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  category: string;
  is_active: number;
}

const CATEGORIES = ['All', 'Haircut', 'Beard', 'Shave', 'Combo', 'Premium'];

const categoryImages: Record<string, string> = {
  Haircut: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=face',
  Beard: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=400&fit=crop&crop=face',
  Shave: 'https://images.unsplash.com/photo-1622286346003-c8b4473cd8c8?w=600&h=400&fit=crop&crop=face',
  Combo: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=400&fit=crop&crop=face',
  Premium: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=face',
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const router = useRouter();

  useEffect(() => { fetchServices(); }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || '/api/proxy'}/services`);
      const data = await res.json();
      if (data.status === 'success') setServices(data.data);
    } catch {}
    finally { setLoading(false); }
  };

  const filtered = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  if (loading) return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '1px solid rgba(196,30,58,0.2)', borderTop: '1px solid #c41e3a', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '4px', color: 'rgba(158,155,148,0.4)', textTransform: 'uppercase' }}>Loading Services</span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <div style={{ background: '#050505', minHeight: '100vh' }}>

        {/* ── HERO HEADER ─────────────────────────────────── */}
        <section style={{
          paddingTop: '150px', paddingBottom: '80px',
          position: 'relative', overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(
              -45deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px
            )`,
          }} />
          <div style={{
            position: 'absolute', bottom: '-20px', right: '5%',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(80px, 18vw, 200px)',
            fontWeight: 900, lineHeight: 1,
            color: 'rgba(196,30,58,0.035)', pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}>CUT</div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>
                  Our Offerings
                </span>
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900, letterSpacing: '-0.03em',
                color: '#f5f0e8', lineHeight: '1.05', marginBottom: '20px',
              }}>
                Premium<br />
                <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Grooming Services.</span>
              </h1>
              <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '15px', maxWidth: '520px', lineHeight: 1.7 }}>
                Every service is a masterpiece. Crafted with precision, delivered with care — your transformation starts here.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── CATEGORY FILTER ─────────────────────────────── */}
        <section style={{ padding: '60px 0 0' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              gap: '0',
              flexWrap: 'wrap',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              marginBottom: '60px',
            }}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '14px 24px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: activeCategory === cat ? '2px solid #c41e3a' : '2px solid transparent',
                    color: activeCategory === cat ? '#f5f0e8' : 'rgba(158,155,148,0.5)',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '2.5px', textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s',
                    marginBottom: '-1px',
                  }}
                  onMouseEnter={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = '#f5f0e8'; }}
                  onMouseLeave={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = 'rgba(158,155,148,0.5)'; }}
                >
                  {cat === 'All' ? 'All Services' : cat}
                </button>
              ))}
            </div>

            {/* ── SERVICES GRID ───────────────────────────── */}
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(158,155,148,0.4)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#f5f0e8', marginBottom: '8px' }}>No services found</div>
                <div style={{ fontSize: '13px' }}>Try a different category</div>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                gap: '1px',
                background: 'rgba(255,255,255,0.04)',
              }}>
                {filtered.map((service, i) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    style={{
                      background: '#0a0a0f',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'background 0.25s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#111118'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#0a0a0f'}
                  >
                    {/* Image */}
                    <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                      <img
                        src={categoryImages[service.category] || categoryImages.Haircut}
                        alt={service.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s', display: 'block' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.06)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.8) 100%)',
                      }} />
                      {/* Price tag */}
                      <div style={{
                        position: 'absolute', top: '16px', right: '16px',
                        background: '#c41e3a',
                        padding: '6px 14px',
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '15px', fontWeight: 800,
                        color: 'white', letterSpacing: '-0.01em',
                      }}>
                        ₦{parseInt(service.price).toLocaleString()}
                      </div>
                      {/* Category chip */}
                      <div style={{
                        position: 'absolute', bottom: '16px', left: '16px',
                        background: 'rgba(5,5,5,0.8)', backdropFilter: 'blur(8px)',
                        padding: '4px 12px',
                        fontFamily: 'Montserrat, sans-serif',
                        fontSize: '9px', fontWeight: 700,
                        letterSpacing: '2px', textTransform: 'uppercase',
                        color: 'rgba(245,240,232,0.7)',
                      }}>{service.category}</div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '28px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '22px', fontWeight: 700,
                        letterSpacing: '-0.01em', color: '#f5f0e8',
                        marginBottom: '10px',
                      }}>{service.name}</h3>
                      <p style={{
                        color: 'rgba(158,155,148,0.6)',
                        fontSize: '13px', lineHeight: '1.7',
                        marginBottom: '20px', flex: 1,
                      }}>
                        {service.description || 'Premium grooming experience with our expert barbers. Every cut crafted to perfection.'}
                      </p>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Clock size={13} color="rgba(196,30,58,0.7)" />
                          <span style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '10px', letterSpacing: '1.5px',
                            textTransform: 'uppercase', color: 'rgba(158,155,148,0.5)',
                          }}>{service.duration_minutes} min</span>
                        </div>
                        <button
                          onClick={() => router.push('/booking')}
                          style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            background: 'transparent', border: 'none',
                            color: '#c41e3a', cursor: 'pointer',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '10px', fontWeight: 700,
                            letterSpacing: '2px', textTransform: 'uppercase',
                            transition: 'gap 0.2s',
                            padding: '0',
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.gap = '10px'}
                          onMouseLeave={(e) => e.currentTarget.style.gap = '6px'}
                        >
                          Book <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA STRIP ────────────────────────────────────── */}
        <section style={{ padding: '100px 0' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '40px',
                alignItems: 'center',
                padding: '60px',
                border: '1px solid rgba(255,255,255,0.05)',
                background: '#0a0a0f',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
                background: '#c41e3a',
              }} />
              <div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '12px' }}>
                  Expert Consultation
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontWeight: 800, letterSpacing: '-0.02em',
                  color: '#f5f0e8', marginBottom: '10px',
                }}>
                  Not Sure What to Choose?
                </h2>
                <p style={{ color: 'rgba(158,155,148,0.5)', fontSize: '13px' }}>
                  Our master barbers will help you select the perfect service for your style.
                </p>
              </div>
              <button
                className="btn-primary"
                onClick={() => router.push('/booking')}
                style={{ padding: '16px 32px', fontSize: '11px', letterSpacing: '2.5px', whiteSpace: 'nowrap' }}
              >
                Book Consultation →
              </button>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
