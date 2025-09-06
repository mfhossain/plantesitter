export const environment = {
  production: true,
  chat: {
    whatsapp: {
      phoneNumber: '+4591622791', // Your WhatsApp number
      businessName: 'PlanteSitter Support',
      defaultMessage: 'Hej! Jeg har et spørgsmål om plante-passning.',
      // Twilio WhatsApp API credentials
      twilioAccountSid: 'AC7db10a2ffe36aa3e75e3efe08bf6eca9', // Your Twilio Account SID
      twilioAuthToken: '4fdc0891de9b7335326f7ceed6f3a22e', // Your Twilio Auth Token
      twilioWhatsAppNumber: 'whatsapp:+14155238886', // Twilio's WhatsApp number (sandbox)
      // Enable direct API sending
      useDirectAPI: true,
      // Backend proxy configuration (recommended for security)
      useBackendProxy: true,
      backendProxyUrl: 'http://localhost:3001'
    },
    chat: {
      welcomeMessage: 'Hej! Jeg er her for at hjælpe dig med dine plante-passning spørgsmål. Send din besked nedenfor, og jeg vil svare dig direkte på WhatsApp.',
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
