'use client';

/**
 * Critical CSS component — injects above-the-fold styles as a plain <style> tag.
 * No styled-jsx or external CSS-in-JS needed.
 */
export default function CriticalCSS() {
  const css = `
    .layout-body {
      margin: 0;
      padding: 0;
      background: #050505;
      color: #ffffff;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .btn-primary {
      background: linear-gradient(135deg, #ff3b30, #ff6b63);
      border: none;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(255,59,48,0.3);
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(255,59,48,0.4);
    }
    .btn-secondary {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50px;
      color: white;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    .btn-secondary:hover {
      background: rgba(255,255,255,0.1);
      border-color: rgba(255,255,255,0.3);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    h1,h2,h3,h4,h5,h6 { margin: 0; font-weight: 700; line-height: 1.2; }
    p { margin: 0; }
    a { color: inherit; text-decoration: none; }
    img { max-width: 100%; height: auto; }
    .sr-only {
      position: absolute; width: 1px; height: 1px;
      padding: 0; margin: -1px; overflow: hidden;
      clip: rect(0,0,0,0); white-space: nowrap; border: 0;
    }
    *:focus { outline: 2px solid #ff3b30; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
    @media (max-width: 768px) {
      .container { padding: 0 16px; }
    }
  `;

  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}
