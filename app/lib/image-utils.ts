/**
 * Image optimization utilities for better performance and SEO
 */

// Generate optimized image URLs with proper sizing and format
export function getOptimizedImageUrl(
  src: string,
  width: number,
  height: number,
  quality: number = 85,
  format: 'webp' | 'avif' | 'jpg' = 'webp'
): string {
  // For Unsplash images, use their optimization parameters
  if (src.includes('unsplash.com')) {
    return `${src}&w=${width}&h=${height}&q=${quality}&fm=${format}&fit=crop&crop=face`;
  }
  
  // For other external images, return as-is (Next.js will optimize)
  return src;
}

// Generate blur placeholder for better UX
export function generateBlurDataURL(width: number, height: number): string {
  return `data:image/svg+xml;base64,${Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#2a2a2a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <circle cx="50%" cy="50%" r="20" fill="#ff3b30" opacity="0.1" />
    </svg>`
  ).toString('base64')}`;
}

// Generate responsive image sizes for different breakpoints
export function generateResponsiveSizes(
  mobile: number = 100,
  tablet: number = 50,
  desktop: number = 33
): string {
  return `(max-width: 640px) ${mobile}vw, (max-width: 1024px) ${tablet}vw, ${desktop}vw`;
}

// Image preload utility for critical images
export function preloadImage(src: string, priority: boolean = false): void {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = priority ? 'preload' : 'prefetch';
  link.as = 'image';
  link.href = src;
  
  if (priority) {
    link.fetchPriority = 'high';
  }
  
  document.head.appendChild(link);
}

// Lazy loading intersection observer for images
export function createImageObserver(callback: (entry: IntersectionObserverEntry) => void) {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null;
  }

  return new IntersectionObserver(
    (entries) => {
      entries.forEach(callback);
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.1,
    }
  );
}