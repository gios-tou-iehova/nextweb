'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import Link from 'next/link';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const galleryImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=700&fit=crop&crop=face",
      category: "Haircuts",
      title: "Classic Fade"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&h=700&fit=crop&crop=face",
      category: "Beard",
      title: "Beard Sculpting"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=700&fit=crop&crop=face",
      category: "Styling",
      title: "Modern Style"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1622286346003-c8b4473cd8c8?w=600&h=700&fit=crop&crop=face",
      category: "Shave",
      title: "Hot Towel Shave"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&h=700&fit=crop&crop=face",
      category: "Haircuts",
      title: "Textured Cut"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=600&h=700&fit=crop&crop=face",
      category: "Styling",
      title: "Premium Styling"
    }
  ];

  return (
    <>
      <section style={{
        padding: '120px 0',
        background: '#0a0a0a',
        position: 'relative',
      }}>
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '70px' }}
          >
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,59,48,0.12)',
              padding: '6px 18px',
              borderRadius: '30px',
              marginBottom: '20px',
            }}>
              <span style={{ color: '#ff3b30', fontSize: '11px', letterSpacing: '2px', fontWeight: 600 }}>
                ✦ OUR WORK ✦
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              marginBottom: '16px',
            }}>
              Portfolio <span style={{ color: '#ff3b30' }}>Gallery</span>
            </h2>

            <div style={{
              width: '60px',
              height: '2px',
              background: '#ff3b30',
              margin: '0 auto 20px',
            }} />

            <p style={{
              color: '#a1a1aa',
              maxWidth: '600px',
              margin: '0 auto',
              fontSize: '15px',
              lineHeight: 1.6,
            }}>
              A showcase of our finest work. Every cut tells a story of precision and style.
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}>
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedImage(image.url)}
                style={{
                  position: 'relative',
                  aspectRatio: '4/5',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />

                {/* Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                }} className="gallery-overlay">
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '11px',
                        color: '#ff9d98',
                        letterSpacing: '1px',
                        marginBottom: '4px',
                      }}>
                        {image.category}
                      </div>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: 700,
                        fontFamily: "'Playfair Display', serif",
                      }}>
                        {image.title}
                      </div>
                    </div>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: '#ff3b30',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <ZoomIn size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              marginTop: '60px',
              textAlign: 'center',
            }}
          >
            <Link href="/gallery" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary" style={{
                padding: '14px 40px',
                fontSize: '13px',
                letterSpacing: '1px',
              }}>
                VIEW FULL GALLERY
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.95)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
              cursor: 'pointer',
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '30px',
                right: '30px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                zIndex: 10000,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#ff3b30'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
            >
              <X size={24} color="white" />
            </button>

            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedImage}
              alt="Gallery"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '90%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '20px',
                cursor: 'default',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        div:hover .gallery-overlay {
          opacity: 1 !important;
        }

        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))"] {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 20px !important;
          }
          
          section {
            padding: 80px 0 !important;
          }
        }

        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="padding: 24px"] {
            padding: 20px !important;
          }
        }

        @media (max-width: 480px) {
          button[style*="top: 30px"][style*="right: 30px"] {
            top: 20px !important;
            right: 20px !important;
            width: 40px !important;
            height: 40px !important;
          }
          
          div[style*="maxWidth: '90%'"] img {
            max-width: 95% !important;
          }
        }
      `}</style>
    </>
  );
};

export default Gallery;
