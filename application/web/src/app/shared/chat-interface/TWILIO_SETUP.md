# Twilio SMS Setup Guide

This guide will help you set up Twilio SMS integration for your PlanteSitter chat interface.

## Prerequisites

1. **Twilio Account**: Sign up at [twilio.com](https://www.twilio.com)
2. **Twilio Phone Number**: Purchase a phone number for sending SMS
3. **Account SID and Auth Token**: Available in your Twilio Console

## Step 1: Get Your Twilio Credentials

### 1.1 Find Your Account SID
1. Log into your [Twilio Console](https://console.twilio.com/)
2. Your Account SID is displayed on the dashboard
3. It looks like: ``

### 1.2 Find Your Auth Token
1. In the Twilio Console, go to **Settings** → **API Keys**
2. Click on **Show** next to your Auth Token
3. It looks like: ``

### 1.3 Get Your Twilio Phone Number
1. Go to **Phone Numbers** → **Manage** → **Active numbers**
2. Note your Twilio phone number (e.g., `+1234567890`)

## Step 2: Update Environment Configuration

### 2.1 Development Environment
Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '+4591622791',
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.'
    },
    sms: {
      phoneNumber: '+4591622791', // Your target number
      enabled: true,
      service: 'twilio',
      twilio: {
        accountSid: '', // Your Account SID
        authToken: '', // Your Auth Token
        fromNumber: '+1234567890' // Your Twilio phone number
      }
    },
    chat: {
      welcomeMessage: 'Hej! Jeg er her for at hjælpe dig med dine plante-passning spørgsmål. Vælg en kanal nedenfor for at starte.',
      botResponses: [
        'Tak for din besked! Jeg vil gerne hjælpe dig med det.',
        'Det er et godt spørgsmål. Lad mig tjekke det for dig.',
        'Jeg kan se du har brug for hjælp. Hvad mere kan jeg hjælpe med?',
        'Perfekt! Jeg noterer det ned og vender tilbage til dig snart.',
        'Det lyder interessant! Kan du fortælle mig mere om det?'
      ]
    }
  }
};
```

### 2.2 Production Environment
Edit `src/environments/environment.prod.ts` with the same structure but production values.

## Step 3: Test Your Configuration

### 3.1 Start Development Server
```bash
ng serve
```

### 3.2 Test SMS Functionality
1. Open your application
2. Click on the chat widget
3. Select the **SMS** channel
4. Type a test message
5. Click send

### 3.3 Check Twilio Console
1. Go to your Twilio Console
2. Navigate to **Phone Numbers** → **Manage** → **Logs**
3. You should see your test message in the logs

## Step 4: Troubleshooting

### Common Issues

#### Issue: "Invalid phone number format"
**Solution**: Ensure phone numbers are in E.164 format:
- ✅ `+4591622791` (correct)
- ❌ `+45 91 62 27 91` (incorrect - no spaces)
- ❌ `004591622791` (incorrect - use + prefix)

#### Issue: "Authentication failed"
**Solution**: Check your credentials:
1. Verify Account SID is correct
2. Verify Auth Token is correct
3. Ensure no extra spaces in credentials

#### Issue: "From number not verified"
**Solution**: 
1. Verify your Twilio phone number is active
2. Check if the number supports SMS
3. Ensure the number is in your Twilio account

#### Issue: "Message body too long"
**Solution**: SMS messages are limited to 160 characters:
- Keep messages concise
- Consider splitting long messages
- Use abbreviations where appropriate

### Error Codes Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 21211 | Invalid phone number | Check phone number format |
| 21608 | Message too long | Shorten message |
| 21614 | Invalid phone number | Verify number exists |
| 21610 | Message body required | Add message content |
| 21612 | Invalid from number | Check Twilio phone number |

## Step 5: Security Best Practices

### 5.1 Environment Variables (Recommended)
For better security, use environment variables:

```bash
# .env file (add to .gitignore)
TWILIO_ACCOUNT_SID=AC1234567890abcdef1234567890abcdef
TWILIO_AUTH_TOKEN=1234567890abcdef1234567890abcdef
TWILIO_FROM_NUMBER=+1234567890
```

Then update your environment files:
```typescript
twilio: {
  accountSid: process.env.TWILIO_ACCOUNT_SID || 'fallback_sid',
  authToken: process.env.TWILIO_AUTH_TOKEN || 'fallback_token',
  fromNumber: process.env.TWILIO_FROM_NUMBER || '+1234567890'
}
```

### 5.2 Never Commit Credentials
- ✅ Use environment variables
- ✅ Use placeholder values in committed files
- ❌ Never commit real credentials to git

### 5.3 CORS Considerations
Twilio API calls are made directly from the browser. If you encounter CORS issues, consider:
1. Using a backend proxy
2. Using Twilio's client-side SDK
3. Implementing server-side SMS sending

## Step 6: Cost Management

### 6.1 Twilio Pricing
- **Setup**: Free
- **Phone Number**: ~$1/month
- **SMS**: ~$0.0075 per message (US numbers)
- **International**: Varies by country

### 6.2 Monitor Usage
1. Check your Twilio Console dashboard
2. Set up usage alerts
3. Monitor monthly costs
4. Consider usage limits

## Step 7: Advanced Configuration

### 7.1 Message Templates
You can customize message formatting in `sms.service.ts`:

```typescript
private formatSMSMessage(message: string): string {
  const timestamp = new Date().toLocaleString('da-DK');
  
  return `PlanteSitter Support - ${timestamp}

Spørgsmål: ${message}

Sendt fra PlanteSitter hjemmeside`;
}
```

### 7.2 Delivery Confirmations
Twilio provides delivery status webhooks. You can implement status tracking:

```typescript
// In your backend
app.post('/twilio/webhook', (req, res) => {
  const status = req.body.SmsStatus;
  const messageId = req.body.MessageSid;
  
  // Update message status in your database
  console.log(`Message ${messageId}: ${status}`);
  
  res.sendStatus(200);
});
```

## Step 8: Testing Checklist

Before going live, verify:

- [ ] Twilio credentials are correct
- [ ] Phone numbers are in correct format
- [ ] SMS messages are being sent
- [ ] Error handling works properly
- [ ] Costs are within budget
- [ ] Security measures are in place
- [ ] Production environment is configured
- [ ] Monitoring is set up

## Support

If you encounter issues:

1. **Check Twilio Console** for detailed error messages
2. **Review this guide** for common solutions
3. **Check Twilio Documentation** at [twilio.com/docs](https://www.twilio.com/docs)
4. **Contact Twilio Support** if needed

## Next Steps

Once SMS is working:

1. **Test with real users**
2. **Monitor message delivery**
3. **Optimize message content**
4. **Consider adding delivery confirmations**
5. **Implement usage analytics**
