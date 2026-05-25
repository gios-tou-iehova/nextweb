'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const heroImages = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&h=1000&fit=crop&crop=face",
      title: "Modern Fade",
      shape: "polygon(0% 0%, 100% 0%, 100% 90%, 0% 100%)",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&h=1000&fit=crop&crop=face",
      title: "Beard Sculpting",
      shape: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1622286346003-c8b4473cd8c8?w=800&h=1000&fit=crop&crop=face",
      title: "Hot Towel Shave",
      shape: "polygon(0% 0%, 90% 0%, 100% 100%, 0% 90%)",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=1000&fit=crop&crop=face",
      title: "Royal Treatment",
      shape: "polygon(0% 5%, 100% 0%, 95% 100%, 5% 95%)",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&h=1000&fit=crop&crop=face",
      title: "Skin Fade",
      shape: "polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  useEffect(() => {
    const text = textRef.current;
    if (!text || !text.textContent) return;

    const letters = text.textContent.split('');
    text.innerHTML = '';
    
    letters.forEach((letter: string) => {
      const span = document.createElement('span');
      span.textContent = letter === ' ' ? '\u00A0' : letter;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(50px)';
      text.appendChild(span);
    });

    const spans = text.querySelectorAll('span');
    gsap.to(spans, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.015,
      ease: "power2.out",
      delay: 0.2,
    });

    gsap.fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, delay: 0.6, ease: "power3.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const nextImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const prevImage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <>
      <section ref={containerRef} style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#050505',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '80px',
      }}>
        
        {/* Premium Magazine Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 30% 40%, rgba(196,30,58,0.06) 0%, transparent 60%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 80px)
          `,
          pointerEvents: 'none',
        }} />

        {/* Large Background Number */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          fontSize: 'clamp(150px, 25vw, 350px)',
          fontWeight: 900,
          color: 'rgba(196,30,58,0.025)',
          fontFamily: "'Playfair Display', serif",
          pointerEvents: 'none',
          zIndex: 0,
          letterSpacing: '-0.05em',
        }}>
          01
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'center',
          }}>
            
            {/* LEFT COLUMN - TEXT CONTENT */}
            <div>
              {/* Magazine Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '28px',
                }}
              >
                <div style={{ width: '20px', height: '1px', background: '#c41e3a' }} />
                <span style={{ color: '#c41e3a', fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}>
                  ✦ THE CULTURE ISSUE ✦
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{
                  fontSize: 'clamp(2.8rem, 7vw, 4.8rem)',
                  fontWeight: 900,
                  lineHeight: '1.02',
                  marginBottom: '24px',
                  fontFamily: "'Playfair Display', serif",
                  letterSpacing: '-0.03em',
                  color: '#f5f0e8',
                }}
              >
                Where Style<br />
                <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Meets</span><br />
                Precision.
              </motion.h1>

              {/* Animated Description */}
              <div style={{ marginBottom: '36px' }}>
                <p ref={textRef} style={{
                  color: 'rgba(158,155,148,0.65)',
                  fontSize: '15px',
                  lineHeight: 1.8,
                  maxWidth: '460px',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  Experience the pinnacle of men's grooming in Nigeria. Where every cut is crafted as an art form and every client departs transformed.
                </p>
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{
                  display: 'flex',
                  gap: '14px',
                  flexWrap: 'wrap',
                  marginBottom: '48px',
                }}
              >
                <Link href="/booking" style={{ textDecoration: 'none' }}>
                  <button className="btn-primary" style={{
                    padding: '16px 36px',
                    fontSize: '11px',
                    letterSpacing: '3px',
                  }}>
                    Book Appointment →
                  </button>
                </Link>
                <Link href="/services" style={{ textDecoration: 'none' }}>
                  <button className="btn-secondary" style={{
                    padding: '16px 36px',
                    fontSize: '11px',
                    letterSpacing: '3px',
                  }}>
                    Explore Services
                  </button>
                </Link>
              </motion.div>

              {/* Stats with dividers */}
              <motion.div
                ref={statsRef}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'clamp(20px, 4vw, 40px)',
                  flexWrap: 'wrap',
                  paddingTop: '28px',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#c41e3a' }}>15+</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', color: 'rgba(158,155,148,0.4)', letterSpacing: '2px', fontWeight: 700 }}>MASTER BARBERS</div>
                </div>
                <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.06)' }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#c41e3a' }}>12K+</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', color: 'rgba(158,155,148,0.4)', letterSpacing: '2px', fontWeight: 700 }}>HAPPY CLIENTS</div>
                </div>
                <div style={{ width: '1px', height: '35px', background: 'rgba(255,255,255,0.06)' }} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 900, color: '#c9a84c' }}>25Y</div>
                  <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', color: 'rgba(158,155,148,0.4)', letterSpacing: '2px', fontWeight: 700 }}>OF EXCELLENCE</div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN - SLIDING IMAGES WITH SHAPES */}
            <div style={{ position: 'relative' }}>
              {/* Main Sliding Image Container */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '4/5',
              }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, clipPath: heroImages[currentImageIndex].shape, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1, clipPath: heroImages[currentImageIndex].shape }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      overflow: 'hidden',
                      background: '#0a0a0f',
                    }}
                  >
                    <img
                      src={heroImages[currentImageIndex].image}
                      alt={heroImages[currentImageIndex].title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)',
                    }} />

                    {/* Image Title on Slide */}
                    <div style={{
                      position: 'absolute',
                      bottom: '40px',
                      left: '40px',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '24px',
                      fontWeight: 700,
                      color: '#f5f0e8',
                      letterSpacing: '-0.01em',
                    }}>
                      {heroImages[currentImageIndex].title}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  style={{
                    position: 'absolute',
                    left: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(5,5,5,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c41e3a'; e.currentTarget.style.color = '#c41e3a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; }}
                >
                  <ChevronLeft size={20} color="white" />
                </button>
                
                <button
                  onClick={nextImage}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'rgba(5,5,5,0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 10,
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c41e3a'; e.currentTarget.style.color = '#c41e3a'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'white'; }}
                >
                  <ChevronRight size={20} color="white" />
                </button>
              </div>

              {/* Image Counter */}
              <div style={{
                position: 'absolute',
                bottom: '-20px',
                left: '20px',
                background: 'rgba(5,5,5,0.85)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '6px 14px',
                fontFamily: 'Montserrat, sans-serif',
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(245,240,232,0.6)',
                letterSpacing: '2px',
              }}>
                {String(currentImageIndex + 1).padStart(2, '0')} / {String(heroImages.length).padStart(2, '0')}
              </div>

              {/* Magazine Badge */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                background: '#c41e3a',
                borderRadius: '50%',
                width: 'clamp(55px, 9vw, 70px)',
                height: 'clamp(55px, 9vw, 70px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                zIndex: 5,
              }}>
                <div>
                  <Sparkles size={16} color="white" style={{ marginBottom: '2px', margin: '0 auto' }} />
                  <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '1px', color: 'white', fontFamily: 'Montserrat, sans-serif' }}>DAVID PRO</div>
                </div>
              </div>

              {/* Small decorative shapes */}
              <div style={{
                position: 'absolute',
                bottom: '20px',
                right: '30px',
                width: '60px',
                height: '60px',
                borderRight: '1px solid #c41e3a',
                borderBottom: '1px solid #c41e3a',
                zIndex: 1,
                opacity: 0.4,
              }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          color: 'rgba(158,155,148,0.4)',
          fontSize: '9px',
          letterSpacing: '3px',
          fontFamily: 'Montserrat, sans-serif',
        }}>
          <span>SCROLL</span>
          <div style={{ width: '18px', height: '28px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '5px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2px',
              height: '6px',
              background: '#c41e3a',
              borderRadius: '1px',
              animation: 'scrollAnim 2s ease-in-out infinite',
            }} />
          </div>
        </div>
      </section>

      {/* Keyframes for scroll animation */}
      <style>{`
        @keyframes scrollAnim {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(8px); opacity: 0.4; }
        }

        @media (max-width: 968px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 50px !important;
          }
          
          section {
            padding-top: 120px !important;
            padding-bottom: 60px !important;
          }
          
          section > div > div > div:first-child {
            text-align: center !important;
          }
          
          div[style*="display: flex"][style*="gap: clamp"] {
            justify-content: center !important;
          }
          
          div[style*="max-width: 460px"] {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          
          button[style*="padding: 16px 36px"] {
            width: 100% !important;
            max-width: 280px !important;
          }
          
          div[style*="display: flex"][style*="gap: 14px"] {
            justify-content: center !important;
          }
          
          /* Hide large background number on mobile */
          div[style*="fontSize: clamp(150px, 25vw, 350px)"] {
            display: none !important;
          }
        }

        @media (max-width: 640px) {
          .container {
            padding: 0 20px !important;
          }
          
          button[style*="position: absolute"][style*="width: 40px"] {
            width: 32px !important;
            height: 32px !important;
          }
          
          button[style*="position: absolute"][style*="width: 40px"] svg {
            width: 16px !important;
            height: 16px !important;
          }
          
          /* Adjust stats dividers on mobile */
          div[style*="width: 1px"][style*="height: 35px"] {
            display: none !important;
          }
          
          div[style*="display: flex"][style*="gap: clamp"] {
            gap: 20px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Hero;