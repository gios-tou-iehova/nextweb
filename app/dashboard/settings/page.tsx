'use client';

import Navbar from '../../components/layout/Navbar';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="container">
          <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '20px' }}>Settings</h1>
          <p style={{ color: '#a1a1aa' }}>Settings page coming soon...</p>
        </div>
      </div>
    </>
  );
}