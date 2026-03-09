// Quick test script to check if Clerk key is being read correctly
// Run with: node check-clerk-key.js

require('dotenv').config({ path: '.env.local' });

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const secretKey = process.env.CLERK_SECRET_KEY;

console.log('\n=== Clerk Key Check ===\n');

console.log('Publishable Key:');
console.log('  Length:', publishableKey?.length || 0, 'characters');
console.log('  Starts with pk_test_:', publishableKey?.startsWith('pk_test_'));
console.log('  First 30 chars:', publishableKey?.substring(0, 30));
console.log('  Last 10 chars:', publishableKey?.substring(publishableKey.length - 10));
console.log('  Full key:', publishableKey);

console.log('\nSecret Key:');
console.log('  Length:', secretKey?.length || 0, 'characters');
console.log('  Starts with sk_test_:', secretKey?.startsWith('sk_test_'));
console.log('  First 30 chars:', secretKey?.substring(0, 30));
console.log('  Last 10 chars:', secretKey?.substring(secretKey.length - 10));

console.log('\n=== Expected Format ===');
console.log('✓ Publishable key should be 150-300+ characters long');
console.log('✓ Secret key should be 50-100+ characters long');
console.log('✓ Both should NOT end with just "$"');

console.log('\n=== Diagnosis ===');
if (!publishableKey || publishableKey.length < 100) {
  console.log('❌ PROBLEM: Publishable key is TOO SHORT or MISSING');
  console.log('   Action: Go to https://dashboard.clerk.com and copy the COMPLETE key');
  console.log('   Make sure to copy the ENTIRE string, not just part of it');
} else {
  console.log('✓ Publishable key length looks good');
}

if (!secretKey || secretKey.length < 40) {
  console.log('❌ PROBLEM: Secret key is TOO SHORT or MISSING');
} else {
  console.log('✓ Secret key length looks good');
}

console.log('\n');

