'use client';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Stats from './components/sections/Stats';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Services from './components/sections/Services';
import Barbers from './components/sections/Barbers';
import Gallery from './components/sections/Gallery';
import Testimonials from './components/sections/Testimonials';
import FAQ from './components/sections/FAQ';
import Newsletter from './components/sections/Newsletter';
import FloatingBooking from './components/FloatingBooking';
import './globals.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <WhyChooseUs />
      <Services />
      <Barbers />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
      <FloatingBooking />
    </>
  );
}