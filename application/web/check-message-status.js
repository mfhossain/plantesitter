// Check Twilio WhatsApp Message Status
const axios = require('axios');

const ACCOUNT_SID = 'AC7db10a2ffe36aa3e75e3efe08bf6eca9';
const AUTH_TOKEN = '4fdc0891de9b7335326f7ceed6f3a22e';
const MESSAGE_SID = 'SM19031abb617c0ab3b0cf6a4baf7a1862'; // From your last test

async function checkMessageStatus() {
  console.log('🔍 Checking message status...');
  
  try {
    const url = `https://api.twilio.com/2010-04-01/Accounts/${ACCOUNT_SID}/Messages/${MESSAGE_SID}.json`;
    
    const authHeader = 'Basic ' + Buffer.from(`${ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64');
    
    const response = await axios.get(url, {
      headers: {
        'Authorization': authHeader
      }
    });

    console.log('📊 Message Status:', response.data.status);
    console.log('📅 Date Created:', response.data.date_created);
    console.log('📅 Date Sent:', response.data.date_sent);
    console.log('❌ Error Code:', response.data.error_code);
    console.log('❌ Error Message:', response.data.error_message);
    
    if (response.data.status === 'delivered') {
      console.log('✅ Message delivered successfully!');
    } else if (response.data.status === 'failed') {
      console.log('❌ Message failed to deliver');
      console.log('Reason:', response.data.error_message);
    } else {
      console.log('⏳ Message is still being processed...');
    }

  } catch (error) {
    console.log('❌ Error checking message status:', error.response?.data || error.message);
  }
}

checkMessageStatus();
