const fs = require('fs');
const path = require('path');

const knownRoutes = [
  '/',
  '/authority',
  '/authority/london',
  '/authority/camden',
  '/authority/birmingham',
  '/authority/manchester',
  '/authority/leeds',
  '/authority/glasgow',
  '/authority/edinburgh',
  '/authority/bristol',
  '/authority/london/0-star',
  '/authority/birmingham/0-star',
  '/postcode/sw1a',
  '/postcode/wc2e',
  '/postcode/m1',
  '/postcode/w1',
  '/postcode/e1',
  '/postcode/b1',
  '/postcode/b21',
  '/postcode/m4',
  '/postcode/ls1',
  '/postcode/g1',
  '/postcode/l1',
  '/postcode/bs1',
  '/hygiene-rating/the-ivy-market-grill-wc2e-8pb-100234',
  '/hygiene-rating/golden-ocean-w2-4qj-1837192',
  '/hygiene-rating/grand-spice-nw1-8tr-1928412',
  '/hygiene-rating/al-sulaymaniyah-w2-1eb-1898885',
  '/hygiene-rating/dishoom-covent-garden-wc2h-9fb-109382',
  '/hygiene-rating/hawksmoor-seven-dials-wc2h-9aw-104928',
  '/hygiene-rating/clos-maggiore-wc2e-8jd-108271',
  '/hygiene-rating/flat-iron-covent-garden-wc2e-8qh-105921',
  '/business-support',
  '/foi',
  '/about',
  '/contact',
  '/disclaimer',
  '/privacy',
  '/terms'
];

console.log('====================================================');
console.log('🔍 HYGIENECHECK.UK COMPREHENSIVE LINK CRAWLER & AUDIT');
console.log('====================================================\n');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const allSrcFiles = getAllFiles(path.join(__dirname, 'src')).filter(f => /\.(tsx|ts|jsx|js)$/.test(f));
const foundLinks = new Set();
const linkLocations = [];

const hrefRegex = /href=["'](\/[^"']*)["']|href=\{`(\/[^`]*)`\}/g;

allSrcFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const rawLink = match[1] || match[2];
    foundLinks.add(rawLink);
    linkLocations.push({ file: path.relative(__dirname, filePath), link: rawLink });
  }
});

console.log(`📊 Discovered ${foundLinks.size} unique internal route patterns across ${allSrcFiles.length} source files.`);

let brokenLinks = 0;

function isValidRoute(route) {
  const cleanRoute = route.split('?')[0];
  if (knownRoutes.includes(cleanRoute)) return true;
  if (/^\/authority\/[a-z0-9\-]+$/.test(cleanRoute)) return true;
  if (/^\/authority\/[a-z0-9\-]+\/0-star$/.test(cleanRoute)) return true;
  if (/^\/postcode\/[a-z0-9\-]+$/.test(cleanRoute)) return true;
  if (/^\/hygiene-rating\/[a-z0-9\-]+$/.test(cleanRoute)) return true;
  if (cleanRoute.includes('${')) return true; // dynamic template literals
  return false;
}

console.log('\n--- Link Integrity Validation ---');
foundLinks.forEach(link => {
  const valid = isValidRoute(link);
  if (valid) {
    console.log(`  ✅ [PASS] ${link}`);
  } else {
    console.log(`  ❌ [FAIL] ${link} (Unresolved internal route)`);
    brokenLinks++;
  }
});

console.log('\n====================================================');
console.log(`🎯 CRAWL RESULTS: ${foundLinks.size} links checked. ${brokenLinks} broken links found.`);
console.log(brokenLinks === 0 ? '✨ ZERO BROKEN LINKS DETECTED! ALL INTERNAL PATHS VALID!' : '⚠️ SOME LINKS NEED FIXING.');
console.log('====================================================\n');

process.exit(brokenLinks === 0 ? 0 : 1);
