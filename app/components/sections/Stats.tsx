'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Scissors, Star, Calendar, Trophy, ThumbsUp } from 'lucide-react';
import Link from 'next/link';

// Animated counter hook
function useCounter(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

interface StatItem {
  icon: React.ElementType;
  rawNumber: number;
  suffix: string;
  label: string;
  sublabel: string;
  color: string;
  gradient: string;
  bgGlow: string;
}

const StatCard = ({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) => {
  const count = useCounter(stat.rawNumber, 1500, inView);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      style={{
        background: '#0a0a0f',
        border: '1px solid rgba(255,255,255,0.04)',
        padding: '36px 28px',
        position: 'relative',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      {/* Top tiny line indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '30px',
        height: '2px',
        background: stat.color,
      }} />

      {/* Icon */}
      <div style={{
        width: '48px',
        height: '48px',
        border: `1px solid ${stat.color}25`,
        background: `${stat.color}06`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        <stat.icon size={20} color={stat.color} />
      </div>

      {/* Number */}
      <div style={{
        fontSize: 'clamp(2.2rem, 4vw, 3rem)',
        fontWeight: 900,
        lineHeight: 1,
        marginBottom: '10px',
        fontFamily: "'Playfair Display', serif",
        color: '#f5f0e8',
        letterSpacing: '-0.02em',
      }}>
        {stat.rawNumber === 49 ? '4.9' : count.toLocaleString()}{stat.suffix}
      </div>

      {/* Label */}
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: 'rgba(245,240,232,0.9)',
        marginBottom: '4px',
        fontFamily: 'Montserrat, sans-serif',
        letterSpacing: '1px',
      }}>
        {stat.label}
      </div>

      {/* Sublabel */}
      <div style={{
        fontSize: '11px',
        color: 'rgba(158,155,148,0.45)',
        fontFamily: 'Inter, sans-serif',
      }}>
        {stat.sublabel}
      </div>
    </motion.div>
  );
};

const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const stats: StatItem[] = [
    {
      icon: Users,
      rawNumber: 5000,
      suffix: '+',
      label: 'GENTLEMEN SERVED',
      sublabel: 'Satisfied repeat customers',
      color: '#c41e3a',
      gradient: 'linear-gradient(135deg, #c41e3a, #ff3b30)',
      bgGlow: 'rgba(196,30,58,0.2)',
    },
    {
      icon: Scissors,
      rawNumber: 150,
      suffix: '+',
      label: 'DAILY SESSIONS',
      sublabel: 'Masterful styles crafted daily',
      color: '#c9a84c',
      gradient: 'linear-gradient(135deg, #c9a84c, #eab308)',
      bgGlow: 'rgba(201,168,76,0.2)',
    },
    {
      icon: Star,
      rawNumber: 49,
      suffix: '',
      label: 'AVERAGE RATING',
      sublabel: 'Verified 5.0 star feedback',
      color: '#c41e3a',
      gradient: 'linear-gradient(135deg, #c41e3a, #ff3b30)',
      bgGlow: 'rgba(196,30,58,0.2)',
    },
  ];

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(80px, 12vh, 120px) 0',
        position: 'relative',
        background: '#050505',
        overflow: 'hidden',
      }}
    >
      {/* Background diagonal lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 100px)`,
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} inView={inView} />
          ))}
        </div>

        {/* Bottom banner strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            marginTop: '64px',
            padding: '48px 60px',
            background: '#0a0a0f',
            border: '1px solid rgba(255,255,255,0.05)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '32px',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: '#c41e3a' }} />

          <div>
            <div style={{
              fontSize: 'clamp(1.3rem, 3vw, 1.8rem)',
              fontWeight: 800,
              marginBottom: '8px',
              fontFamily: "'Playfair Display', serif",
              color: '#f5f0e8',
            }}>
              Ready to write your style chapter?
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(158,155,148,0.5)', fontFamily: 'Inter, sans-serif' }}>
              Join thousands of satisfied premium clients who trust us with their aesthetic identity.
            </div>
          </div>

          <Link href="/booking" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{
              padding: '14px 32px',
              fontSize: '10px',
              letterSpacing: '2.5px',
              whiteSpace: 'nowrap',
            }}>
              Schedule Roster →
            </button>
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          div[style*="marginTop: '64px'"] {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            padding: 36px 30px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;
