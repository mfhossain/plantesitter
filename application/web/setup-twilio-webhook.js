#!/usr/bin/env node

/**
 * Twilio WhatsApp Webhook Setup Script
 * This script helps you configure the webhook URL for receiving WhatsApp messages
 */

const axios = require('axios');
const readline = require('readline');

// Configuration
const TWILIO_ACCOUNT_SID = 'AC7db10a2ffe36aa3e75e3efe08bf6eca9';
const TWILIO_AUTH_TOKEN = '4fdc0891de9b7335326f7ceed6f3a22e';
const TWILIO_API_BASE = 'https://api.twilio.com/2010-04-01';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Twilio WhatsApp Webhook Setup');
console.log('================================\n');

async function setupWebhook() {
  try {
    // Step 1: Check if backend proxy is running
    console.log('1️⃣ Checking if backend proxy is running...');
    
    try {
      const healthResponse = await axios.get('http://localhost:3001/api/health', { timeout: 5000 });
      console.log('✅ Backend proxy is running');
      console.log('   Status:', healthResponse.data.status);
      console.log('   Twilio configured:', healthResponse.data.twilioConfigured);
    } catch (error) {
      console.log('❌ Backend proxy is not running on port 3001');
      console.log('   Please start it with: node whatsapp-backend-proxy.js');
      console.log('   Or run: npm start (if configured in package.json)\n');
      return;
    }

    // Step 2: Test webhook endpoint
    console.log('\n2️⃣ Testing webhook endpoint...');
    
    try {
      const webhookResponse = await axios.get('http://localhost:3001/api/twilio/webhook', { timeout: 5000 });
      console.log('✅ Webhook endpoint is accessible');
      console.log('   Response:', webhookResponse.data);
    } catch (error) {
      console.log('❌ Webhook endpoint is not accessible');
      console.log('   Error:', error.message);
      return;
    }

    // Step 3: Get current webhook configuration
    console.log('\n3️⃣ Checking current webhook configuration...');
    
    try {
      const response = await axios.get(
        `${TWILIO_API_BASE}/Accounts/${TWILIO_ACCOUNT_SID}/IncomingPhoneNumbers.json`,
        {
          auth: {
            username: TWILIO_ACCOUNT_SID,
            password: TWILIO_AUTH_TOKEN
          }
        }
      );

      const whatsappNumbers = response.data.incoming_phone_numbers.filter(
        number => number.capabilities.whatsapp
      );

      if (whatsappNumbers.length === 0) {
        console.log('❌ No WhatsApp numbers found in your account');
        console.log('   You need to join the Twilio WhatsApp sandbox first');
        console.log('   Go to: https://console.twilio.com/us1/develop/sms/manage/whatsapp-sandbox');
        return;
      }

      console.log('✅ Found WhatsApp numbers:', whatsappNumbers.length);
      
      for (const number of whatsappNumbers) {
        console.log(`   📱 ${number.phone_number} (${number.friendly_name})`);
        console.log(`      Current webhook: ${number.sms_webhook_url || 'Not configured'}`);
      }

    } catch (error) {
      console.log('❌ Error checking webhook configuration');
      console.log('   Error:', error.response?.data?.message || error.message);
      return;
    }

    // Step 4: Instructions for manual setup
    console.log('\n4️⃣ Manual Setup Instructions');
    console.log('============================');
    console.log('Since Twilio requires HTTPS for production webhooks, you have two options:\n');

    console.log('Option A: Use ngrok for local development');
    console.log('1. Install ngrok: npm install -g ngrok');
    console.log('2. Start your backend proxy: node whatsapp-backend-proxy.js');
    console.log('3. In another terminal, run: ngrok http 3001');
    console.log('4. Copy the HTTPS URL (e.g., https://abc123.ngrok.io)');
    console.log('5. Go to Twilio Console: https://console.twilio.com/us1/develop/sms/manage/whatsapp-sandbox');
    console.log('6. Set the webhook URL to: https://abc123.ngrok.io/api/twilio/webhook\n');

    console.log('Option B: Deploy to production');
    console.log('1. Deploy your backend proxy to a server with HTTPS');
    console.log('2. Set the webhook URL to: https://yourdomain.com/api/twilio/webhook\n');

    console.log('Option C: Use Twilio CLI (if installed)');
    console.log('1. Install Twilio CLI: npm install -g twilio-cli');
    console.log('2. Login: twilio login');
    console.log('3. Set webhook: twilio phone-numbers:update +14155238886 --sms-webhook-url=http://localhost:3001/api/twilio/webhook\n');

    // Step 5: Test the setup
    console.log('5️⃣ Testing the Setup');
    console.log('===================');
    console.log('After configuring the webhook:');
    console.log('1. Send a message to your Twilio WhatsApp number');
    console.log('2. Check your backend proxy console for webhook logs');
    console.log('3. You should see: "📱 Twilio WhatsApp Webhook received"');
    console.log('4. You should receive an auto-reply message\n');

    console.log('🎉 Setup complete! Follow the instructions above to configure your webhook URL.');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

// Run the setup
setupWebhook();
