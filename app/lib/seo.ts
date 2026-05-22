import { Metadata } from 'next';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noIndex?: boolean;
}

const defaultSEO = {
  title: 'Elite Barber Shop - Premium Men\'s Grooming & Haircuts',
  description: 'Experience premium men\'s grooming at Elite Barber Shop. Expert barbers, modern cuts, classic shaves, and beard styling. Book your appointment today.',
  keywords: [
    'barber shop',
    'men\'s haircuts',
    'beard trimming',
    'hot towel shave',
    'fade haircut',
    'men\'s grooming',
    'barbershop near me',
    'professional barber'
  ],
  image: '/images/og-image.jpg',
  url: 'https://elitebarbershop.com',
  type: 'website' as const,
};

export function generateSEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const seoTitle = title ? `${title} | Elite Barber Shop` : defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoImage = image || defaultSEO.image;
  const seoUrl = url || defaultSEO.url;
  const seoKeywords = [...defaultSEO.keywords, ...keywords];

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: seoUrl,
      siteName: 'Elite Barber Shop',
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      locale: 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(author && { authors: [author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
      creator: '@elitebarbershop',
    },
    alternates: {
      canonical: seoUrl,
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
    };
  }

  return metadata;
}

// Page-specific SEO configurations
export const pageSEO = {
  home: generateSEO({
    title: 'Premium Men\'s Grooming & Haircuts',
    description: 'Experience the finest in men\'s grooming at Elite Barber Shop. Expert barbers, premium services, and unmatched attention to detail. Book your transformation today.',
    keywords: ['premium barbershop', 'men\'s grooming', 'haircut booking', 'professional barbers'],
  }),

  services: generateSEO({
    title: 'Barber Services - Haircuts, Shaves & Grooming',
    description: 'Discover our complete range of barbering services including modern haircuts, classic shaves, beard trimming, and premium grooming treatments.',
    keywords: ['barber services', 'haircut prices', 'shave services', 'grooming packages'],
    url: 'https://elitebarbershop.com/services',
  }),

  gallery: generateSEO({
    title: 'Gallery - Our Best Work & Transformations',
    description: 'View our portfolio of exceptional haircuts, beard styling, and grooming transformations. See why we\'re the premier barbershop choice.',
    keywords: ['barber portfolio', 'haircut gallery', 'before after', 'barber work'],
    url: 'https://elitebarbershop.com/gallery',
  }),

  barbers: generateSEO({
    title: 'Meet Our Expert Barbers & Master Stylists',
    description: 'Meet our team of skilled barbers and master stylists. Each brings years of experience and passion for the craft of men\'s grooming.',
    keywords: ['expert barbers', 'master stylists', 'barber team', 'professional staff'],
    url: 'https://elitebarbershop.com/barbers',
  }),

  booking: generateSEO({
    title: 'Book Appointment - Online Booking System',
    description: 'Book your barbershop appointment online. Choose your preferred barber, service, and time slot. Easy scheduling for premium grooming services.',
    keywords: ['book appointment', 'online booking', 'schedule haircut', 'barber appointment'],
    url: 'https://elitebarbershop.com/booking',
  }),

  contact: generateSEO({
    title: 'Contact Us - Location, Hours & Information',
    description: 'Get in touch with Elite Barber Shop. Find our location, hours, contact information, and directions. We\'re here to serve you.',
    keywords: ['contact barbershop', 'location hours', 'barber shop address', 'phone number'],
    url: 'https://elitebarbershop.com/contact',
  }),

  about: generateSEO({
    title: 'About Us - Our Story & Mission',
    description: 'Learn about Elite Barber Shop\'s story, mission, and commitment to excellence in men\'s grooming. Discover what makes us different.',
    keywords: ['about barbershop', 'our story', 'barber mission', 'company history'],
    url: 'https://elitebarbershop.com/about',
  }),
};

// Structured data generators
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Elite Barber Shop",
    "image": "https://elitebarbershop.com/images/logo.jpg",
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
    "url": "https://elitebarbershop.com",
    "openingHours": [
      "Mo-Fr 09:00-19:00",
      "Sa 09:00-18:00", 
      "Su 10:00-16:00"
    ],
    "priceRange": "$$",
    "acceptsReservations": true,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "2500"
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  price: string;
  duration: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "HairSalon",
      "name": "Elite Barber Shop"
    },
    "offers": {
      "@type": "Offer",
      "price": service.price,
      "priceCurrency": "USD"
    },
    "duration": `PT${service.duration}M`
  };
}