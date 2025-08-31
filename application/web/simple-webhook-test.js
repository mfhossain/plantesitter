#!/usr/bin/env node

/**
 * Simple Webhook Test Script
 * This helps you test webhook functionality without local tunneling
 */

const axios = require('axios');

console.log('🔧 Webhook Testing Options');
console.log('==========================\n');

console.log('Option 1: Use webhook.site (Recommended for testing)');
console.log('1. Go to: https://webhook.site/');
console.log('2. Copy the unique URL provided');
console.log('3. Use that URL in Twilio console');
console.log('4. Send a test message to see the webhook data\n');

console.log('Option 2: Use ngrok with Windows Defender exception');
console.log('1. Open Windows Security');
console.log('2. Go to "Virus & threat protection" → "Manage settings"');
console.log('3. Add exclusion for ngrok folder');
console.log('4. Run: ngrok http 3001\n');

console.log('Option 3: Use localtunnel (if working)');
console.log('1. Run: npx localtunnel --port 3001');
console.log('2. Copy the provided URL');
console.log('3. Add /api/twilio/webhook to the URL\n');

console.log('Option 4: Deploy to a cloud service');
console.log('1. Deploy your backend to Heroku, Vercel, or similar');
console.log('2. Use the HTTPS URL provided by the service\n');

console.log('🎯 For now, I recommend using webhook.site for testing:');
console.log('- It\'s free and doesn\'t require local setup');
console.log('- You can see exactly what data Twilio sends');
console.log('- Perfect for understanding the webhook format\n');

console.log('📋 Next Steps:');
console.log('1. Choose one of the options above');
console.log('2. Get your HTTPS URL');
console.log('3. Configure it in Twilio console');
console.log('4. Test with a WhatsApp message');
console.log('5. Check the webhook data received\n');

console.log('🔗 Twilio Console URL:');
console.log('https://console.twilio.com/us1/develop/sms/manage/whatsapp-sandbox');

