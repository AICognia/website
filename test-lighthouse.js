const { default: lighthouse } = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

(async () => {
  // Launch Chrome
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless', '--no-sandbox', '--disable-gpu']
  });

  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance'],
    port: chrome.port
  };

  console.log('Running Lighthouse audit on http://localhost:3001...\n');

  const runnerResult = await lighthouse('http://localhost:3001', options);

  // Extract Core Web Vitals
  const report = runnerResult.lhr;
  const metrics = report.audits.metrics.details.items[0];

  console.log('=== Core Web Vitals ===');
  console.log(`Performance Score: ${Math.round(report.categories.performance.score * 100)}/100`);
  console.log('\nMetrics:');
  console.log(`- First Contentful Paint (FCP): ${Math.round(metrics.firstContentfulPaint)}ms`);
  console.log(`- Largest Contentful Paint (LCP): ${Math.round(metrics.largestContentfulPaint)}ms`);
  console.log(`- Total Blocking Time (TBT): ${Math.round(metrics.totalBlockingTime)}ms`);
  console.log(`- Cumulative Layout Shift (CLS): ${metrics.cumulativeLayoutShift}`);
  console.log(`- Speed Index: ${Math.round(metrics.speedIndex)}ms`);

  console.log('\n=== Performance Metrics ===');
  console.log(`- Time to Interactive: ${Math.round(metrics.interactive)}ms`);
  console.log(`- First Meaningful Paint: ${Math.round(metrics.firstMeaningfulPaint)}ms`);

  // Performance recommendations
  console.log('\n=== Key Observations ===');
  if (metrics.largestContentfulPaint > 2500) {
    console.log('⚠️  LCP needs improvement (target: <2.5s)');
  } else {
    console.log('✅ LCP is good');
  }

  if (metrics.totalBlockingTime > 300) {
    console.log('⚠️  TBT needs improvement (target: <300ms)');
  } else {
    console.log('✅ TBT is good');
  }

  if (metrics.cumulativeLayoutShift > 0.1) {
    console.log('⚠️  CLS needs improvement (target: <0.1)');
  } else {
    console.log('✅ CLS is good');
  }

  await chrome.kill();
  process.exit(0);
})();