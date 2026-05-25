'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, Scissors, Calendar, TrendingUp,
  Clock, CheckCircle, XCircle, ArrowUpRight
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0, totalBarbers: 0, totalServices: 0,
    totalAppointments: 0, totalRevenue: 0,
    pendingAppointments: 0, completedAppointments: 0, cancelledAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {} as Record<string, string>;

      const [usersRes, barbersRes, servicesRes, appointmentsRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/admin/users`, { headers }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/barbers`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/services`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://elitebarber.atwebpages.com/php-backend/api'}/appointments`, { headers }),
      ]);

      const [usersData, barbersData, servicesData, appointmentsData] = await Promise.all([
        usersRes.json(), barbersRes.json(), servicesRes.json(), appointmentsRes.json()
      ]);

      const users = usersData.data || [];
      const appointments = appointmentsData.data || [];
      const pending = appointments.filter((a: any) => a.status === 'pending' || a.status === 'scheduled').length;
      const completed = appointments.filter((a: any) => a.status === 'completed').length;
      const cancelled = appointments.filter((a: any) => a.status === 'cancelled').length;
      const revenue = appointments.reduce((s: number, a: any) => s + (parseFloat(a.total_price) || 0), 0);

      setStats({
        totalUsers: Array.isArray(users) ? users.filter((u: any) => u.role === 'customer').length : 0,
        totalBarbers: barbersData.data?.length || 0,
        totalServices: servicesData.data?.length || 0,
        totalAppointments: appointments.length,
        totalRevenue: revenue,
        pendingAppointments: pending,
        completedAppointments: completed,
        cancelledAppointments: cancelled,
      });
    } catch (err) {
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: 'Total Clients', value: stats.totalUsers,
      icon: Users, trend: '+12%', color: '#c41e3a', sub: 'Registered customers',
    },
    {
      label: 'Barbers', value: stats.totalBarbers,
      icon: Scissors, trend: '+2', color: '#c9a84c', sub: 'Active team members',
    },
    {
      label: 'Services', value: stats.totalServices,
      icon: Scissors, trend: 'Live', color: '#7c6af7', sub: 'Available services',
    },
    {
      label: 'Appointments', value: stats.totalAppointments,
      icon: Calendar, trend: 'Total', color: '#06b6d4', sub: 'All time bookings',
    },
    {
      label: 'Revenue', value: `₦${stats.totalRevenue.toLocaleString()}`,
      icon: TrendingUp, trend: '+18%', color: '#4ade80', sub: 'Total earnings',
    },
  ];

  const pieData = [
    { name: 'Pending', value: stats.pendingAppointments || 1, color: '#c9a84c' },
    { name: 'Completed', value: stats.completedAppointments || 1, color: '#4ade80' },
    { name: 'Cancelled', value: stats.cancelledAppointments || 1, color: '#c41e3a' },
  ];

  const weeklyData = [
    { day: 'Mon', count: 12 }, { day: 'Tue', count: 19 }, { day: 'Wed', count: 15 },
    { day: 'Thu', count: 22 }, { day: 'Fri', count: 28 }, { day: 'Sat', count: 35 }, { day: 'Sun', count: 18 },
  ];

  const tooltipStyle = {
    contentStyle: {
      background: '#111118', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '12px',
    },
    itemStyle: { color: '#f0ece4' },
    labelStyle: { color: 'rgba(158,155,148,0.7)', fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '1px' },
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh', flexDirection: 'column', gap: '20px' }}>
        <div style={{
          width: '40px', height: '40px',
          border: '2px solid rgba(196,30,58,0.2)',
          borderTopColor: '#c41e3a',
          borderRadius: '50%',
          animation: 'rotateSlow 0.8s linear infinite',
        }} />
        <div style={{
          fontFamily: 'Montserrat, sans-serif',
          fontSize: '10px', letterSpacing: '4px',
          textTransform: 'uppercase', color: 'rgba(158,155,148,0.4)',
        }}>Loading Console</div>
        <style>{`@keyframes rotateSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
          <div style={{ width: '24px', height: '1px', background: '#c41e3a' }} />
          <span style={{
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '10px', fontWeight: 700,
            letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a',
          }}>Command Center</span>
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 900, letterSpacing: '-0.03em',
          color: '#f5f0e8', marginBottom: '8px',
        }}>
          Admin <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Dashboard.</span>
        </h1>
        <p style={{ color: 'rgba(158,155,148,0.5)', fontSize: '13px', fontFamily: 'Inter, sans-serif' }}>
          Real-time overview of operations and performance metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px',
      }}>
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate="show"
            style={{
              background: '#111118',
              border: '1px solid rgba(255,255,255,0.05)',
              padding: '24px',
              position: 'relative',
              overflow: 'hidden',
              cursor: 'default',
              transition: 'border-color 0.2s, transform 0.2s',
            }}
            whileHover={{ y: -3, borderColor: 'rgba(196,30,58,0.25)' } as any}
          >
            {/* Top accent bar */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '1px',
              background: `linear-gradient(90deg, ${stat.color} 0%, transparent 80%)`,
            }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div style={{
                width: '40px', height: '40px',
                background: `rgba(${stat.color === '#c41e3a' ? '196,30,58' : stat.color === '#c9a84c' ? '201,168,76' : stat.color === '#7c6af7' ? '124,106,247' : stat.color === '#06b6d4' ? '6,182,212' : '74,222,128'}, 0.1)`,
                border: `1px solid rgba(${stat.color === '#c41e3a' ? '196,30,58' : stat.color === '#c9a84c' ? '201,168,76' : stat.color === '#7c6af7' ? '124,106,247' : stat.color === '#06b6d4' ? '6,182,212' : '74,222,128'}, 0.2)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <stat.icon size={18} color={stat.color} />
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                background: 'rgba(74,222,128,0.08)', padding: '3px 8px',
                border: '1px solid rgba(74,222,128,0.15)',
              }}>
                <ArrowUpRight size={10} color="#4ade80" />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif',
                  fontSize: '9px', fontWeight: 700,
                  letterSpacing: '1px', color: '#4ade80',
                }}>{stat.trend}</span>
              </div>
            </div>

            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              fontWeight: 800, color: '#f5f0e8',
              letterSpacing: '-0.02em', lineHeight: 1,
              marginBottom: '6px',
            }}>{stat.value}</div>
            <div style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: '10px', letterSpacing: '2px',
              textTransform: 'uppercase', color: 'rgba(158,155,148,0.5)',
            }}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          style={{
            background: '#111118',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '28px',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '16px', height: '1px', background: '#c41e3a' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a',
              }}>Weekly Analytics</span>
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: 700,
              color: '#f5f0e8', letterSpacing: '-0.01em',
            }}>Appointment Volume</h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyData} barSize={28}>
              <CartesianGrid strokeDasharray="1 4" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: 'rgba(158,155,148,0.5)', fontSize: 10, fontFamily: 'Montserrat, sans-serif', letterSpacing: '1px' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(158,155,148,0.4)', fontSize: 10, fontFamily: 'Montserrat, sans-serif' }} axisLine={false} tickLine={false} width={30} />
              <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
              <Bar dataKey="count" fill="#c41e3a" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            background: '#111118',
            border: '1px solid rgba(255,255,255,0.05)',
            padding: '28px',
          }}
        >
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '16px', height: '1px', background: '#c9a84c' }} />
              <span style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px', fontWeight: 700,
                letterSpacing: '3px', textTransform: 'uppercase', color: '#c9a84c',
              }}>Breakdown</span>
            </div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px', fontWeight: 700,
              color: '#f5f0e8', letterSpacing: '-0.01em',
            }}>Appointment Status</h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={48} outerRadius={72}
                  paddingAngle={3} dataKey="value" strokeWidth={0}>
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip {...tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {pieData.map((d) => (
                <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '8px', height: '8px', background: d.color, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(158,155,148,0.6)' }}>{d.name}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#f5f0e8', lineHeight: 1 }}>{d.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Status Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}
      >
        {[
          { icon: Clock, label: 'Pending', value: stats.pendingAppointments, color: '#c9a84c' },
          { icon: CheckCircle, label: 'Completed', value: stats.completedAppointments, color: '#4ade80' },
          { icon: XCircle, label: 'Cancelled', value: stats.cancelledAppointments, color: '#c41e3a' },
        ].map((item, i) => (
          <div key={i} style={{
            background: '#111118',
            border: '1px solid rgba(255,255,255,0.04)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}>
            <item.icon size={20} color={item.color} />
            <div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px', fontWeight: 800,
                color: '#f5f0e8', lineHeight: 1,
              }}>{item.value}</div>
              <div style={{
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '9px', letterSpacing: '2px',
                textTransform: 'uppercase', color: 'rgba(158,155,148,0.45)',
                marginTop: '4px',
              }}>{item.label}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}