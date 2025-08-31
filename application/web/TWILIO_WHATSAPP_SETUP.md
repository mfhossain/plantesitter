# Twilio WhatsApp API Setup Guide

This guide will help you set up Twilio WhatsApp API for direct messaging from your website.

## 🚀 **Why Twilio is Easier**

- ✅ **No complex Meta approval process**
- ✅ **Simple API with good documentation**
- ✅ **Sandbox for testing**
- ✅ **Reliable and well-supported**

## 📋 **Prerequisites**

1. **Twilio Account** - Sign up at [twilio.com](https://www.twilio.com)
2. **WhatsApp Business Account** (optional for production)
3. **Your SID and Auth Token** (you already have these)

## 🔧 **Step-by-Step Setup**

### **Step 1: Get Your Twilio Credentials**

1. Go to your [Twilio Console](https://console.twilio.com/)
2. Copy your **Account SID** and **Auth Token**
3. Note: Keep these secure!

### **Step 2: Join Twilio WhatsApp Sandbox**

1. Go to [Twilio WhatsApp Sandbox](https://console.twilio.com/us1/develop/sms/manage/whatsapp-sandbox)
2. You'll see a **sandbox number** and **join code**
3. **Join the sandbox** by sending the join code to the sandbox number via WhatsApp

### **Step 3: Update Your Environment**

Update your `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '', // Your WhatsApp number
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.',
      // Twilio credentials
      twilioAccountSid: 'AC...', // Your Twilio Account SID
      twilioAuthToken: '...', // Your Twilio Auth Token
      twilioWhatsAppNumber: '', // Twilio sandbox number
      useDirectAPI: true,
      useBackendProxy: true,
      backendProxyUrl: 'http://localhost:3001'
    },
    // ... rest of config
  }
};
```

### **Step 4: Test Your Setup**

1. **Run the test script:**
   ```bash
   # Update the credentials in test-twilio-whatsapp.js
   node test-twilio-whatsapp.js
   ```

2. **Check your WhatsApp** for the test message

## 🧪 **Testing Process**

### **Sandbox Testing:**
1. **Join the sandbox** by sending the join code to `+14155238886`
2. **Test messages** will come from the sandbox number
3. **Limited to 24 hours** after joining

### **Production Setup:**
1. **Apply for WhatsApp Business API** through Twilio
2. **Get approved** by Meta/WhatsApp
3. **Use your own WhatsApp number** instead of sandbox

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"Not in sandbox" error:**
   - Send the join code to the sandbox number
   - Wait a few minutes for activation

2. **"Invalid credentials" error:**
   - Check your Account SID and Auth Token
   - Make sure they're copied correctly

3. **"Message not delivered":**
   - Verify your phone number format
   - Check if you're still in the sandbox (24-hour limit)

### **Phone Number Format:**
- **Sandbox**: ``
- **Your number**: ``
- **Always include**: `whatsapp:` prefix

## 💰 **Pricing**

- **Sandbox**: Free for testing
- **Production**: Pay per message
- **Pricing**: Check [Twilio WhatsApp pricing](https://www.twilio.com/whatsapp/pricing)

## 🚀 **Next Steps**

1. **Test with sandbox** first
2. **Apply for production** when ready
3. **Update to production number** when approved

## 📞 **Support**

- [Twilio WhatsApp Documentation](https://www.twilio.com/docs/whatsapp)
- [Twilio Support](https://support.twilio.com/)
- [WhatsApp Business API](https://www.whatsapp.com/business/api/)

## 🎯 **Quick Start**

1. **Add your credentials** to `environment.ts`
2. **Join the sandbox** by sending the join code
3. **Test the integration** with your chat interface
4. **Apply for production** when ready

Your Twilio WhatsApp integration is now ready! 🎉
