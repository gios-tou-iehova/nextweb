'use client';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Barbers from '../components/sections/Barbers';

export default function BarbersPage() {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#0a0a0a' }}>
        <Barbers />
      </div>
      <Footer />
    </>
  );
}
