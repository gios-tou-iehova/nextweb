'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Michael Johnson",
      role: "Business Executive",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      text: "Best barbershop experience I've ever had. The absolute attention to detail is incredible, and the atmosphere is top-notch. My master barber constructed exactly what I envisioned."
    },
    {
      id: 2,
      name: "David Martinez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      text: "I've been coming here for 3 years now. The absolute consistency in quality and luxury treatment is completely unmatched. Every session feels like an exclusive retreat."
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Entrepreneur",
      image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      text: "From the moment you step through the door, you realize you're in premium hands. Professional, exceptionally skilled artists who care deeply about their legendary craft."
    },
    {
      id: 4,
      name: "Robert Chen",
      role: "Software Engineer",
      image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=200&h=200&fit=crop&crop=face",
      rating: 5,
      text: "The absolute best texture fade I have ever received. The barbers here are true visual artists. The booking system is flawless and the hospitality is immaculate."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 120px) 0',
      background: '#050505',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Subtle lines background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px)',
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
              ✦ Stories of Satisfaction ✦
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
            What Our Honorable <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Gentlemen Say.</span>
          </h2>

          <p style={{
            color: 'rgba(158,155,148,0.55)',
            maxWidth: '520px',
            fontSize: '14px',
            lineHeight: 1.75,
          }}>
            Read about the premium experiences enjoyed by Lagos' finest executives, creators, and entrepreneurs.
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div style={{ position: 'relative', maxWidth: '820px', margin: '0 auto 40px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                background: '#0a0a0f',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '54px 48px',
                position: 'relative',
              }}
            >
              {/* Quote Ornaments */}
              <div style={{ position: 'absolute', top: '30px', right: '40px', opacity: 0.08, color: '#c41e3a' }}>
                <Quote size={60} />
              </div>

              {/* Gold Stars */}
              <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                  <Star key={i} size={14} color="#c9a84c" fill="#c9a84c" />
                ))}
              </div>

              {/* Text */}
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(17px, 2.5vw, 22px)',
                lineHeight: 1.8,
                color: '#f5f0e8',
                marginBottom: '36px',
                fontStyle: 'italic',
                fontWeight: 500,
              }}>
                "{testimonials[activeIndex].text}"
              </p>

              {/* Client Profile Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <img
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  style={{
                    width: '52px',
                    height: '52px',
                    objectFit: 'cover',
                    border: '1px solid #c41e3a',
                  }}
                />
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', fontWeight: 700, color: '#f5f0e8', margin: 0 }}>
                    {testimonials[activeIndex].name}
                  </h4>
                  <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#c41e3a', marginTop: '4px', display: 'block' }}>
                    {testimonials[activeIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Selectors */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '64px' }}>
          {testimonials.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: '48px',
                height: '48px',
                padding: 0,
                border: activeIndex === idx ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.06)',
                background: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: activeIndex === idx ? 1 : 0.4,
              }}
            >
              <img src={t.image} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>

        {/* Bottom Banner Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2px',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.04)',
        }}>
          {[
            { v: "4.9 / 5", l: "AVERAGE RATING" },
            { v: "12,000+", l: "Besboke Services" },
            { v: "99.2%", l: "LOYALTY RATE" }
          ].map((item, idx) => (
            <div key={idx} style={{ background: '#050505', padding: '30px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 900, color: '#c41e3a', marginBottom: '6px' }}>{item.v}</div>
              <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(158,155,148,0.45)' }}>{item.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
