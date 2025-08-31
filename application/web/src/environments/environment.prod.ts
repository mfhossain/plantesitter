export const environment = {
  production: true,
  chat: {
    whatsapp: {
      phoneNumber: '+4591622791', // Replace with your actual WhatsApp number for production
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.'
    },
    sms: {
      phoneNumber: '+4591622791', // Your SMS number
      enabled: true, // Set to true to enable SMS
      service: 'twilio',
      twilio: {
        accountSid: 'your_twilio_account_sid_here',
        authToken: 'your_twilio_auth_token_here',
        fromNumber: '+4591622791' // Your Twilio phone number
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
