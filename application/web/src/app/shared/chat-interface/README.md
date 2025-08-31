# Chat Interface with WhatsApp Integration

This chat interface component provides both in-app chat functionality and WhatsApp integration for PlanteSitter support.

## Features

- **Dual Channel Support**: Users can choose between in-app chat and WhatsApp
- **WhatsApp Integration**: Direct message forwarding to WhatsApp Business
- **Responsive Design**: Works on both desktop and mobile devices
- **Environment-Based Configuration**: Secure configuration management using environment files

## Setup Instructions

### 1. Configure Environment Files

The chat configuration is now managed through environment files for better security and deployment flexibility.

#### Development Environment
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '+45XXXXXXXX', // Replace with your actual WhatsApp number
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.'
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

#### Production Environment
Edit `src/environments/environment.prod.ts` with your production settings.

### 2. WhatsApp Business Setup

1. **Get a WhatsApp Business Number**: 
   - Use your existing business phone number
   - Or get a dedicated number for customer support

2. **Verify Your Business**:
   - Set up WhatsApp Business API or use WhatsApp Web
   - Ensure your business is verified on WhatsApp

3. **Test the Integration**:
   - Send a test message through the chat interface
   - Verify that messages are received on your WhatsApp

### 3. Environment Variables (Optional)

For enhanced security, you can use environment variables. See `CONFIGURATION.md` for detailed instructions.

## How It Works

### Chat Mode
- Users type messages in the chat interface
- Bot responds with predefined messages
- All conversation happens within the app

### WhatsApp Mode
- Users type their message in the chat interface
- Message is formatted with timestamp and business info
- User is redirected to WhatsApp with pre-filled message
- User can send the message directly to your WhatsApp Business

## Message Format

When users send messages via WhatsApp, they are formatted as:

```
Hej PlanteSitter Support!

Jeg har et spørgsmål:
[User's message]

Sendt fra PlanteSitter hjemmeside
[Timestamp]
```

## Security Features

- **Environment-Based Configuration**: Sensitive data stored in environment files
- **No Server Storage**: Messages sent directly to WhatsApp
- **User Control**: Users decide when to send messages to WhatsApp
- **No Data Logging**: No sensitive information is stored or logged

## Technical Details

- Uses WhatsApp's `wa.me` API for message formatting
- Automatically encodes messages for URL safety
- Opens WhatsApp in a new tab/window
- Maintains chat history in the interface
- Environment-based configuration management

## Troubleshooting

### Messages not sending to WhatsApp
- Verify the phone number format (should include country code)
- Ensure the phone number is registered with WhatsApp Business
- Check if the number has been verified

### WhatsApp not opening
- Ensure the user has WhatsApp installed on their device
- Check if pop-up blockers are disabled
- Verify the URL format is correct

### Configuration Issues
- Check environment file paths and imports
- Verify that the correct environment is being used
- See `CONFIGURATION.md` for detailed troubleshooting

## Deployment

### Development
```bash
ng serve
```

### Production
```bash
ng build --configuration=production
```

## Future Enhancements

- Add message templates for common questions
- Integrate with WhatsApp Business API for automated responses
- Add file/image sharing capabilities
- Implement message history tracking
- Enhanced environment variable support
