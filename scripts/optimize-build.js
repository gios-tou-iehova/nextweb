#!/usr/bin/env node

/**
 * Build Optimization Script for Elite Barber Shop
 * Runs additional optimizations after Next.js build
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class BuildOptimizer {
  constructor() {
    this.buildDir = '.next';
    this.publicDir = 'public';
    this.optimizations = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    const prefix = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    console.log(`${prefix} [${timestamp}] ${message}`);
  }

  // Analyze bundle sizes
  analyzeBundles() {
    this.log('Analyzing bundle sizes...');
    
    try {
      const buildManifest = path.join(this.buildDir, 'build-manifest.json');
      if (fs.existsSync(buildManifest)) {
        const manifest = JSON.parse(fs.readFileSync(buildManifest, 'utf8'));
        
        // Calculate total bundle size
        let totalSize = 0;
        const bundleInfo = {};
        
        Object.entries(manifest.pages).forEach(([page, files]) => {
          let pageSize = 0;
          files.forEach(file => {
            const filePath = path.join(this.buildDir, 'static', file);
            if (fs.existsSync(filePath)) {
              const stats = fs.statSync(filePath);
              pageSize += stats.size;
              totalSize += stats.size;
            }
          });
          bundleInfo[page] = Math.round(pageSize / 1024); // KB
        });

        this.log(`Total bundle size: ${Math.round(totalSize / 1024)} KB`);
        
        // Log largest bundles
        const sortedPages = Object.entries(bundleInfo)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5);
          
        this.log('Largest page bundles:');
        sortedPages.forEach(([page, size]) => {
          console.log(`  ${page}: ${size} KB`);
        });

        this.optimizations.push(`Bundle analysis completed - Total: ${Math.round(totalSize / 1024)} KB`);
      }
    } catch (error) {
      this.log(`Bundle analysis failed: ${error.message}`, 'error');
    }
  }

  // Optimize images in public directory
  optimizeImages() {
    this.log('Checking image optimization opportunities...');
    
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    const imageFiles = [];
    
    const scanDirectory = (dir) => {
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          scanDirectory(filePath);
        } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
          const size = Math.round(stat.size / 1024); // KB
          imageFiles.push({ path: filePath, size });
        }
      });
    };

    if (fs.existsSync(this.publicDir)) {
      scanDirectory(this.publicDir);
      
      const totalImageSize = imageFiles.reduce((sum, img) => sum + img.size, 0);
      this.log(`Found ${imageFiles.length} images, total size: ${totalImageSize} KB`);
      
      // Identify large images
      const largeImages = imageFiles.filter(img => img.size > 500); // > 500KB
      if (largeImages.length > 0) {
        this.log(`⚠️  Found ${largeImages.length} large images (>500KB):`);
        largeImages.forEach(img => {
          console.log(`  ${img.path}: ${img.size} KB`);
        });
        this.log('Consider optimizing these images for better performance');
      }

      this.optimizations.push(`Image scan completed - ${imageFiles.length} images, ${totalImageSize} KB total`);
    }
  }

  // Generate performance report
  generatePerformanceReport() {
    this.log('Generating performance report...');
    
    const report = {
      timestamp: new Date().toISOString(),
      optimizations: this.optimizations,
      recommendations: [
        'Enable gzip/brotli compression on your server',
        'Set up CDN for static assets',
        'Configure proper cache headers',
        'Monitor Core Web Vitals in production',
        'Run Lighthouse audits regularly',
        'Consider implementing resource hints (preload, prefetch)',
        'Optimize third-party scripts loading',
        'Use service worker for offline functionality'
      ],
      nextSteps: [
        'Deploy to production environment',
        'Submit sitemap to Google Search Console',
        'Set up Google Analytics 4',
        'Configure performance monitoring',
        'Test offline functionality',
        'Validate structured data with Google Rich Results Test'
      ]
    };

    const reportPath = 'performance-report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    this.log(`Performance report saved to ${reportPath}`, 'success');
  }

  // Check for common performance issues
  checkPerformanceIssues() {
    this.log('Checking for common performance issues...');
    
    const issues = [];
    
    // Check for large JavaScript files
    const staticDir = path.join(this.buildDir, 'static', 'chunks');
    if (fs.existsSync(staticDir)) {
      const files = fs.readdirSync(staticDir);
      files.forEach(file => {
        if (file.endsWith('.js')) {
          const filePath = path.join(staticDir, file);
          const stats = fs.statSync(filePath);
          const sizeKB = Math.round(stats.size / 1024);
          
          if (sizeKB > 250) { // > 250KB
            issues.push(`Large JavaScript file: ${file} (${sizeKB} KB)`);
          }
        }
      });
    }

    // Check for missing optimizations
    const nextConfig = 'next.config.ts';
    if (fs.existsSync(nextConfig)) {
      const config = fs.readFileSync(nextConfig, 'utf8');
      
      if (!config.includes('compress: true')) {
        issues.push('Compression not enabled in next.config.ts');
      }
      
      if (!config.includes('images:')) {
        issues.push('Image optimization not configured');
      }
    }

    if (issues.length > 0) {
      this.log('⚠️  Performance issues found:');
      issues.forEach(issue => console.log(`  - ${issue}`));
    } else {
      this.log('No major performance issues detected', 'success');
    }

    this.optimizations.push(`Performance check completed - ${issues.length} issues found`);
  }

  // Main optimization runner
  run() {
    console.log('\n🚀 Starting Build Optimization...\n');
    
    this.analyzeBundles();
    this.optimizeImages();
    this.checkPerformanceIssues();
    this.generatePerformanceReport();
    
    console.log('\n📊 Optimization Summary:');
    console.log('='.repeat(50));
    this.optimizations.forEach((opt, index) => {
      console.log(`${index + 1}. ${opt}`);
    });
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Review performance-report.json for detailed analysis');
    console.log('2. Run Lighthouse audit on deployed site');
    console.log('3. Monitor Core Web Vitals in production');
    console.log('4. Set up performance monitoring dashboard');
    
    console.log('\n✨ Build optimization completed!');
  }
}

// Run the optimizer
const optimizer = new BuildOptimizer();
optimizer.run();