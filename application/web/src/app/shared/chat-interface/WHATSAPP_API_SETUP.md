# WhatsApp Cloud API Setup Guide

This guide will help you set up WhatsApp Cloud API to send messages directly from your website without opening WhatsApp Web.

## Prerequisites

1. **Facebook Business Account** - You need a Facebook Business account
2. **Meta Developer Account** - Sign up at [developers.facebook.com](https://developers.facebook.com)
3. **WhatsApp Business Account** - You'll create this during setup

## Step-by-Step Setup

### 1. Create a Meta App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Click "Create App"
3. Select "Business" as the app type
4. Fill in your app details and create the app

### 2. Add WhatsApp Product

1. In your app dashboard, click "Add Product"
2. Find "WhatsApp" and click "Set Up"
3. You'll be redirected to WhatsApp setup

### 3. Configure WhatsApp Business Account

1. **Phone Number Setup**:
   - Click "Add phone number"
   - Enter your business phone number
   - Verify the number via SMS/call
   - Note down the **Phone Number ID** (you'll need this)

2. **Webhook Setup** (Optional for receiving messages):
   - Set webhook URL if you want to receive messages
   - Verify webhook with Meta

### 4. Get Access Token

1. In your app dashboard, go to "WhatsApp" → "Getting Started"
2. Copy the **Access Token** (starts with `EAA...`)
3. **Important**: Keep this token secure and never expose it in client-side code

### 5. Configure Your Environment

Update your `src/environments/environment.ts` file:

```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '+4591622791', // Your verified WhatsApp number
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.',
      // Add these new properties:
      phoneNumberId: '123456789012345', // Your Phone Number ID from step 3
      accessToken: 'EAA...', // Your Access Token from step 4
      useDirectAPI: true // Set to true to enable direct API sending
    },
    // ... rest of your config
  }
};
```

### 6. Backend Proxy (Recommended for Security)

For security reasons, you should NOT expose your access token in the frontend. Instead, create a backend proxy:

#### Option A: Simple Backend Proxy

Create a backend endpoint (Node.js/Express example):

```javascript
// server.js
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/whatsapp/send', async (req, res) => {
  try {
    const { message, to } = req.body;
    
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: message }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error('WhatsApp API Error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send WhatsApp message' 
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Then update the WhatsApp service to use your backend:

```typescript
// whatsapp.service.ts
sendToBusiness(message: string): Observable<{ success: boolean; message: string; data?: any }> {
  return this.http.post<{ success: boolean; message: string; data?: any }>(
    '/api/whatsapp/send',
    { message, to: environment.chat.whatsapp.phoneNumber }
  ).pipe(
    catchError(error => {
      console.error('WhatsApp API Error:', error);
      return of({
        success: false,
        message: 'Failed to send WhatsApp message'
      });
    })
  );
}
```

#### Option B: Environment Variables

If you must use frontend (not recommended for production), use environment variables:

```typescript
// environment.ts
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '+4591622791',
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.',
      phoneNumberId: process.env['WHATSAPP_PHONE_NUMBER_ID'] || '',
      accessToken: process.env['WHATSAPP_ACCESS_TOKEN'] || '',
      useDirectAPI: true
    },
    // ... rest of config
  }
};
```

## Testing

1. Set `useDirectAPI: true` in your environment
2. Fill in your `phoneNumberId` and `accessToken`
3. Test sending a message through your chat interface
4. Check the browser console for any errors
5. Verify the message appears in your WhatsApp Business app

## Troubleshooting

### Common Issues:

1. **"Invalid access token"**:
   - Check if your access token is correct
   - Ensure the token hasn't expired
   - Verify you're using the right app's token

2. **"Invalid phone number"**:
   - Ensure the phone number is verified in your WhatsApp Business account
   - Format should be: country code + number (e.g., "4591622791")

3. **"Permission denied"**:
   - Check if your app has the necessary permissions
   - Ensure your WhatsApp Business account is active

4. **CORS errors**:
   - Use a backend proxy to avoid CORS issues
   - Don't call Meta's API directly from frontend

### Rate Limits:

- WhatsApp Cloud API has rate limits
- Free tier: 1,000 messages per month
- Paid tier: Higher limits available

## Security Best Practices

1. **Never expose access tokens in frontend code**
2. **Use environment variables for sensitive data**
3. **Implement proper error handling**
4. **Add rate limiting to prevent abuse**
5. **Validate and sanitize user input**
6. **Use HTTPS for all API calls**

## Alternative APIs

If WhatsApp Cloud API is too complex, consider these alternatives:

1. **Twilio WhatsApp API** - Easier setup, good documentation
2. **MessageBird WhatsApp API** - European provider, good support
3. **360dialog WhatsApp API** - Enterprise-focused

## Support

- [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- [Meta Developer Community](https://developers.facebook.com/community/)
- [WhatsApp Business API Status](https://developers.facebook.com/status/)
