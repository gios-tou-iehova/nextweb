'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Scissors, Users, Calendar,
  LogOut, Menu, X, ChevronRight, Settings
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('Administrator');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      router.push('/admin/login');
      return;
    }
    try {
      const userData = JSON.parse(storedUser);
      if (userData.role !== 'admin') {
        router.push('/');
        toast.error('Access denied');
      } else {
        setUserName(userData.first_name || userData.name || 'Admin');
      }
    } catch {
      router.push('/admin/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    toast.success('Signed out successfully');
    router.push('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Services', href: '/admin/services', icon: Scissors },
    { name: 'Barbers', href: '/admin/barbers', icon: Users },
    { name: 'Appointments', href: '/admin/appointments', icon: Calendar },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const sidebarW = sidebarOpen ? '260px' : '72px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#050505' }}>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: '#111118', color: '#f0ece4',
          border: '1px solid rgba(196,30,58,0.3)',
          borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '13px',
        },
      }} />

      {/* ── SIDEBAR ─────────────────────────────────────────── */}
      <div style={{
        width: sidebarW,
        background: '#0a0a0f',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        position: 'fixed',
        left: 0, top: 0, bottom: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}>
        {/* Sidebar top decorative line */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, #c41e3a 0%, rgba(196,30,58,0.2) 100%)',
        }} />

        {/* Logo area */}
        <div style={{
          padding: sidebarOpen ? '28px 24px' : '28px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          minHeight: '80px',
          transition: 'padding 0.3s',
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            border: '1px solid rgba(196,30,58,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c41e3a" strokeWidth="1.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          {sidebarOpen && (
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px', fontWeight: 700,
                color: '#f5f0e8', letterSpacing: '0.5px',
                whiteSpace: 'nowrap',
              }}>
                ELITE <span style={{ color: '#c41e3a' }}>BARBER</span>
              </div>
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px', letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(158,155,148,0.4)',
              }}>Admin Console</div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: sidebarOpen ? '12px 24px' : '12px 20px',
                  margin: '2px 0',
                  color: isActive ? '#f5f0e8' : 'rgba(158,155,148,0.5)',
                  textDecoration: 'none',
                  position: 'relative',
                  transition: 'all 0.2s',
                  background: isActive ? 'rgba(196,30,58,0.1)' : 'transparent',
                  borderRight: isActive ? '2px solid #c41e3a' : '2px solid transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#f5f0e8';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(158,155,148,0.5)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <item.icon
                  size={17}
                  color={isActive ? '#c41e3a' : 'currentColor'}
                  style={{ flexShrink: 0 }}
                />
                {sidebarOpen && (
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.name}
                  </span>
                )}
                {isActive && sidebarOpen && (
                  <ChevronRight size={14} color="#c41e3a" style={{ marginLeft: 'auto' }} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User / Logout at bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: sidebarOpen ? '20px 24px' : '20px',
        }}>
          {sidebarOpen && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px',
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}>
              <div style={{
                width: '32px', height: '32px',
                background: '#c41e3a',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Playfair Display', serif",
                fontSize: '14px', fontWeight: 700,
                color: 'white', flexShrink: 0,
              }}>
                {userName.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '12px', fontWeight: 600,
                  color: '#f5f0e8',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden', textOverflow: 'ellipsis',
                }}>{userName}</div>
                <div style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '9px', letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#c41e3a',
                }}>Administrator</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'rgba(158,155,148,0.5)',
              cursor: 'pointer',
              padding: sidebarOpen ? '10px 0' : '10px',
              transition: 'color 0.2s',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c41e3a'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.5)'}
          >
            <LogOut size={16} style={{ flexShrink: 0 }} />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────── */}
      <div style={{
        marginLeft: sidebarW,
        flex: 1,
        transition: 'margin-left 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        {/* Top bar */}
        <div style={{
          height: '64px',
          background: '#0a0a0f',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                background: 'none', border: 'none',
                color: 'rgba(158,155,148,0.6)',
                cursor: 'pointer', padding: '6px',
                display: 'flex', alignItems: 'center',
                transition: 'color 0.2s',
                borderRadius: '2px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#f5f0e8'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(158,155,148,0.6)'}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px', letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(158,155,148,0.35)',
              }}>Admin</span>
              <ChevronRight size={12} color="rgba(158,155,148,0.25)" />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px', letterSpacing: '3px',
                textTransform: 'uppercase',
                color: 'rgba(245,240,232,0.6)',
              }}>
                {menuItems.find(m => m.href === pathname)?.name || 'Console'}
              </span>
            </div>
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '9px', letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(158,155,148,0.3)',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <div style={{
                width: '5px', height: '5px',
                background: '#4ade80', borderRadius: '50%',
              }} />
              System Online
            </div>
          </div>
        </div>

        {/* Page content */}
        <div style={{ flex: 1, padding: 'clamp(24px, 4vw, 40px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
}