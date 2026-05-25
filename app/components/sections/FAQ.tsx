'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: "How do I secure an appointment?",
      answer: "You can easily schedule a slot through our online bespoke reservation system, or by calling our concierge desk directly. We advise booking in advance to secure your preferred master barber, especially for weekends."
    },
    {
      question: "What exclusive services do you offer?",
      answer: "We offer a comprehensive list of premium services including bespoke haircuts, precision beard sculpts, hot towel signature shaves, hair coloring, and david pro combination packages. Every service features premium organic products."
    },
    {
      question: "How long is a standard styling session?",
      answer: "A standard precision haircut session takes approximately 30-45 minutes. More elaborate styling or combinations (like premium cuts with signature beard sculpts) are allocated extra time to ensure flawless results."
    },
    {
      question: "Do you accept walk-in clients?",
      answer: "Yes, walk-ins are welcomed based on immediate barber availability. However, we highly suggest booking online to prevent waiting times and guarantee your custom time slot."
    },
    {
      question: "What is your cancellation framework?",
      answer: "We kindly request at least 24 hours notice for cancellations or modifications. This courtesy allows us to offer the slot to other gentlemen on our waiting roster."
    },
    {
      question: "Which payment methodologies are accepted?",
      answer: "We accept all major local and international debit cards, credit cards, bank transfers, cash, and digital mobile payment systems for your convenience."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{
      padding: 'clamp(80px, 12vh, 120px) 0',
      background: '#050505',
      position: 'relative',
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 'clamp(40px, 6vw, 80px)',
          alignItems: 'start',
        }}>
          {/* Left Column - Sticky Header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'sticky', top: '120px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>
                ✦ Help Center ✦
              </span>
            </div>

            <h2 style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              lineHeight: '1.05',
              color: '#f5f0e8',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Frequently Asked <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Questions.</span>
            </h2>

            <p style={{
              color: 'rgba(158,155,148,0.55)',
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}>
              Find instant details regarding our premier grooming catalogue, simplified booking channels, and shop principles.
            </p>

            <div style={{
              background: '#0a0a0f',
              padding: '30px',
              border: '1px solid rgba(255,255,255,0.05)',
              position: 'relative',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: '#c41e3a' }} />
              <p style={{
                fontSize: '13px',
                color: '#f5f0e8',
                marginBottom: '16px',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 700,
                letterSpacing: '1px',
              }}>
                STILL REQUIRE CONCIERGE ASSISTANCE?
              </p>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '9px',
                  letterSpacing: '2px',
                }}>
                  Contact Shop Desk →
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - FAQ Accordion Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.03)' }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                style={{
                  background: '#050505',
                  overflow: 'hidden',
                }}
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  style={{
                    width: '100%',
                    padding: '24px 28px',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left',
                    outline: 'none',
                  }}
                >
                  <span style={{
                    fontSize: '15px',
                    fontWeight: 700,
                    fontFamily: "'Playfair Display', serif",
                    color: openIndex === index ? '#c41e3a' : '#f5f0e8',
                    transition: 'color 0.2s ease',
                  }}>
                    {faq.question}
                  </span>

                  <div style={{
                    width: '28px',
                    height: '28px',
                    border: openIndex === index ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.06)',
                    background: openIndex === index ? 'rgba(196,30,58,0.05)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginLeft: '16px',
                    transition: 'all 0.2s ease',
                    color: openIndex === index ? '#c41e3a' : 'rgba(158,155,148,0.4)',
                  }}>
                    {openIndex === index ? (
                      <Minus size={12} />
                    ) : (
                      <Plus size={12} />
                    )}
                  </div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{
                        padding: '0 28px 24px 28px',
                        color: 'rgba(158,155,148,0.55)',
                        fontSize: '13px',
                        lineHeight: 1.7,
                        fontFamily: 'Inter, sans-serif',
                      }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          
          div[style*="position: sticky"] {
            position: static !important;
            margin-bottom: 40px;
          }
          
          section {
            padding: 80px 0 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
