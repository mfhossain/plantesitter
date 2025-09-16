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
  },
  contact: {
    // Google Apps Script URL for contact form submissions
    googleAppsScriptUrl: 'https://script.google.com/macros/s/AKfycbzWSTWcSBEvt5w4vdc-gEFsRE7GGPMHaOfJnO3em5U5G3QbyGrweRMumGyCrf0e0Kk/exec',
    // Email settings
    recipientEmail: 'kontakt@plantesitter.dk',
    // Fallback to mailto if Google Apps Script fails
    useMailtoFallback: true
  },
  supabase: {
    // Supabase configuration
    url: 'https://tkcbzmrkpsisbevcltyp.supabase.co', // Replace with your actual Supabase project URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrY2J6bXJrcHNpc2JldmNsdHlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc4NzcxOTMsImV4cCI6MjA3MzQ1MzE5M30.3fkd5jwPFeRb0jxrYD9XitRgzjqHQ63K7IDlR-ts5rw', // Replace with your actual Supabase anon key
    // Database configuration
    database: {
      // Default schema is 'public' in Supabase
      schema: 'public',
      // Database name is automatically determined by your Supabase project
      // Your project ID is: tkcbzmrkpsisbevcltyp
      projectId: 'tkcbzmrkpsisbevcltyp',
      // Add your table names here
      tables: {
        plantowner: 'plantowner',
        // Example: plants: 'plants',
        // Add your actual table names
      }
    }
  },
  dev: {
    // Development page password protection
    password: 'dev123', // Change this to your desired password
    enabled: true // Set to false to disable password protection
  }
};
