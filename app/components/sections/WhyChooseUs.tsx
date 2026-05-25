'use client';

import { motion } from 'framer-motion';
import { Award, Clock, Shield, Sparkles, Users, Zap } from 'lucide-react';
import Link from 'next/link';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: "Award-Winning Service",
      description: "Recognized as the premier luxurious barbershop in Lagos for 3 consecutive years.",
      color: "#c41e3a"
    },
    {
      icon: Users,
      title: "Expert Craftsmanship",
      description: "15+ master barbers trained in david pro classic and modern precision styles.",
      color: "#c9a84c"
    },
    {
      icon: Sparkles,
      title: "Premium Products",
      description: "We use only the finest globally-sourced organic oils and hair formulas.",
      color: "#c41e3a"
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Effortless online appointments with custom timeframes to suit david pro rosters.",
      color: "#c9a84c"
    },
    {
      icon: Shield,
      title: "Strict Sanitation",
      description: "Absolute medical-grade sterilization of premium tools before every session.",
      color: "#c41e3a"
    },
    {
      icon: Zap,
      title: "Modern Innovations",
      description: "Contemporary fashion trends merged with iconic, timeless grooming art.",
      color: "#c9a84c"
    }
  ];

  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 120px) 0',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative luxury gradient spots */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(196,30,58,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '15%',
        right: '-5%',
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{ marginBottom: '64px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>
              ✦ The Distinction ✦
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-0.03em',
            color: '#f5f0e8',
            marginBottom: '16px',
          }}>
            Why David Pro Gentlemen <br />
            <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Choose Us.</span>
          </h2>

          <p style={{
            color: 'rgba(158,155,148,0.55)',
            maxWidth: '520px',
            fontSize: '14px',
            lineHeight: 1.75,
          }}>
            We do not just shave or style hair. We construct an experience of complete aesthetic elevation and pure bespoke relaxation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              viewport={{ once: true }}
              style={{
                background: '#0a0a0f',
                padding: '40px 32px',
                border: '1px solid rgba(255,255,255,0.04)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                cursor: 'default',
              }}
            >
              {/* Feature Accent Line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: '0%',
                background: feature.color,
                transition: 'height 0.3s ease',
              }} className="accent-bar" />

              {/* Icon Container */}
              <div style={{
                width: '56px',
                height: '56px',
                border: `1px solid ${feature.color}25`,
                background: `${feature.color}06`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '28px',
              }}>
                <feature.icon size={22} color={feature.color} />
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#f5f0e8',
                marginBottom: '12px',
                fontFamily: "'Playfair Display', serif",
              }}>
                {feature.title}
              </h3>

              <p style={{
                color: 'rgba(158,155,148,0.55)',
                fontSize: '13px',
                lineHeight: 1.7,
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            marginTop: '64px',
            textAlign: 'center',
          }}
        >
          <Link href="/booking" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{
              padding: '16px 44px',
              fontSize: '10px',
              letterSpacing: '3px',
            }}>
              Schedule Your Session →
            </button>
          </Link>
        </motion.div>
      </div>

      <style>{`
        div[style*="background: #0a0a0f"]:hover .accent-bar {
          height: 100% !important;
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
          section {
            padding: 80px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
