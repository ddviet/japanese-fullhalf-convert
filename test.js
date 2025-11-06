const { toHalfWidth, toFullWidth } = require('./index.js');

// Test cases
const tests = [
  {
    name: 'Katakana conversion',
    full: 'カタカナ',
    half: 'ｶﾀｶﾅ'
  },
  {
    name: 'Numbers conversion',
    full: '１２３',
    half: '123'
  },
  {
    name: 'Mixed Katakana and numbers',
    full: 'カタカナ１２３',
    half: 'ｶﾀｶﾅ123'
  },
  {
    name: 'Space conversion',
    full: '　',
    half: ' '
  },
  {
    name: 'Letters conversion',
    full: 'ＨＥＬＬＯ',
    half: 'HELLO'
  },
  {
    name: 'Small katakana',
    full: 'ァィゥェォ',
    half: 'ｧｨｩｪｫ'
  },
  {
    name: 'Long vowel mark',
    full: 'ー',
    half: 'ｰ'
  }
];

console.log('Testing toHalfWidth:');
let passed = 0;
let failed = 0;

tests.forEach(test => {
  const result = toHalfWidth(test.full);
  if (result === test.half) {
    console.log(`✓ ${test.name}: "${test.full}" -> "${result}"`);
    passed++;
  } else {
    console.log(`✗ ${test.name}: Expected "${test.half}", got "${result}"`);
    failed++;
  }
});

console.log('\nTesting toFullWidth (reverse):');
tests.forEach(test => {
  const result = toFullWidth(test.half);
  if (result === test.full) {
    console.log(`✓ ${test.name}: "${test.half}" -> "${result}"`);
    passed++;
  } else {
    console.log(`✗ ${test.name}: Expected "${test.full}", got "${result}"`);
    failed++;
  }
});

console.log(`\nResults: ${passed} passed, ${failed} failed`);

if (failed === 0) {
  console.log('All tests passed!');
  process.exit(0);
} else {
  console.log('Some tests failed!');
  process.exit(1);
}

