'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Barbers', href: '/barbers' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
  ];

  const serviceLinks = [
    { name: 'Haircuts', href: '/services' },
    { name: 'Beard Grooming', href: '/services' },
    { name: 'Hot Towel Shave', href: '/services' },
    { name: 'Hair Styling', href: '/services' },
    { name: 'Combo Packages', href: '/services' },
    { name: 'Premium Services', href: '/services' },
  ];

  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top accent line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(196,30,58,0.5) 50%, transparent 100%)',
      }} />

      {/* Large watermark */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        right: '-40px',
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(80px, 15vw, 180px)',
        fontWeight: 900,
        letterSpacing: '-0.05em',
        color: 'rgba(255,255,255,0.018)',
        pointerEvents: 'none',
        lineHeight: 1,
        userSelect: 'none',
      }}>DAVID PRO</div>

      <div className="container" style={{ paddingTop: '80px', paddingBottom: '40px', position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '60px',
          marginBottom: '64px',
        }}>

          {/* ── Brand Column ──────────────────────────────── */}
          <div>
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{
                width: '32px', height: '32px',
                border: '1px solid rgba(196,30,58,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: '14px' }}>✂</span>
              </div>
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '18px', fontWeight: 800,
                letterSpacing: '1px', color: '#f5f0e8',
              }}>
                DAVID PRO <span style={{color:'#c41e3a'}}>BARBER HUB</span>
              </span>
            </Link>

            <p style={{
              color: 'rgba(158,155,148,0.55)',
              fontSize: '13px', lineHeight: '1.75',
              marginBottom: '28px', maxWidth: '260px',
            }}>
              Where style meets precision. Experience the pinnacle of men's grooming since 1999.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'IG', title: 'Instagram' },
                { label: 'FB', title: 'Facebook' },
                { label: 'TW', title: 'Twitter' },
                { label: 'YT', title: 'YouTube' },
              ].map((s) => (
                <div
                  key={s.label}
                  title={s.title}
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px', fontWeight: 700,
                    letterSpacing: '1px', color: 'rgba(158,155,148,0.5)',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#c41e3a';
                    e.currentTarget.style.color = '#c41e3a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.color = 'rgba(158,155,148,0.5)';
                  }}
                >{s.label}</div>
              ))}
            </div>
          </div>

          {/* ── Navigate ────────────────────────────────── */}
          <div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '4px', textTransform: 'uppercase',
              color: '#c41e3a', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ display: 'block', width: '16px', height: '1px', background: '#c41e3a' }} />
              Navigate
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(158,155,148,0.5)',
                      fontSize: '13px', textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#f5f0e8';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(158,155,148,0.5)';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Services ────────────────────────────────── */}
          <div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '4px', textTransform: 'uppercase',
              color: '#c9a84c', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ display: 'block', width: '16px', height: '1px', background: '#c9a84c' }} />
              Services
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    style={{
                      color: 'rgba(158,155,148,0.5)',
                      fontSize: '13px', textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#c9a84c';
                      e.currentTarget.style.paddingLeft = '6px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(158,155,148,0.5)';
                      e.currentTarget.style.paddingLeft = '0';
                    }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ─────────────────────────────────── */}
          <div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '9px', fontWeight: 700,
              letterSpacing: '4px', textTransform: 'uppercase',
              color: 'rgba(158,155,148,0.4)', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ display: 'block', width: '16px', height: '1px', background: 'rgba(158,155,148,0.3)' }} />
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { icon: MapPin, text: '123 Barber Street, Lagos, Nigeria' },
                { icon: Phone, text: '+234 801 234 5678' },
                { icon: Mail, text: 'info@davidprobarberhub.com' },
                { icon: Clock, text: 'Mon–Sat: 9am – 8pm · Sun: 12pm – 6pm' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <item.icon size={13} color="rgba(196,30,58,0.6)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '12px', color: 'rgba(158,155,148,0.5)',
                    lineHeight: 1.6,
                  }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ────────────────────────────────── */}
        <div style={{
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px', letterSpacing: '2px',
            color: 'rgba(158,155,148,0.3)',
          }}>
            © {year} DAVID PRO BARBER HUB. ALL RIGHTS RESERVED.
          </p>
          <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <Link
                key={link}
                href="#"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '9px', letterSpacing: '2px',
                  textTransform: 'uppercase', color: 'rgba(158,155,148,0.3)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.7)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.3)'}
              >{link}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
