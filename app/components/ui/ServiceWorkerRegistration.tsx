'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register service worker in production
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator
    ) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      console.log('Registering service worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New content is available, show update notification
              showUpdateNotification();
            }
          });
        }
      });

      // Handle controller change (new SW activated)
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const showUpdateNotification = () => {
    // Create a simple update notification
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = `
      <div style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        background: #ff3b30;
        color: white;
        padding: 12px 20px;
        text-align: center;
        z-index: 10000;
        font-family: Inter, sans-serif;
        font-size: 14px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      ">
        <span>A new version is available!</span>
        <button 
          onclick="window.location.reload()" 
          style="
            background: white;
            color: #ff3b30;
            border: none;
            padding: 6px 12px;
            margin-left: 12px;
            border-radius: 4px;
            cursor: pointer;
            font-weight: 600;
          "
        >
          Update Now
        </button>
        <button 
          onclick="this.parentElement.parentElement.remove()" 
          style="
            background: transparent;
            color: white;
            border: 1px solid white;
            padding: 6px 12px;
            margin-left: 8px;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          Later
        </button>
      </div>
    `;
    
    document.body.appendChild(updateBanner);

    // Auto-hide after 10 seconds
    setTimeout(() => {
      if (updateBanner.parentElement) {
        updateBanner.remove();
      }
    }, 10000);
  };

  return null; // This component doesn't render anything
}