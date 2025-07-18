#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Comprehensive test runner for the portfolio site
 * Runs unit tests, accessibility tests, and performance audits
 */

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  log(`\n${'='.repeat(60)}`, colors.cyan);
  log(`${title}`, colors.cyan + colors.bright);
  log(`${'='.repeat(60)}`, colors.cyan);
}

function logSuccess(message) {
  log(`✅ ${message}`, colors.green);
}

function logError(message) {
  log(`❌ ${message}`, colors.red);
}

function logWarning(message) {
  log(`⚠️  ${message}`, colors.yellow);
}

function logInfo(message) {
  log(`ℹ️  ${message}`, colors.blue);
}

async function runCommand(command, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, { 
      shell: true, 
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options 
    });
    
    let stdout = '';
    let stderr = '';
    
    if (options.silent) {
      child.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      child.stderr.on('data', (data) => {
        stderr += data.toString();
      });
    }
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ code, stdout, stderr });
      } else {
        reject({ code, stdout, stderr });
      }
    });
  });
}

async function checkPrerequisites() {
  logSection('Checking Prerequisites');
  
  const checks = [
    { name: 'Node.js', command: 'node --version' },
    { name: 'npm', command: 'npm --version' },
    { name: 'Dependencies', command: 'npm list --depth=0' }
  ];
  
  for (const check of checks) {
    try {
      const result = await runCommand(check.command, { silent: true });
      logSuccess(`${check.name} is available`);
    } catch (error) {
      logError(`${check.name} check failed`);
      throw new Error(`Prerequisites not met: ${check.name}`);
    }
  }
}

async function runUnitTests() {
  logSection('Running Unit Tests');
  
  try {
    await runCommand('npm test');
    logSuccess('All unit tests passed');
    return true;
  } catch (error) {
    logError('Unit tests failed');
    return false;
  }
}

async function runAccessibilityTests() {
  logSection('Running Accessibility Tests');
  
  try {
    // Run specific accessibility tests
    await runCommand('npx vitest --run tests/accessibility/');
    logSuccess('Accessibility tests completed');
    
    // Generate accessibility report
    const reportPath = path.join(process.cwd(), 'accessibility-report.json');
    logInfo(`Accessibility report would be saved to: ${reportPath}`);
    
    return true;
  } catch (error) {
    logWarning('Some accessibility tests failed - check output for details');
    return false;
  }
}

async function runVisualTests() {
  logSection('Running Visual Consistency Tests');
  
  try {
    await runCommand('npx vitest --run tests/visual/');
    logSuccess('Visual consistency tests passed');
    return true;
  } catch (error) {
    logError('Visual consistency tests failed');
    return false;
  }
}

async function buildProject() {
  logSection('Building Project for Performance Tests');
  
  try {
    await runCommand('npm run build');
    logSuccess('Project built successfully');
    return true;
  } catch (error) {
    logError('Build failed');
    return false;
  }
}

async function runPerformanceTests() {
  logSection('Running Performance Tests');
  
  logInfo('Starting preview server...');
  
  // Start preview server in background
  const previewProcess = spawn('npm', ['run', 'preview'], {
    stdio: 'pipe',
    detached: true
  });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  try {
    // Check if server is running
    await runCommand('curl -f http://localhost:4321 > /dev/null 2>&1');
    logSuccess('Preview server is running');
    
    // Run Lighthouse tests
    logInfo('Running Lighthouse audits...');
    await runCommand('node tests/performance/lighthouse-test.js');
    logSuccess('Performance tests completed');
    
    return true;
  } catch (error) {
    logError('Performance tests failed');
    return false;
  } finally {
    // Clean up preview server
    try {
      await runCommand('pkill -f "astro preview"');
      logInfo('Preview server stopped');
    } catch (e) {
      // Ignore cleanup errors
    }
  }
}

async function generateTestReport(results) {
  logSection('Test Summary Report');
  
  const report = {
    timestamp: new Date().toISOString(),
    results: results,
    summary: {
      total: Object.keys(results).length,
      passed: Object.values(results).filter(r => r).length,
      failed: Object.values(results).filter(r => !r).length
    }
  };
  
  // Log summary
  log(`\nTest Results Summary:`, colors.bright);
  log(`Total Test Suites: ${report.summary.total}`);
  log(`Passed: ${report.summary.passed}`, colors.green);
  log(`Failed: ${report.summary.failed}`, report.summary.failed > 0 ? colors.red : colors.green);
  
  // Detailed results
  log(`\nDetailed Results:`, colors.bright);
  for (const [testType, passed] of Object.entries(results)) {
    const status = passed ? '✅ PASS' : '❌ FAIL';
    const color = passed ? colors.green : colors.red;
    log(`  ${testType}: ${status}`, color);
  }
  
  // Save report
  const reportPath = path.join(process.cwd(), 'test-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  logInfo(`Full test report saved to: ${reportPath}`);
  
  return report.summary.failed === 0;
}

async function main() {
  log(`${colors.cyan}${colors.bright}Portfolio Site Test Runner${colors.reset}`);
  log(`Starting comprehensive test suite...\n`);
  
  const startTime = Date.now();
  const results = {};
  
  try {
    // Check prerequisites
    await checkPrerequisites();
    
    // Run test suites
    results.unitTests = await runUnitTests();
    results.accessibilityTests = await runAccessibilityTests();
    results.visualTests = await runVisualTests();
    
    // Performance tests (optional - requires build)
    if (process.argv.includes('--performance') || process.argv.includes('--all')) {
      const buildSuccess = await buildProject();
      if (buildSuccess) {
        results.performanceTests = await runPerformanceTests();
      } else {
        results.performanceTests = false;
        logWarning('Skipping performance tests due to build failure');
      }
    } else {
      logInfo('Skipping performance tests (use --performance or --all to include)');
    }
    
    // Generate report
    const allPassed = await generateTestReport(results);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    log(`\nTest suite completed in ${duration}s`, colors.bright);
    
    if (allPassed) {
      logSuccess('All tests passed! 🎉');
      process.exit(0);
    } else {
      logError('Some tests failed. Check the output above for details.');
      process.exit(1);
    }
    
  } catch (error) {
    logError(`Test runner failed: ${error.message}`);
    process.exit(1);
  }
}

// Handle command line arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
Portfolio Site Test Runner

Usage: node test-runner.js [options]

Options:
  --performance    Include performance tests (requires build)
  --all           Run all tests including performance
  --help, -h      Show this help message

Examples:
  node test-runner.js                    # Run unit, accessibility, and visual tests
  node test-runner.js --performance     # Include performance tests
  node test-runner.js --all             # Run all tests
`);
  process.exit(0);
}

// Run the test suite
if (require.main === module) {
  main().catch(error => {
    logError(`Unexpected error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { main, runUnitTests, runAccessibilityTests, runVisualTests, runPerformanceTests };