'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Scissors, Users, Award, Clock, Heart } from 'lucide-react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function AboutPage() {
  const values = [
    { icon: Scissors, title: 'Precision', description: 'Every cut is crafted with meticulous attention to detail, turning each session into a work of art.' },
    { icon: Users, title: 'Community', description: 'Building lasting relationships with clients — not just customers, but lifelong members of the David Pro family.' },
    { icon: Award, title: 'Excellence', description: 'Committed to the highest standards in every service, every visit, every single time.' },
    { icon: Heart, title: 'Passion', description: 'A deep love for the craft drives everything we do, from the first snip to the final look.' },
  ];

  const milestones = [
    { year: '1999', title: 'Founded', description: 'David Pro Barber Hub opens its first flagship location in Lagos.' },
    { year: '2008', title: 'Expansion', description: 'Opened our second luxury location, serving thousands more clients.' },
    { year: '2015', title: 'Awarded', description: 'Named Best Barbershop in Nigeria by Grooming Authority Magazine.' },
    { year: '2024', title: 'Digital', description: 'Launched our fully integrated online booking platform.' },
  ];

  const stats = [
    { number: '12,000+', label: 'Happy Clients', icon: Users },
    { number: '15+', label: 'Master Barbers', icon: Scissors },
    { number: '50+', label: 'Awards Won', icon: Award },
    { number: '25Y', label: 'Of Excellence', icon: Clock },
  ];

  return (
    <>
      <Navbar />
      <div style={{ background: '#050505', minHeight: '100vh' }}>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section style={{
          paddingTop: '150px', paddingBottom: '100px',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(
              90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px
            )`,
          }} />
          {/* Watermark */}
          <div style={{
            position: 'absolute', top: '-20px', right: '5%',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 900, lineHeight: 1,
            color: 'rgba(196,30,58,0.03)', pointerEvents: 'none',
            letterSpacing: '-0.05em',
          }}>OUR STORY</div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: 'clamp(40px, 6vw, 80px)',
              alignItems: 'center',
            }}>
              <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>
                    Our Story
                  </span>
                </div>
                <h1 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                  fontWeight: 900, letterSpacing: '-0.03em',
                  color: '#f5f0e8', lineHeight: '1.05', marginBottom: '24px',
                }}>
                  More Than<br />Just a<br /><span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Haircut.</span>
                </h1>
                <p style={{ color: 'rgba(158,155,148,0.65)', fontSize: '15px', lineHeight: 1.8, maxWidth: '500px', marginBottom: '36px' }}>
                  Since 1999, David Pro Barber Hub has been redefining the grooming experience in Nigeria. A space where craftsmanship meets community, and where every client leaves feeling transformed.
                </p>
                <Link href="/booking" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{ padding: '15px 36px', fontSize: '11px', letterSpacing: '3px' }}>
                    Book Your Experience →
                  </button>
                </Link>
              </motion.div>

              {/* Pull quote */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{
                  padding: '48px',
                  background: '#0e0e16',
                  border: '1px solid rgba(255,255,255,0.05)',
                  position: 'relative',
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: '#c41e3a' }} />
                <div style={{
                  fontFamily: "'Cormorant Garant', 'Playfair Display', serif",
                  fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  lineHeight: 1.55,
                  color: '#f0ece4',
                  marginBottom: '28px',
                }}>
                  "Where precision meets artistry — every cut tells a story of craftsmanship and dedication to the modern gentleman."
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '28px', height: '1px', background: '#c41e3a' }} />
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a',
                  }}>— Founder, David Pro Barber Hub</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ──────────────────────────────────────── */}
        <section style={{
          background: '#0a0a0f',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          padding: '0',
        }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              borderLeft: '1px solid rgba(255,255,255,0.04)',
            }}>
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    padding: '48px 32px',
                    borderRight: '1px solid rgba(255,255,255,0.04)',
                    textAlign: 'center',
                  }}
                >
                  <stat.icon size={20} color="#c41e3a" style={{ margin: '0 auto 16px' }} />
                  <div style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                    fontWeight: 900, letterSpacing: '-0.03em',
                    color: '#f5f0e8', lineHeight: 1,
                    marginBottom: '8px',
                  }}>{stat.number}</div>
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px', letterSpacing: '2.5px',
                    textTransform: 'uppercase', color: 'rgba(158,155,148,0.45)',
                  }}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ─────────────────────────────────────────── */}
        <section style={{ padding: '100px 0', background: '#050505' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '64px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c9a84c' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c' }}>
                  What We Stand For
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900, letterSpacing: '-0.03em',
                color: '#f5f0e8',
              }}>
                Our <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Values.</span>
              </h2>
            </motion.div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1px',
              background: 'rgba(255,255,255,0.04)',
            }}>
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    padding: '48px 36px',
                    background: '#050505',
                    transition: 'background 0.25s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#0a0a0f'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#050505'}
                >
                  <div style={{
                    width: '44px', height: '44px',
                    border: '1px solid rgba(196,30,58,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '24px',
                  }}>
                    <v.icon size={20} color="#c41e3a" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '22px', fontWeight: 700,
                    letterSpacing: '-0.01em', color: '#f5f0e8', marginBottom: '12px',
                  }}>{v.title}</h3>
                  <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px', lineHeight: 1.7 }}>{v.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ───────────────────────────────────────── */}
        <section style={{ padding: '100px 0', background: '#0a0a0f', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ marginBottom: '64px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '1px', background: '#c41e3a' }} />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>
                  Our Journey
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e8',
              }}>
                The <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Timeline.</span>
              </h2>
            </motion.div>

            <div style={{ position: 'relative' }}>
              {/* Vertical line */}
              <div style={{
                position: 'absolute',
                left: '60px',
                top: 0, bottom: 0,
                width: '1px',
                background: 'rgba(255,255,255,0.06)',
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}
                  >
                    {/* Year + dot */}
                    <div style={{ flexShrink: 0, width: '80px', textAlign: 'right', position: 'relative' }}>
                      <div style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '15px', fontWeight: 800,
                        color: '#c41e3a',
                      }}>{m.year}</div>
                      <div style={{
                        position: 'absolute',
                        right: '-21px', top: '4px',
                        width: '9px', height: '9px',
                        background: '#c41e3a',
                        border: '2px solid #0a0a0f',
                      }} />
                    </div>
                    <div style={{
                      flex: 1,
                      padding: '24px 28px',
                      background: '#111118',
                      border: '1px solid rgba(255,255,255,0.04)',
                    }}>
                      <h3 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '20px', fontWeight: 700,
                        color: '#f5f0e8', marginBottom: '8px',
                      }}>{m.title}</h3>
                      <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px', lineHeight: 1.6 }}>{m.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section style={{ padding: '100px 0', background: '#050505' }}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: '40px',
                alignItems: 'center',
                padding: '60px',
                background: '#0a0a0f',
                border: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, #c41e3a, transparent)' }} />
              <div>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '12px' }}>
                  Ready to Begin?
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                  fontWeight: 900, letterSpacing: '-0.02em', color: '#f5f0e8', marginBottom: '10px',
                }}>
                  Experience the <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Difference.</span>
                </h2>
                <p style={{ color: 'rgba(158,155,148,0.5)', fontSize: '13px' }}>
                  Book your appointment today and discover why our clients keep coming back.
                </p>
              </div>
              <Link href="/booking" style={{ textDecoration: 'none', flexShrink: 0 }}>
                <button className="btn-primary" style={{ padding: '16px 36px', fontSize: '11px', letterSpacing: '3px', whiteSpace: 'nowrap' }}>
                  Book Now →
                </button>
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}