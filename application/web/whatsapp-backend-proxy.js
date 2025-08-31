// WhatsApp Backend Proxy Example
// This is a simple Node.js/Express server to handle WhatsApp API calls securely
// Place this in your backend directory and run with: node whatsapp-backend-proxy.js

const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4200', // Your Angular app URL
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Add this for Twilio webhooks

// Rate limiting (basic implementation)
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/whatsapp/', limiter);

// WhatsApp API configuration
const WHATSAPP_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;
const WHATSAPP_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WHATSAPP_API_URL = 'https://graph.facebook.com/v18.0';

// Twilio configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || 'AC7db10a2ffe36aa3e75e3efe08bf6eca9';
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || '4fdc0891de9b7335326f7ceed6f3a22e';

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    whatsappConfigured: !!(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN),
    twilioConfigured: !!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN),
    timestamp: new Date().toISOString()
  });
});

// Twilio WhatsApp Webhook - This is the callback URL you need to configure
app.post('/api/twilio/webhook', (req, res) => {
  console.log('📱 Twilio WhatsApp Webhook received:', {
    body: req.body,
    timestamp: new Date().toISOString()
  });

  try {
    const { From, To, Body, MessageSid, AccountSid } = req.body;

    // Validate this is from Twilio (optional but recommended)
    if (AccountSid !== TWILIO_ACCOUNT_SID) {
      console.warn('⚠️ Webhook from unknown account:', AccountSid);
    }

    // Process the incoming message
    const incomingMessage = {
      from: From,
      to: To,
      body: Body,
      messageId: MessageSid,
      timestamp: new Date().toISOString()
    };

    console.log('✅ Processed incoming message:', incomingMessage);

    // Here you can:
    // 1. Store the message in your database
    // 2. Send it to your frontend via WebSocket
    // 3. Process it with your chatbot logic
    // 4. Send an auto-reply

    // Example: Send an auto-reply
    if (Body && Body.trim()) {
      sendAutoReply(From, Body);
    }

    // Respond to Twilio (required)
    res.status(200).send('OK');

  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    res.status(500).send('Error processing webhook');
  }
});

// Twilio WhatsApp Webhook verification (for GET requests)
app.get('/api/twilio/webhook', (req, res) => {
  console.log('🔍 Twilio webhook verification request');
  res.status(200).send('Webhook endpoint is active');
});

// Auto-reply function
async function sendAutoReply(to, originalMessage) {
  try {
    // Create auto-reply message
    let autoReply = 'Tak for din besked! Jeg vil svare dig snart.';
    
    // You can add more sophisticated auto-reply logic here
    if (originalMessage.toLowerCase().includes('hej') || originalMessage.toLowerCase().includes('hello')) {
      autoReply = 'Hej! Hvordan kan jeg hjælpe dig med plante-passning i dag?';
    } else if (originalMessage.toLowerCase().includes('pris') || originalMessage.toLowerCase().includes('pris')) {
      autoReply = 'Vores priser starter fra 150 kr/time. Vil du have mere specifik information?';
    }

    // Send the auto-reply using Twilio
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
      new URLSearchParams({
        From: 'whatsapp:+14155238886', // Your Twilio WhatsApp number
        To: to,
        Body: autoReply
      }),
      {
        headers: {
          'Authorization': 'Basic ' + Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64'),
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    console.log('✅ Auto-reply sent:', {
      to: to,
      reply: autoReply,
      messageId: response.data.sid
    });

  } catch (error) {
    console.error('❌ Error sending auto-reply:', error.response?.data || error.message);
  }
}

// Send WhatsApp message endpoint
app.post('/api/whatsapp/send', async (req, res) => {
  try {
    // Validate required fields
    const { message, to } = req.body;
    
    if (!message || !to) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: message and to'
      });
    }

    // Validate WhatsApp configuration
    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      return res.status(500).json({
        success: false,
        message: 'WhatsApp API not configured on server'
      });
    }

    // Format phone number
    const formattedPhone = formatPhoneNumber(to);

    // Prepare WhatsApp API payload
    const payload = {
      messaging_product: 'whatsapp',
      to: formattedPhone,
      type: 'text',
      text: {
        body: message
      }
    };

    // Send to WhatsApp API
    const response = await axios.post(
      `${WHATSAPP_API_URL}/${WHATSAPP_PHONE_NUMBER_ID}/messages`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      }
    );

    console.log('WhatsApp message sent successfully:', {
      to: formattedPhone,
      messageId: response.data.messages?.[0]?.id,
      timestamp: new Date().toISOString()
    });

    res.json({
      success: true,
      message: 'Message sent successfully',
      data: {
        messageId: response.data.messages?.[0]?.id,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('WhatsApp API Error:', {
      error: error.response?.data || error.message,
      timestamp: new Date().toISOString()
    });

    // Handle specific WhatsApp API errors
    if (error.response?.data?.error) {
      const whatsappError = error.response.data.error;
      
      switch (whatsappError.code) {
        case 100:
          return res.status(400).json({
            success: false,
            message: 'Invalid phone number format'
          });
        case 131:
          return res.status(400).json({
            success: false,
            message: 'Phone number not registered on WhatsApp'
          });
        case 132:
          return res.status(400).json({
            success: false,
            message: 'Invalid access token'
          });
        case 133:
          return res.status(400).json({
            success: false,
            message: 'Message too long (max 4096 characters)'
          });
        default:
          return res.status(500).json({
            success: false,
            message: `WhatsApp API Error: ${whatsappError.message}`
          });
      }
    }

    // Handle network/timeout errors
    if (error.code === 'ECONNABORTED') {
      return res.status(408).json({
        success: false,
        message: 'Request timeout - please try again'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get WhatsApp message status (optional)
app.get('/api/whatsapp/status/:messageId', async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!WHATSAPP_PHONE_NUMBER_ID || !WHATSAPP_ACCESS_TOKEN) {
      return res.status(500).json({
        success: false,
        message: 'WhatsApp API not configured'
      });
    }

    const response = await axios.get(
      `${WHATSAPP_API_URL}/${messageId}`,
      {
        headers: {
          'Authorization': `Bearer ${WHATSAPP_ACCESS_TOKEN}`
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Error getting message status:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to get message status'
    });
  }
});

// Helper function to format phone numbers
function formatPhoneNumber(phone) {
  // Remove all non-digit characters
  let cleaned = phone.replace(/\D/g, '');
  
  // If it starts with 0, replace with country code (assuming Denmark +45)
  if (cleaned.startsWith('0')) {
    cleaned = '45' + cleaned.substring(1);
  }
  
  // If it doesn't start with country code, add Denmark code
  if (!cleaned.startsWith('45')) {
    cleaned = '45' + cleaned;
  }
  
  return cleaned;
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`WhatsApp Backend Proxy running on port ${PORT}`);
  console.log(`WhatsApp API configured: ${!!(WHATSAPP_PHONE_NUMBER_ID && WHATSAPP_ACCESS_TOKEN)}`);
});

module.exports = app;
