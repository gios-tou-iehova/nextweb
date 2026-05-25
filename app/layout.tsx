import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from './context/AuthContext';
import {Toaster} from 'react-hot-toast';
import PerformanceMonitor from './components/ui/PerformanceMonitor';
import CriticalCSS from './components/ui/CriticalCSS';
import ServiceWorkerRegistration from './components/ui/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: {
    default: 'David Pro Barber Hub - Premium Men\'s Grooming & Haircuts',
    template: '%s | David Pro Barber Hub'
  },
  description: 'Experience premium men\'s grooming at David Pro Barber Hub. Expert barbers, modern cuts, classic shaves, and beard styling. Book your appointment today for the ultimate barbershop experience.',
  keywords: [
    'barber shop',
    'men\'s haircuts',
    'beard trimming',
    'hot towel shave',
    'fade haircut',
    'men\'s grooming',
    'barbershop near me',
    'professional barber',
    'hair styling',
    'classic shave',
    'modern haircuts',
    'beard styling'
  ],
  authors: [{ name: 'David Pro Barber Hub', url: 'https://davidprobarberhub.com' }],
  creator: 'David Pro Barber Hub',
  publisher: 'David Pro Barber Hub',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://davidprobarberhub.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'David Pro Barber Hub - Premium Men\'s Grooming & Haircuts',
    description: 'Experience premium men\'s grooming at David Pro Barber Hub. Expert barbers, modern cuts, classic shaves, and beard styling.',
    url: 'https://davidprobarberhub.com',
    siteName: 'David Pro Barber Hub',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'David Pro Barber Hub - Premium Men\'s Grooming',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Pro Barber Hub - Premium Men\'s Grooming & Haircuts',
    description: 'Experience premium men\'s grooming at David Pro Barber Hub. Expert barbers, modern cuts, classic shaves, and beard styling.',
    images: ['/images/twitter-image.jpg'],
    creator: '@davidprobarberhub',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  category: 'business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
        {/* Viewport and theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#ff3b30" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Additional SEO meta tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="David Pro Barber Hub" />
        <meta name="geo.position" content="40.7128;-74.0060" />
        <meta name="ICBM" content="40.7128, -74.0060" />
        
        {/* Business information */}
        <meta name="business:contact_data:street_address" content="123 Main Street" />
        <meta name="business:contact_data:locality" content="New York" />
        <meta name="business:contact_data:region" content="NY" />
        <meta name="business:contact_data:postal_code" content="10001" />
        <meta name="business:contact_data:country_name" content="USA" />
        <meta name="business:contact_data:phone_number" content="+1-555-123-4567" />
        
        {/* Structured data for local business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HairSalon",
              "name": "David Pro Barber Hub",
              "image": "https://davidprobarberhub.com/images/logo.jpg",
              "description": "Premium men's grooming and barbershop services",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "123 Main Street",
                "addressLocality": "New York",
                "addressRegion": "NY",
                "postalCode": "10001",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 40.7128,
                "longitude": -74.0060
              },
              "telephone": "+1-555-123-4567",
              "url": "https://davidprobarberhub.com",
              "openingHours": [
                "Mo-Fr 09:00-19:00",
                "Sa 09:00-18:00",
                "Su 10:00-16:00"
              ],
              "priceRange": "$$",
              "servedCuisine": [],
              "hasMenu": "https://davidprobarberhub.com/services",
              "acceptsReservations": true,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "2500"
              }
            })
          }}
        />
      </head>
      <body className="layout-body">
        <CriticalCSS />
        <PerformanceMonitor />
        <ServiceWorkerRegistration />
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}