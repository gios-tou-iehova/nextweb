'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Scissors, User, LogOut, LayoutDashboard,
  Settings, Calendar, Heart, ChevronDown,
  Home, Info, Phone, Image, BookOpen
} from 'lucide-react';
import toast from 'react-hot-toast';
import NotificationBell from '../Notifications';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setIsLoggedIn(true);
        setIsAdmin(userData.role === 'admin');
        setUserName(userData.first_name || userData.name || 'Member');
      } catch { /* noop */ }
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      setUserName('');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsLoggedIn(false);
    setIsAdmin(false);
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    toast.success('Signed out successfully');
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Services', href: '/services', icon: Scissors },
    { name: 'Barbers', href: '/barbers', icon: User },
    { name: 'Gallery', href: '/gallery', icon: Image },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const dropdownItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Appointments', href: '/dashboard', icon: Calendar },
    { name: 'My Profile', href: '/dashboard/profile', icon: User },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const adminItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Scissors },
    { name: 'Barbers', href: '/admin/barbers', icon: User },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Users', href: '/admin/users', icon: Heart },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        background: scrolled
          ? 'rgba(5,5,5,0.96)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.04)' : 'none',
        transition: 'background 0.4s cubic-bezier(0.4,0,0.2,1), border 0.4s',
      }}>
        {/* Top thin accent line */}
        {scrolled && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(196,30,58,0.6) 50%, transparent 100%)',
          }} />
        )}

        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '76px',
          }}>

            {/* ── LOGO ─────────────────────────────────── */}
            <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '34px',
                height: '34px',
                border: '1px solid rgba(196,30,58,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(196,30,58,0.12)';
                  e.currentTarget.style.borderColor = '#c41e3a';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'rgba(196,30,58,0.5)';
                }}
              >
                <Scissors size={15} color="#c41e3a" />
              </div>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '16px',
                  fontWeight: 800,
                  letterSpacing: '1px',
                  color: '#f5f0e8',
                  lineHeight: 1.1,
                }}>
                  DAVID PRO <span style={{color:'#c41e3a'}}>BARBER HUB</span>
                </div>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '8px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'rgba(158,155,148,0.4)',
                }}>Premium Grooming</div>
              </div>
            </Link>

            {/* ── DESKTOP LINKS ────────────────────────── */}
            <div className="hide-mobile" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  style={{
                    color: isActive(link.href) ? '#f5f0e8' : 'rgba(158,155,148,0.65)',
                    textDecoration: 'none',
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    position: 'relative',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f5f0e8'}
                  onMouseLeave={(e) => {
                    if (!isActive(link.href)) e.currentTarget.style.color = 'rgba(158,155,148,0.65)';
                  }}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0, left: '12px', right: '12px',
                      height: '1px',
                      background: '#c41e3a',
                    }} />
                  )}
                </Link>
              ))}
            </div>

            {/* ── RIGHT ACTIONS ────────────────────────── */}
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {isLoggedIn && !isAdmin && <NotificationBell />}

              {isLoggedIn ? (
                <div ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '8px 14px',
                      cursor: 'pointer',
                      color: '#f5f0e8',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(196,30,58,0.4)'}
                    onMouseLeave={(e) => {
                      if (!dropdownOpen) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    <div style={{
                      width: '26px', height: '26px',
                      background: '#c41e3a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '12px', fontWeight: 700, color: 'white',
                    }}>
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px', fontWeight: 700,
                      letterSpacing: '1.5px', textTransform: 'uppercase',
                    }}>
                      {userName.split(' ')[0]}
                    </span>
                    <ChevronDown
                      size={12}
                      style={{ transition: 'transform 0.25s', transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 8px)',
                          right: 0,
                          width: '220px',
                          background: '#0e0e16',
                          border: '1px solid rgba(255,255,255,0.06)',
                          boxShadow: '0 24px 48px rgba(0,0,0,0.6)',
                          overflow: 'hidden',
                        }}
                      >
                        {/* Header strip */}
                        <div style={{
                          height: '1px',
                          background: 'linear-gradient(90deg, #c41e3a, transparent)',
                        }} />

                        <div style={{ padding: '12px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <div style={{
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '9px', letterSpacing: '3px',
                            textTransform: 'uppercase',
                            color: '#c41e3a', marginBottom: '4px',
                          }}>
                            {isAdmin ? 'Admin Console' : 'My Account'}
                          </div>
                          <div style={{
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px', color: '#f5f0e8',
                          }}>{userName}</div>
                        </div>

                        {(isAdmin ? adminItems : dropdownItems).map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '10px',
                              padding: '11px 16px',
                              color: 'rgba(158,155,148,0.7)',
                              textDecoration: 'none',
                              fontFamily: 'Montserrat, sans-serif',
                              fontSize: '10px',
                              fontWeight: 600,
                              letterSpacing: '1.5px',
                              textTransform: 'uppercase',
                              transition: 'all 0.18s',
                              borderBottom: '1px solid rgba(255,255,255,0.03)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#f5f0e8';
                              e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                              e.currentTarget.style.paddingLeft = '20px';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = 'rgba(158,155,148,0.7)';
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.paddingLeft = '16px';
                            }}
                          >
                            <item.icon size={13} color="#c41e3a" />
                            {item.name}
                          </Link>
                        ))}

                        <button
                          onClick={handleLogout}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '12px 16px',
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            borderTop: '1px solid rgba(255,255,255,0.04)',
                            color: 'rgba(196,30,58,0.7)',
                            cursor: 'pointer',
                            fontFamily: 'Montserrat, sans-serif',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '1.5px',
                            textTransform: 'uppercase',
                            textAlign: 'left',
                            transition: 'all 0.18s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#c41e3a';
                            e.currentTarget.style.background = 'rgba(196,30,58,0.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(196,30,58,0.7)';
                            e.currentTarget.style.background = 'transparent';
                          }}
                        >
                          <LogOut size={13} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <Link href="/auth/login" style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '2px', textTransform: 'uppercase',
                    color: 'rgba(158,155,148,0.7)',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    transition: 'color 0.25s',
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#f5f0e8'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.7)'}
                  >Sign In</Link>
                  <Link href="/booking" style={{ textDecoration: 'none' }}>
                    <button className="btn-primary" style={{ padding: '10px 20px', fontSize: '10px', letterSpacing: '2px' }}>
                      Book Now
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* ── MOBILE HAMBURGER ─────────────────────── */}
            <button
              className="show-mobile"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: 'none',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '8px',
                cursor: 'pointer',
                color: '#f5f0e8',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ── MOBILE DRAWER ──────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(5,5,5,0.98)',
                backdropFilter: 'blur(24px)',
                borderTop: '1px solid rgba(255,255,255,0.04)',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '24px' }}>
                {/* Mobile nav links */}
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '14px 0',
                      color: isActive(link.href) ? '#f5f0e8' : 'rgba(158,155,148,0.6)',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                    }}
                  >
                    <link.icon size={14} color={isActive(link.href) ? '#c41e3a' : 'rgba(158,155,148,0.4)'} />
                    {link.name}
                  </Link>
                ))}

                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="btn-secondary"
                      style={{ flex: 1, padding: '12px', fontSize: '10px', letterSpacing: '2px' }}
                    >
                      Sign Out
                    </button>
                  ) : (
                    <>
                      <Link href="/auth/login" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                        <button className="btn-secondary" style={{ width: '100%', padding: '12px', fontSize: '10px', letterSpacing: '2px' }}>
                          Sign In
                        </button>
                      </Link>
                      <Link href="/booking" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileMenuOpen(false)}>
                        <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '10px', letterSpacing: '2px' }}>
                          Book Now
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;