# Twilio WhatsApp Webhook Setup Guide

This guide will help you configure the callback URL (webhook) for receiving WhatsApp messages from Twilio.

## 🚨 **The Problem**

When you reply to WhatsApp messages, you see:
> "Configure your WhatsApp Sandbox's Inbound URL to change this message."

This happens because Twilio doesn't know where to send incoming messages.

## ✅ **The Solution**

You need to configure a **webhook URL** in your Twilio WhatsApp sandbox settings.

## 🛠️ **Step-by-Step Setup**

### **Step 1: Start Your Backend Proxy**

First, make sure your backend proxy is running:

```bash
# Install dependencies (if not already done)
npm install

# Start the backend proxy
node whatsapp-backend-proxy.js
```

You should see:
```
WhatsApp Backend Proxy running on port 3001
WhatsApp API configured: true
```

### **Step 2: Set Up HTTPS (Required for Webhooks)**

Twilio requires HTTPS for webhook URLs. For local development, use **ngrok**:

#### **Option A: Using ngrok (Recommended for Development)**

1. **Install ngrok:**
   ```bash
   npm install -g ngrok
   ```

2. **Start ngrok tunnel:**
   ```bash
   ngrok http 3001
   ```

3. **Copy the HTTPS URL:**
   You'll see something like:
   ```
   Forwarding    https://abc123.ngrok.io -> http://localhost:3001
   ```
   
   Copy the `https://abc123.ngrok.io` URL.

#### **Option B: Using Production Server**

If you have a production server with HTTPS, use that URL instead.

### **Step 3: Configure Webhook in Twilio Console**

1. **Go to Twilio Console:**
   - Visit: https://console.twilio.com/us1/develop/sms/manage/whatsapp-sandbox

2. **Find your WhatsApp number:**
   - Look for your sandbox number (usually `+14155238886`)

3. **Set the webhook URL:**
   - **For ngrok:** `https://abc123.ngrok.io/api/twilio/webhook`
   - **For production:** `https://yourdomain.com/api/twilio/webhook`

4. **Save the configuration**

### **Step 4: Test the Setup**

1. **Send a test message:**
   - Open WhatsApp
   - Send a message to your Twilio sandbox number

2. **Check the logs:**
   - Look at your backend proxy console
   - You should see: `📱 Twilio WhatsApp Webhook received`

3. **Verify auto-reply:**
   - You should receive an automatic response

## 🔧 **Alternative Setup Methods**

### **Method 1: Using Twilio CLI**

```bash
# Install Twilio CLI
npm install -g twilio-cli

# Login to Twilio
twilio login

# Set webhook URL
twilio phone-numbers:update +14155238886 --sms-webhook-url=https://abc123.ngrok.io/api/twilio/webhook
```

### **Method 2: Using the Setup Script**

Run the provided setup script:

```bash
node setup-twilio-webhook.js
```

This script will:
- Check if your backend is running
- Test the webhook endpoint
- Show current configuration
- Provide step-by-step instructions

## 📋 **What the Webhook Does**

When someone sends a message to your WhatsApp number, Twilio will:

1. **Send a POST request** to your webhook URL
2. **Include message data** (sender, message, timestamp, etc.)
3. **Your server processes** the message
4. **You can send a response** back to the user

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"Webhook not accessible"**
   - Make sure your backend proxy is running
   - Check if ngrok is working
   - Verify the URL is correct

2. **"HTTPS required"**
   - Twilio requires HTTPS for webhooks
   - Use ngrok for local development
   - Deploy to HTTPS server for production

3. **"No messages received"**
   - Check if you're still in the sandbox (24-hour limit)
   - Verify the webhook URL is set correctly
   - Check your backend logs for errors

4. **"Auto-reply not working"**
   - Check your Twilio credentials
   - Verify the sandbox number is correct
   - Look for errors in the console

### **Debug Steps:**

1. **Check webhook endpoint:**
   ```bash
   curl http://localhost:3001/api/twilio/webhook
   ```

2. **Test with ngrok:**
   ```bash
   curl https://abc123.ngrok.io/api/twilio/webhook
   ```

3. **Check Twilio logs:**
   - Go to Twilio Console → Monitor → Logs
   - Look for webhook delivery attempts

## 🎯 **Production Setup**

For production, you need to:

1. **Deploy your backend proxy** to a server with HTTPS
2. **Update the webhook URL** to your production domain
3. **Apply for WhatsApp Business API** (if not already done)
4. **Use your own WhatsApp number** instead of sandbox

## 📞 **Support**

- **Twilio Documentation:** https://www.twilio.com/docs/whatsapp
- **Twilio Support:** https://support.twilio.com/
- **ngrok Documentation:** https://ngrok.com/docs

## ✅ **Verification Checklist**

- [ ] Backend proxy is running on port 3001
- [ ] ngrok tunnel is active (for development)
- [ ] Webhook URL is configured in Twilio Console
- [ ] Test message sends successfully
- [ ] Auto-reply is received
- [ ] Webhook logs appear in console

Once you complete these steps, the "Configure your WhatsApp Sandbox's Inbound URL" message will disappear, and you'll be able to receive and respond to WhatsApp messages properly! 🎉
