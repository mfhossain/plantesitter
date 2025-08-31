# Chat Configuration Guide

This guide explains how to configure the chat system using environment variables for better security and deployment flexibility.

## Environment Setup

### 1. Create Environment Files

Create the following environment files in your project:

#### Development Environment (`src/environments/environment.ts`)
```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: '+45XXXXXXXX', // Your development WhatsApp number
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

#### Production Environment (`src/environments/environment.prod.ts`)
```typescript
export const environment = {
  production: true,
  chat: {
    whatsapp: {
      phoneNumber: '+45XXXXXXXX', // Your production WhatsApp number
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

### 2. Environment Variables (Optional)

For even better security, you can use environment variables. Create a `.env` file in your project root:

```bash
# WhatsApp Configuration
WHATSAPP_PHONE_NUMBER=+45XXXXXXXX
WHATSAPP_BUSINESS_NAME=PlanteSitter Support
WHATSAPP_DEFAULT_MESSAGE=Hej! Jeg har et spørgsmål om plante-passning.

# Chat Configuration
CHAT_WELCOME_MESSAGE=Hej! Jeg er her for at hjælpe dig med dine plante-passning spørgsmål. Vælg en kanal nedenfor for at starte.
```

Then update your environment files to use these variables:

```typescript
export const environment = {
  production: false,
  chat: {
    whatsapp: {
      phoneNumber: process.env.WHATSAPP_PHONE_NUMBER || '+45XXXXXXXX',
      businessName: process.env.WHATSAPP_BUSINESS_NAME || 'PlanteSitter Support',
      defaultMessage: process.env.WHATSAPP_DEFAULT_MESSAGE || 'Hej! Jeg har et spørgsmål om plante-passning.'
    },
    chat: {
      welcomeMessage: process.env.CHAT_WELCOME_MESSAGE || 'Hej! Jeg er her for at hjælpe dig med dine plante-passning spørgsmål. Vælg en kanal nedenfor for at starte.',
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

## Security Best Practices

### 1. Never Commit Sensitive Data
- Add `.env` files to `.gitignore`
- Use placeholder values in committed files
- Use environment variables in production

### 2. Different Configurations for Different Environments
- Development: Use test phone numbers
- Staging: Use staging phone numbers  
- Production: Use real business phone numbers

### 3. Phone Number Format
- Always include country code (e.g., +45 for Denmark)
- Remove any spaces or special characters
- Test the number format with WhatsApp

## Deployment Configuration

### For Different Environments

#### Development
```bash
ng serve
```

#### Production
```bash
ng build --configuration=production
```

### Environment-Specific Builds

You can create additional environment files for different stages:

- `environment.staging.ts` - For staging environment
- `environment.test.ts` - For testing environment

## Troubleshooting

### Configuration Not Loading
1. Check that environment files are in the correct location
2. Verify import paths in `chat-config.ts`
3. Ensure Angular CLI is configured to use the correct environment

### WhatsApp Not Working
1. Verify phone number format
2. Check that the number is registered with WhatsApp Business
3. Test the `wa.me` URL manually

### Environment Variables Not Working
1. Install `dotenv` package if using environment variables
2. Ensure `.env` file is in the project root
3. Check that variables are properly loaded in your build process
