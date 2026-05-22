#!/usr/bin/env node

/**
 * SEO Audit Script for Elite Barber Shop
 * Run with: node scripts/seo-audit.js
 */

const fs = require('fs');
const path = require('path');

class SEOAuditor {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
  }

  log(type, message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${type.toUpperCase()}: ${message}`;
    
    switch (type) {
      case 'error':
        this.issues.push(message);
        console.error(`❌ ${message}`);
        break;
      case 'warning':
        this.warnings.push(message);
        console.warn(`⚠️  ${message}`);
        break;
      case 'success':
        this.successes.push(message);
        console.log(`✅ ${message}`);
        break;
      default:
        console.log(`ℹ️  ${message}`);
    }
  }

  checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
      this.log('success', `${description} exists: ${filePath}`);
      return true;
    } else {
      this.log('error', `${description} missing: ${filePath}`);
      return false;
    }
  }

  checkFileContent(filePath, searchString, description) {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(searchString)) {
        this.log('success', `${description} found in ${filePath}`);
        return true;
      } else {
        this.log('warning', `${description} not found in ${filePath}`);
        return false;
      }
    } else {
      this.log('error', `File not found: ${filePath}`);
      return false;
    }
  }

  auditSEOFiles() {
    console.log('\n🔍 Starting SEO Audit...\n');

    // Check essential SEO files
    this.checkFile('app/sitemap.ts', 'Sitemap generator');
    this.checkFile('app/robots.ts', 'Robots.txt generator');
    this.checkFile('public/site.webmanifest', 'Web app manifest');
    this.checkFile('app/lib/seo.ts', 'SEO utility functions');

    // Check favicon files
    this.checkFile('app/favicon.ico', 'Favicon');
    this.checkFile('public/browserconfig.xml', 'Browser config');

    // Check meta tags in layout
    this.checkFileContent('app/layout.tsx', 'openGraph', 'Open Graph meta tags');
    this.checkFileContent('app/layout.tsx', 'twitter', 'Twitter meta tags');
    this.checkFileContent('app/layout.tsx', 'application/ld+json', 'Structured data');

    // Check individual page metadata
    const pages = [
      'app/services/page.tsx',
      'app/gallery/page.tsx',
      'app/barbers/page.tsx',
      'app/booking/page.tsx',
      'app/contact/page.tsx',
      'app/about/page.tsx'
    ];

    pages.forEach(page => {
      this.checkFileContent(page, 'metadata', `SEO metadata in ${page}`);
    });

    // Check Next.js config optimizations
    this.checkFileContent('next.config.ts', 'images', 'Image optimization config');
    this.checkFileContent('next.config.ts', 'headers', 'Security headers config');
    this.checkFileContent('next.config.ts', 'compress', 'Compression config');
  }

  auditPerformance() {
    console.log('\n⚡ Auditing Performance Optimizations...\n');

    // Check performance components
    this.checkFile('app/components/ui/OptimizedImage.tsx', 'Optimized Image component');
    this.checkFile('app/components/ui/PerformanceMonitor.tsx', 'Performance Monitor component');

    // Check for performance best practices in layout
    this.checkFileContent('app/layout.tsx', 'preconnect', 'Font preconnect optimization');
    this.checkFileContent('app/layout.tsx', 'PerformanceMonitor', 'Performance monitoring');
  }

  auditAccessibility() {
    console.log('\n♿ Auditing Accessibility Features...\n');

    // Check for accessibility attributes in layout
    this.checkFileContent('app/layout.tsx', 'lang="en"', 'HTML lang attribute');
    
    // Check for semantic HTML and ARIA labels (basic check)
    const componentFiles = [
      'app/components/layout/Navbar.tsx',
      'app/components/layout/Footer.tsx'
    ];

    componentFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.checkFileContent(file, 'aria-', `ARIA attributes in ${file}`);
      }
    });
  }

  generateReport() {
    console.log('\n📊 SEO Audit Report\n');
    console.log('='.repeat(50));
    
    console.log(`\n✅ Successes: ${this.successes.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Issues: ${this.issues.length}`);

    if (this.issues.length > 0) {
      console.log('\n🚨 Critical Issues to Fix:');
      this.issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  Warnings to Consider:');
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning}`);
      });
    }

    const score = Math.round(
      (this.successes.length / (this.successes.length + this.warnings.length + this.issues.length)) * 100
    );

    console.log(`\n🎯 SEO Score: ${score}%`);
    
    if (score >= 90) {
      console.log('🎉 Excellent! Your SEO setup is outstanding.');
    } else if (score >= 75) {
      console.log('👍 Good SEO setup with room for improvement.');
    } else if (score >= 60) {
      console.log('⚠️  Fair SEO setup. Consider addressing the issues above.');
    } else {
      console.log('🚨 Poor SEO setup. Please address the critical issues.');
    }

    console.log('\n' + '='.repeat(50));
  }

  run() {
    this.auditSEOFiles();
    this.auditPerformance();
    this.auditAccessibility();
    this.generateReport();
  }
}

// Run the audit
const auditor = new SEOAuditor();
auditor.run();