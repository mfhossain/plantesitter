// Twilio WhatsApp API Test Script
// Run this to test your Twilio credentials

const axios = require('axios');

// Your Twilio credentials (replace with your actual values)
const ACCOUNT_SID = 'AC7db10a2ffe36aa3e75e3efe08bf6eca9'; // Your Twilio Account SID
const AUTH_TOKEN = '4fdc0891de9b7335326f7ceed6f3a22e'; // Your Twilio Auth Token
const FROM_NUMBER = 'whatsapp:+14155238886'; // Twilio's WhatsApp sandbox number
const TO_NUMBER = 'whatsapp:+4591622791'; // Your WhatsApp number

async function testTwilioWhatsApp() {
  console.log('🧪 Testing Twilio WhatsApp API...');
  console.log('📱 Account SID:', ACCOUNT_SID ? ACCOUNT_SID.substring(0, 10) + '...' : 'Not set');
  console.log('🔑 Auth Token:', AUTH_TOKEN ? AUTH_TOKEN.substring(0, 10) + '...' : 'Not set');
  console.log('📞 From Number:', FROM_NUMBER);
  console.log('📞 To Number:', TO_NUMBER);
  console.log('');

  if (!ACCOUNT_SID || !AUTH_TOKEN) {
    console.log('❌ Please set your Twilio credentials in the script');
    return;
  }

  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages.json`;
    
    // Create Basic Auth header
    const authHeader = 'Basic ' + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64');
    
    const response = await axios.post(url, 
      new URLSearchParams({
        From: FROM_NUMBER,
        To: TO_NUMBER,
        Body: 'Test message from Twilio WhatsApp API - ' + new Date().toISOString()
      }).toString(),
      {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Twilio API Call Successful!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    console.log('📨 Message SID:', response.data.sid);
    console.log('📊 Status:', response.data.status);

  } catch (error) {
    console.log('❌ Twilio API Call Failed!');
    console.log('🔍 Error Details:');
    
    if (error.response) {
      console.log('📡 Status:', error.response.status);
      console.log('📄 Response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.log('🌐 Network Error:', error.message);
    }
  }
}

// Run the test
testTwilioWhatsApp();
