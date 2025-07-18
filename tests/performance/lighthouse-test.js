const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');

/**
 * Performance test using Lighthouse to audit the built site
 */
async function runLighthouseAudit() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
    port: chrome.port,
  };

  // Test multiple pages
  const pagesToTest = [
    { url: 'http://localhost:4321/', name: 'homepage' },
    { url: 'http://localhost:4321/projects', name: 'projects' },
    { url: 'http://localhost:4321/blog', name: 'blog' },
    { url: 'http://localhost:4321/about', name: 'about' }
  ];

  const results = [];
  
  for (const page of pagesToTest) {
    try {
      console.log(`Running Lighthouse audit for ${page.name}...`);
      const runnerResult = await lighthouse(page.url, options);
      
      if (!runnerResult) {
        console.error(`Failed to run Lighthouse for ${page.name}`);
        continue;
      }

      const { lhr } = runnerResult;
      
      const pageResult = {
        page: page.name,
        url: page.url,
        scores: {
          performance: Math.round(lhr.categories.performance.score * 100),
          accessibility: Math.round(lhr.categories.accessibility.score * 100),
          bestPractices: Math.round(lhr.categories['best-practices'].score * 100),
          seo: Math.round(lhr.categories.seo.score * 100)
        },
        metrics: {
          firstContentfulPaint: lhr.audits['first-contentful-paint'].numericValue,
          largestContentfulPaint: lhr.audits['largest-contentful-paint'].numericValue,
          cumulativeLayoutShift: lhr.audits['cumulative-layout-shift'].numericValue,
          totalBlockingTime: lhr.audits['total-blocking-time'].numericValue,
          speedIndex: lhr.audits['speed-index'].numericValue
        },
        audits: {
          imageOptimization: lhr.audits['uses-optimized-images'].score,
          textCompression: lhr.audits['uses-text-compression'].score,
          unusedCSS: lhr.audits['unused-css-rules'].score,
          efficientCachePolicy: lhr.audits['uses-long-cache-ttl'].score
        }
      };
      
      results.push(pageResult);
      
      // Log results
      console.log(`\n${page.name.toUpperCase()} Results:`);
      console.log(`Performance: ${pageResult.scores.performance}/100`);
      console.log(`Accessibility: ${pageResult.scores.accessibility}/100`);
      console.log(`Best Practices: ${pageResult.scores.bestPractices}/100`);
      console.log(`SEO: ${pageResult.scores.seo}/100`);
      console.log(`FCP: ${Math.round(pageResult.metrics.firstContentfulPaint)}ms`);
      console.log(`LCP: ${Math.round(pageResult.metrics.largestContentfulPaint)}ms`);
      console.log(`CLS: ${pageResult.metrics.cumulativeLayoutShift.toFixed(3)}`);
      
    } catch (error) {
      console.error(`Error running Lighthouse for ${page.name}:`, error.message);
    }
  }

  await chrome.kill();
  
  // Save detailed results
  const reportPath = path.join(process.cwd(), 'lighthouse-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`\nDetailed results saved to: ${reportPath}`);
  
  // Performance assertions
  const performanceThresholds = {
    performance: 90,
    accessibility: 95,
    bestPractices: 90,
    seo: 95
  };
  
  const coreWebVitalsThresholds = {
    firstContentfulPaint: 1800, // 1.8s
    largestContentfulPaint: 2500, // 2.5s
    cumulativeLayoutShift: 0.1,
    totalBlockingTime: 200 // 200ms
  };
  
  let allTestsPassed = true;
  
  console.log('\n=== PERFORMANCE TEST RESULTS ===');
  
  for (const result of results) {
    console.log(`\n${result.page.toUpperCase()}:`);
    
    // Check Lighthouse scores
    for (const [category, threshold] of Object.entries(performanceThresholds)) {
      const score = result.scores[category];
      const passed = score >= threshold;
      const status = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`  ${category}: ${score}/100 (threshold: ${threshold}) ${status}`);
      if (!passed) allTestsPassed = false;
    }
    
    // Check Core Web Vitals
    console.log('  Core Web Vitals:');
    for (const [metric, threshold] of Object.entries(coreWebVitalsThresholds)) {
      const value = result.metrics[metric];
      let passed;
      let displayValue;
      
      if (metric === 'cumulativeLayoutShift') {
        passed = value <= threshold;
        displayValue = value.toFixed(3);
      } else {
        passed = value <= threshold;
        displayValue = `${Math.round(value)}ms`;
      }
      
      const status = passed ? '✅ PASS' : '❌ FAIL';
      console.log(`    ${metric}: ${displayValue} (threshold: ${threshold}) ${status}`);
      if (!passed) allTestsPassed = false;
    }
  }
  
  console.log(`\n=== OVERALL RESULT: ${allTestsPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'} ===`);
  
  // Exit with appropriate code
  process.exit(allTestsPassed ? 0 : 1);
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down Lighthouse tests...');
  process.exit(0);
});

// Run the audit
if (require.main === module) {
  runLighthouseAudit().catch(error => {
    console.error('Lighthouse audit failed:', error);
    process.exit(1);
  });
}

module.exports = { runLighthouseAudit };