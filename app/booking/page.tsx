'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Scissors, ArrowRight, Check, ChevronLeft, ChevronRight, Star, Sparkles, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

interface Service {
  id: number;
  name: string;
  description: string;
  price: string;
  duration_minutes: number;
  category: string;
}

interface Barber {
  id: number;
  user_id: number;
  name: string;
  email: string;
  phone: string;
  bio: string;
  specialties: string;
  rating: string;
}

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [services, setServices] = useState<Service[]>([]);
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const router = useRouter();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const getServiceImage = (serviceName: string) => {
    const images: Record<string, string> = {
      Haircut: "https://images.pexels.com/photos/3998421/pexels-photo-3998421.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      Fade:    "https://images.pexels.com/photos/3998422/pexels-photo-3998422.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      Beard:   "https://images.pexels.com/photos/2474311/pexels-photo-2474311.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      Shave:   "https://images.pexels.com/photos/3998440/pexels-photo-3998440.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      Combo:   "https://images.pexels.com/photos/4612438/pexels-photo-4612438.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      Premium: "https://images.pexels.com/photos/7697228/pexels-photo-7697228.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
      default: "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=500&h=600&fit=crop",
    };
    for (const [key, url] of Object.entries(images)) {
      if (serviceName.includes(key)) return url;
    }
    return images.default;
  };

  const getBarberImage = (_name: string, index: number) => {
    const images = [
      "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      "https://images.pexels.com/photos/7697228/pexels-photo-7697228.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      "https://images.pexels.com/photos/4612438/pexels-photo-4612438.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      "https://images.pexels.com/photos/3998426/pexels-photo-3998426.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
      "https://images.pexels.com/photos/1805600/pexels-photo-1805600.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop",
    ];
    return images[index % images.length];
  };

  useEffect(() => {
    fetchServices();
    fetchBarbers();
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setCustomerName(userData.name || '');
      setCustomerEmail(userData.email || '');
      setCustomerPhone(userData.phone || '');
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${'/api/proxy'}/services`);
      const data = await response.json();
      if (data.status === 'success') {
        setServices(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchBarbers = async () => {
    try {
      const response = await fetch(`${'/api/proxy'}/barbers`);
      const data = await response.json();
      if (data.status === 'success') {
        setBarbers(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedBarber || !selectedDate || !selectedTime) {
      toast.error('Please complete all steps');
      return;
    }

    if (!isLoggedIn && (!customerName || !customerEmail || !customerPhone)) {
      toast.error('Please fill in your details');
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    let customerId = null;

    if (token && user) {
      const userData = JSON.parse(user);
      customerId = userData.id;
    }

    // Parse price as number correctly
    const priceAmount = parseFloat(selectedService.price);
    
    const bookingData = {
      customer_id: customerId,
      barber_id: selectedBarber.user_id,
      service_id: selectedService.id,
      appointment_date: selectedDate,
      appointment_time: selectedTime + ':00',
      notes: notes,
      customer_name: !customerId ? customerName : undefined,
      customer_email: !customerId ? customerEmail : undefined,
      customer_phone: !customerId ? customerPhone : undefined,
    };

    try {
      const response = await fetch(`${'/api/proxy'}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        toast.success('Appointment booked successfully!');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } else {
        toast.error(data.message || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Helper function to format price
  const formatPrice = (price: string | number) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return numPrice.toLocaleString('en-NG');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', paddingTop: '120px', paddingBottom: '100px', position: 'relative' }}>
      <Toaster position="top-right" toastOptions={{
        style: { background: '#111118', color: '#f0ece4', border: '1px solid rgba(196,30,58,0.3)', borderRadius: '2px', fontFamily: 'Inter, sans-serif', fontSize: '13px' },
      }} />
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `repeating-linear-gradient(-45deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 60px)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '60px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', background: '#c41e3a' }} />
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', color: '#c41e3a' }}>Book Your Experience</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f5f0e8', marginBottom: '12px' }}>
            Schedule Your <span style={{ fontStyle: 'italic', color: '#c41e3a' }}>Appointment.</span>
          </h1>
          <p style={{ color: 'rgba(158,155,148,0.6)', fontSize: '14px', maxWidth: '480px' }}>Choose from our premium services and master barbers — crafted excellence awaits.</p>
        </motion.div>

        {/* Step indicators */}
        <div style={{ display: 'flex', gap: '0', marginBottom: '56px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          {['Select Service', 'Choose Barber', 'Date & Time', 'Confirm'].map((label, index) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 24px',
              borderBottom: step === index + 1 ? '2px solid #c41e3a' : '2px solid transparent',
              marginBottom: '-1px',
              opacity: step < index + 1 ? 0.4 : 1,
              transition: 'all 0.25s',
            }}>
              <div style={{
                width: '22px', height: '22px',
                background: step > index ? '#c41e3a' : step === index + 1 ? 'transparent' : 'transparent',
                border: step > index ? 'none' : step === index + 1 ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700,
                color: step > index ? 'white' : step === index + 1 ? '#c41e3a' : 'rgba(158,155,148,0.5)',
                flexShrink: 0,
              }}>{step > index ? '✓' : index + 1}</div>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: step === index + 1 ? '#f5f0e8' : 'rgba(158,155,148,0.5)', whiteSpace: 'nowrap' }}>{label}</span>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`step-${step}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
            {/* STEP 1: SELECT SERVICE */}
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '30px', color: 'white', fontFamily: "'Playfair Display', serif" }}>
                  Choose Your <span style={{ color: '#ff3b30' }}>Service</span>
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '24px',
                }}>
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      onMouseEnter={() => setHoveredService(service.id)}
                      onMouseLeave={() => setHoveredService(null)}
                      onClick={() => setSelectedService(service)}
                      style={{
                        background: selectedService?.id === service.id ? 'rgba(196,30,58,0.08)' : '#0a0a0f',
                        border: selectedService?.id === service.id ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.05)',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'all 0.25s',
                        position: 'relative',
                      }}
                    >
                      <div style={{
                        position: 'relative',
                        height: '220px',
                        overflow: 'hidden',
                      }}>
                        <img
                          src={getServiceImage(service.name)}
                          alt={service.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease',
                            transform: hoveredService === service.id ? 'scale(1.08)' : 'scale(1)',
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: '100px',
                          background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                        }} />
                        <div style={{
                          position: 'absolute',
                          top: '15px',
                          right: '15px',
                          background: 'rgba(0,0,0,0.6)',
                          backdropFilter: 'blur(10px)',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px',
                        }}>
                          🕐 {service.duration_minutes} min
                        </div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        <h3 style={{
                          fontSize: '20px',
                          fontWeight: 700,
                          marginBottom: '8px',
                          fontFamily: "'Playfair Display', serif",
                        }}>
                          {service.name}
                        </h3>
                        <p style={{
                          fontSize: '13px',
                          color: '#a1a1aa',
                          lineHeight: 1.5,
                          marginBottom: '16px',
                        }}>
                          {service.description || 'Premium grooming experience with attention to detail.'}
                        </p>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                          <span style={{
                            fontSize: '24px',
                            fontWeight: 800,
                            color: '#ff3b30',
                          }}>
                            ₦{formatPrice(service.price)}
                          </span>
                          {selectedService?.id === service.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              style={{
                                width: '28px',
                                height: '28px',
                                background: '#ff3b30',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Check size={16} color="white" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <button onClick={nextStep} disabled={!selectedService} className="btn-primary" style={{ marginTop: '40px', width: '100%', padding: '16px', fontSize: '11px', letterSpacing: '3px', opacity: !selectedService ? 0.4 : 1, cursor: !selectedService ? 'not-allowed' : 'pointer' }}>
                  Continue to Barber →
                </button>
              </div>
            )}

            {/* STEP 2: SELECT BARBER */}
            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '30px', color: 'white', fontFamily: "'Playfair Display', serif" }}>
                  Meet Your <span style={{ color: '#ff3b30' }}>Master Barber</span>
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '24px',
                }}>
                  {barbers.map((barber, index) => (
                    <motion.div
                      key={barber.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => setSelectedBarber(barber)}
                      style={{
                        background: selectedBarber?.id === barber.id ? 'rgba(196,30,58,0.08)' : '#0a0a0f',
                        border: selectedBarber?.id === barber.id ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.05)',
                        overflow: 'hidden', cursor: 'pointer', transition: 'all 0.25s',
                      }}
                    >
                      <div style={{ display: 'flex', padding: '20px', gap: '16px' }}>
                        <div style={{
                          width: '80px',
                          height: '80px',
                          borderRadius: '50%',
                          overflow: 'hidden',
                          background: '#ff3b30',
                        }}>
                          <img
                            src={getBarberImage(barber.name, index)}
                            alt={barber.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{barber.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Star size={12} color="#ff3b30" fill="#ff3b30" />
                              <span style={{ fontSize: '12px', color: '#a1a1aa' }}>{barber.rating || '4.9'}</span>
                            </div>
                          </div>
                          <p style={{ fontSize: '11px', color: '#ff3b30', letterSpacing: '1px', marginBottom: '8px' }}>
                            MASTER BARBER
                          </p>
                          <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.4 }}>
                            {barber.specialties?.split(',')[0]} • {barber.specialties?.split(',')[1]}
                          </p>
                        </div>
                      </div>
                      {selectedBarber?.id === barber.id && (
                        <div style={{
                          height: '3px',
                          background: '#ff3b30',
                          width: '100%',
                        }} />
                      )}
                    </motion.div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '40px' }}>
                  <button onClick={prevStep} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '11px', letterSpacing: '2px' }}>← Back</button>
                  <button onClick={nextStep} disabled={!selectedBarber} className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: '11px', letterSpacing: '3px', opacity: !selectedBarber ? 0.4 : 1 }}>
                    Select Date & Time →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DATE & TIME */}
            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '30px', color: 'white', fontFamily: "'Playfair Display', serif" }}>
                  Select <span style={{ color: '#ff3b30' }}>Date & Time</span>
                </h2>
                
                <div style={{ background: '#0a0a0f', border: '1px solid rgba(255,255,255,0.05)', padding: '32px' }}>
                  <div style={{ marginBottom: '30px' }}>
                    <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '20px' }}>Choose a Date</div>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      overflowX: 'auto',
                      paddingBottom: '16px',
                      flexWrap: 'wrap',
                    }}>
                      {getAvailableDates().map((date) => (
                        <motion.button
                          key={date}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDate(date)}
                          style={{
                            padding: '10px 18px',
                            background: selectedDate === date ? '#c41e3a' : 'transparent',
                            border: selectedDate === date ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.08)',
                            color: selectedDate === date ? 'white' : 'rgba(158,155,148,0.6)',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '12px',
                          }}
                        >
                          {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div>
                      <div style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#c41e3a', marginBottom: '20px', marginTop: '28px' }}>Choose a Time</div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                        gap: '12px',
                      }}>
                        {timeSlots.map((time) => (
                          <motion.button
                            key={time}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedTime(time)}
                            style={{
                              padding: '10px',
                              background: selectedTime === time ? '#c41e3a' : 'transparent',
                              border: selectedTime === time ? '1px solid #c41e3a' : '1px solid rgba(255,255,255,0.07)',
                              color: selectedTime === time ? 'white' : 'rgba(158,155,148,0.6)',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              textAlign: 'center',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '12px',
                            }}
                          >
                            {time}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
                  <button onClick={prevStep} className="btn-secondary" style={{ padding: '14px 28px', fontSize: '11px', letterSpacing: '2px' }}>← Back</button>
                  <button onClick={nextStep} disabled={!selectedDate || !selectedTime} className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: '11px', letterSpacing: '3px', opacity: (!selectedDate || !selectedTime) ? 0.4 : 1 }}>Confirm Selection →</button>
                </div>
              </div>
            )}

            {/* STEP 4: CONFIRMATION */}
            {step === 4 && selectedService && selectedBarber && (
              <div>
                <h2 style={{ fontSize: '28px', marginBottom: '30px', color: 'white', fontFamily: "'Playfair Display', serif" }}>
                  Confirm Your <span style={{ color: '#ff3b30' }}>Booking</span>
                </h2>
                
                <div style={{
                  background: '#14141e',
                  borderRadius: '24px',
                  padding: 'clamp(20px, 4vw, 40px)',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px',
                  }}>
                    <div style={{ background: '#1a1a2e', padding: '16px', borderRadius: '16px' }}>
                      <Scissors size={20} color="#ff3b30" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '1px' }}>SERVICE</p>
                      <p style={{ fontWeight: 600 }}>{selectedService.name}</p>
                    </div>
                    <div style={{ background: '#1a1a2e', padding: '16px', borderRadius: '16px' }}>
                      <User size={20} color="#ff3b30" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '1px' }}>BARBER</p>
                      <p style={{ fontWeight: 600 }}>{selectedBarber.name}</p>
                    </div>
                    <div style={{ background: '#1a1a2e', padding: '16px', borderRadius: '16px' }}>
                      <Calendar size={20} color="#ff3b30" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '1px' }}>DATE</p>
                      <p style={{ fontWeight: 600 }}>{new Date(selectedDate).toLocaleDateString()}</p>
                    </div>
                    <div style={{ background: '#1a1a2e', padding: '16px', borderRadius: '16px' }}>
                      <Clock size={20} color="#ff3b30" style={{ marginBottom: '8px' }} />
                      <p style={{ fontSize: '11px', color: '#a1a1aa', letterSpacing: '1px' }}>TIME</p>
                      <p style={{ fontWeight: 600 }}>{selectedTime}</p>
                    </div>
                  </div>

                  {!isLoggedIn && (
                    <div style={{ marginBottom: '20px' }}>
                      <h3 style={{ fontSize: '14px', color: '#ff3b30', marginBottom: '16px', letterSpacing: '2px' }}>YOUR DETAILS</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          style={{
                            padding: '14px',
                            background: '#1a1a2e',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            color: 'white',
                          }}
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          style={{
                            padding: '14px',
                            background: '#1a1a2e',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            color: 'white',
                          }}
                        />
                        <input
                          type="tel"
                          placeholder="Phone"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          style={{
                            padding: '14px',
                            background: '#1a1a2e',
                            border: '1px solid rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            color: 'white',
                            gridColumn: 'span 2',
                          }}
                        />
                      </div>
                    </div>
                  )}

                  <textarea
                    placeholder="Additional notes (special requests, etc.)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#1a1a2e',
                      border: '1px solid rgba(255,255,255,0.05)',
                      borderRadius: '12px',
                      color: 'white',
                      minHeight: '80px',
                      marginBottom: '20px',
                      resize: 'vertical',
                    }}
                  />

                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'20px', borderTop:'1px solid rgba(255,255,255,0.05)', marginTop:'8px' }}>
                    <div><div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'3px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)',marginBottom:'4px'}}>Total Amount</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:900,color:'#c41e3a',letterSpacing:'-0.02em'}}>₦{formatPrice(selectedService.price)}</div></div>
                    <div style={{fontFamily:'Montserrat,sans-serif',fontSize:'9px',letterSpacing:'2px',textTransform:'uppercase',color:'rgba(158,155,148,0.4)'}}>{selectedService.duration_minutes} min session</div>
                  </div>
                </div>

                <div style={{ display:'flex', gap:'12px', marginTop:'32px' }}>
                  <button onClick={prevStep} className="btn-secondary" style={{ padding:'14px 28px', fontSize:'11px', letterSpacing:'2px' }}>← Back</button>
                  <button onClick={handleBooking} disabled={loading || (!isLoggedIn && (!customerName || !customerEmail || !customerPhone))} className="btn-primary" style={{ flex:1, padding:'14px', fontSize:'11px', letterSpacing:'3px' }}>
                    {loading ? 'Processing...' : 'Confirm Booking →'}
                  </button>
                </div>
              </div>
            )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BookingPage;