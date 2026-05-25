'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Navigation } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
    toast.success("Message received. We'll respond shortly.");
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '123 Barber Street, Lagos, Nigeria', color: '#c41e3a' },
    { icon: Phone, label: 'Phone', value: '+234 801 234 5678', color: '#c9a84c' },
    { icon: Mail, label: 'Email', value: 'info@davidprobarberhub.com', color: '#7c6af7' },
    { icon: Clock, label: 'Hours', value: 'Mon–Sat 9am–8pm · Sun 12pm–6pm', color: '#06b6d4' },
  ];

  return (
    <>
      <Navbar />
      <div style={{ background: '#050505', minHeight: '100vh' }}>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#111118', color: '#f0ece4',
            border: '1px solid rgba(196,30,58,0.3)',
            borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '13px',
          },
        }} />

        {/* ── HERO HEADER ───────────────────────────────────── */}
        <section style={{
          paddingTop: '140px',
          paddingBottom: '80px',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}>
          {/* Background texture */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `repeating-linear-gradient(
              90deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 80px
            )`,
          }} />
          <div style={{
            position: 'absolute', top: '-60px', right: '10%',
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(120px, 20vw, 220px)',
            fontWeight: 900, color: 'rgba(196,30,58,0.03)',
            letterSpacing: '-0.05em', pointerEvents: 'none', lineHeight: 1,
          }}>TALK</div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
                <span style={{
                  fontFamily: 'Montserrat, sans-serif', fontSize: '10px',
                  fontWeight: 700, letterSpacing: '4px',
                  textTransform: 'uppercase', color: '#c41e3a',
                }}>Get In Touch</span>
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900, letterSpacing: '-0.03em',
                color: '#f5f0e8', lineHeight: '1.05',
                marginBottom: '20px',
              }}>
                Let's Start a<br />
                <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Conversation.</span>
              </h1>
              <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '15px', maxWidth: '500px', lineHeight: 1.7 }}>
                Have a question, suggestion, or just want to book your next appointment? We're here and ready to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── INFO CARDS ─────────────────────────────────────── */}
        <section style={{ padding: '80px 0' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1px',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.04)',
              marginBottom: '80px',
            }}>
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{
                    padding: '40px 32px',
                    background: '#0a0a0f',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'background 0.25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#111118')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#0a0a0f')}
                >
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    height: '1px',
                    background: `linear-gradient(90deg, ${info.color}, transparent)`,
                  }} />
                  <info.icon size={22} color={info.color} style={{ marginBottom: '20px' }} />
                  <div style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '9px', letterSpacing: '3px',
                    textTransform: 'uppercase', color: info.color,
                    marginBottom: '8px',
                  }}>{info.label}</div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '13px', color: '#f0ece4', lineHeight: 1.5,
                  }}>{info.value}</div>
                </motion.div>
              ))}
            </div>

            {/* ── FORM + MAP ────────────────────────────────── */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '40px',
            }}>
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ width: '24px', height: '1px', background: '#c41e3a' }} />
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a',
                  }}>Send Message</span>
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800, letterSpacing: '-0.02em',
                  color: '#f5f0e8', marginBottom: '32px',
                }}>
                  Write to <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Us.</span>
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '40px',
                      border: '1px solid rgba(74,222,128,0.2)',
                      borderLeft: '3px solid #4ade80',
                      background: 'rgba(74,222,128,0.04)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'center',
                    }}
                  >
                    <CheckCircle size={40} color="#4ade80" />
                    <div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#f5f0e8', marginBottom: '8px' }}>Message Sent.</h3>
                      <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '13px' }}>We'll respond within 24 hours.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label className="form-label">Full Name</label>
                        <input className="form-input" type="text" value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="form-label">Phone</label>
                        <input className="form-input" type="tel" value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+234 800 000 0000" />
                      </div>
                    </div>
                    <div>
                      <label className="form-label">Email Address</label>
                      <input className="form-input" type="email" value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required placeholder="your@email.com" />
                    </div>
                    <div>
                      <label className="form-label">Subject</label>
                      <input className="form-input" type="text" value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required placeholder="What is this regarding?" />
                    </div>
                    <div>
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-input"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required rows={5}
                        placeholder="Tell us how we can help..."
                        style={{ resize: 'vertical', minHeight: '120px' }}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary"
                      style={{
                        width: '100%', padding: '16px',
                        fontSize: '11px', letterSpacing: '3px',
                        opacity: isSubmitting ? 0.7 : 1,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      }}
                    >
                      {isSubmitting ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center' }}>
                          <span style={{
                            width: '14px', height: '14px',
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: 'white', borderRadius: '50%',
                            animation: 'rotateSlow 0.8s linear infinite',
                            display: 'inline-block',
                          }} />
                          Sending...
                        </span>
                      ) : (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                          Send Message <Send size={14} />
                        </span>
                      )}
                    </button>
                  </form>
                )}
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <div style={{ width: '24px', height: '1px', background: '#c9a84c' }} />
                  <span style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontSize: '10px', fontWeight: 700,
                    letterSpacing: '4px', textTransform: 'uppercase', color: '#c9a84c',
                  }}>Our Location</span>
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 800, letterSpacing: '-0.02em',
                  color: '#f5f0e8', marginBottom: '32px',
                }}>
                  Find <span style={{ fontStyle: 'italic', color: '#c9a84c' }}>Us.</span>
                </h2>

                <div style={{
                  border: '1px solid rgba(255,255,255,0.05)',
                  overflow: 'hidden',
                  marginBottom: '20px',
                  filter: 'grayscale(0.6) contrast(1.1)',
                }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.527381645278475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                    width="100%"
                    height="320"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '20px 24px',
                  background: '#111118',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(196,30,58,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Navigation size={16} color="#c41e3a" />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#f5f0e8', marginBottom: '3px' }}>
                      123 Barber Street
                    </div>
                    <div style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: '10px', letterSpacing: '2px',
                      textTransform: 'uppercase', color: 'rgba(158,155,148,0.5)',
                    }}>Lagos, Nigeria</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
      <style>{`@keyframes rotateSlow { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>
    </>
  );
}