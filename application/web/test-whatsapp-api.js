// WhatsApp API Test Script
// Run this to test your API credentials directly

const axios = require('axios');

// Your current credentials
const PHONE_NUMBER_ID = '15558412678';
const ACCESS_TOKEN = 'CmgKJAjaudiO6dauAhIGZW50OndhIgtQbGFudHNpdHRlclDKrMvFBhpAWrAkJIHwcBL80JtHW8KUaQXrhLv8THMG9+rzpa3xV1sCorh38atTKIPpAuHQVPuDqcrq97ERTeaNtOPw3BzIAxIubSV5goSp64P2WrWznaloIZFb5uNbzdjX6gdETq08y2uFtQskL2zqDECz8jZRLw==';
const TO_PHONE = '4591622791'; // Your business number

async function testWhatsAppAPI() {
  console.log('🧪 Testing WhatsApp API...');
  console.log('📱 Phone Number ID:', PHONE_NUMBER_ID);
  console.log('🔑 Access Token:', ACCESS_TOKEN.substring(0, 20) + '...');
  console.log('📞 To Phone:', TO_PHONE);
  console.log('');

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: TO_PHONE,
        type: 'text',
        text: {
          body: 'Test message from API - ' + new Date().toISOString()
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000
      }
    );

    console.log('✅ API Call Successful!');
    console.log('📊 Response:', JSON.stringify(response.data, null, 2));
    
    if (response.data.messages && response.data.messages[0]) {
      console.log('📨 Message ID:', response.data.messages[0].id);
    }

  } catch (error) {
    console.log('❌ API Call Failed!');
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
testWhatsAppAPI();
