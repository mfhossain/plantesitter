# WhatsApp API Troubleshooting Guide

## 🚨 Messages Not Received on Phone

If you're sending messages via the API but not receiving them on your phone, follow these troubleshooting steps:

### 1. **Verify WhatsApp Business App Setup**

#### Check Your Business Account Status:
1. Open your **WhatsApp Business app** on your phone
2. Go to **Settings** → **Business tools** → **WhatsApp Manager**
3. Verify that your business account is **Active** and **Verified**

#### Check Phone Number Verification:
1. In WhatsApp Business app, go to **Settings** → **Business tools** → **WhatsApp Manager**
2. Verify your phone number shows as **"Verified"**
3. Make sure the number matches: `+4591622791`

### 2. **Check API Credentials**

#### Verify Phone Number ID:
- Your current Phone Number ID: `15558412678`
- This should match the ID shown in your WhatsApp Manager

#### Verify Access Token:
- Your current Access Token: `CmgKJAjaudiO6dauAhIGZW50OndhIgtQbGFudHNpdHRlclDKrMvFBhpAWrAkJIHwcBL80JtHW8KUaQXrhLv8THMG9+rzpa3xV1sCorh38atTKIPpAuHQVPuDqcrq97ERTeaNtOPw3BzIAxIubSV5goSp64P2WrWznaloIZFb5uNbzdjX6gdETq08y2uFtQskL2zqDECz8jZRLw==`

### 3. **Test API Directly**

Let's test your API credentials directly:

```bash
curl -X POST \
  https://graph.facebook.com/v18.0/15558412678/messages \
  -H "Authorization: Bearer CmgKJAjaudiO6dauAhIGZW50OndhIgtQbGFudHNpdHRlclDKrMvFBhpAWrAkJIHwcBL80JtHW8KUaQXrhLv8THMG9+rzpa3xV1sCorh38atTKIPpAuHQVPuDqcrq97ERTeaNtOPw3BzIAxIubSV5goSp64P2WrWznaloIZFb5uNbzdjX6gdETq08y2uFtQskL2zqDECz8jZRLw==" \
  -H "Content-Type: application/json" \
  -d '{
    "messaging_product": "whatsapp",
    "to": "4591622791",
    "type": "text",
    "text": {
      "body": "Test message from API"
    }
  }'
```

### 4. **Common Issues & Solutions**

#### Issue 1: Phone Number Not Verified
**Symptoms**: API returns success but no message received
**Solution**: 
- Verify your phone number in WhatsApp Business app
- Wait 24 hours after verification before testing

#### Issue 2: Wrong Phone Number Format
**Symptoms**: API error about invalid phone number
**Solution**: 
- Use format: `4591622791` (without + or spaces)
- Make sure it matches your verified business number

#### Issue 3: Access Token Expired
**Symptoms**: API returns "Invalid access token" error
**Solution**:
- Generate new access token in WhatsApp Manager
- Update your environment configuration

#### Issue 4: Business Account Not Active
**Symptoms**: Messages sent but not delivered
**Solution**:
- Check business account status in WhatsApp Manager
- Ensure account is not suspended or pending review

#### Issue 5: Rate Limits Exceeded
**Symptoms**: API returns rate limit error
**Solution**:
- Check your message quota in WhatsApp Manager
- Free tier: 1,000 messages/month
- Wait for quota reset or upgrade to paid tier

### 5. **Debug Your Current Setup**

#### Check Browser Console:
1. Open browser developer tools (F12)
2. Go to Console tab
3. Send a message through your chat interface
4. Look for any error messages or API responses

#### Check Network Tab:
1. In developer tools, go to Network tab
2. Send a message
3. Look for API calls to `graph.facebook.com`
4. Check the response status and data

### 6. **Alternative Testing Methods**

#### Test with WhatsApp Manager:
1. Go to [WhatsApp Manager](https://business.facebook.com/latest/whatsapp_manager/overview?business_id=1672258976772206&asset_id=2475031439533371)
2. Try sending a test message directly from the manager
3. Check if it appears on your phone

#### Test with Different Number:
1. Try sending to a different WhatsApp number
2. Make sure the recipient has WhatsApp installed
3. Verify the number format is correct

### 7. **Environment Configuration Check**

Your current configuration:
```typescript
whatsapp: {
  phoneNumber: '+4591622791',
  phoneNumberId: '15558412678',
  accessToken: 'CmgKJAjaudiO6dauAhIGZW50OndhIgtQbGFudHNpdHRlclDKrMvFBhpAWrAkJIHwcBL80JtHW8KUaQXrhLv8THMG9+rzpa3xV1sCorh38atTKIPpAuHQVPuDqcrq97ERTeaNtOPw3BzIAxIubSV5goSp64P2WrWznaloIZFb5uNbzdjX6gdETq08y2uFtQskL2zqDECz8jZRLw==',
  useDirectAPI: true,
  useBackendProxy: true
}
```

### 8. **Next Steps**

1. **Check WhatsApp Business app** for account status
2. **Test API directly** using the curl command above
3. **Check browser console** for error messages
4. **Verify phone number** in WhatsApp Manager
5. **Test with WhatsApp Manager** directly

### 9. **Contact Support**

If none of the above works:
- Check [WhatsApp Business API Documentation](https://developers.facebook.com/docs/whatsapp)
- Contact Meta Developer Support
- Check [WhatsApp API Status](https://developers.facebook.com/status/)

## 🔧 Quick Fixes to Try

1. **Restart WhatsApp Business app** on your phone
2. **Check internet connection** on your phone
3. **Verify business hours** (some features may be limited outside business hours)
4. **Wait 24 hours** after initial setup before testing
5. **Try sending to a different number** to isolate the issue
