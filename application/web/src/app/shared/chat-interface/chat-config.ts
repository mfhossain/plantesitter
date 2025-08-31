import { environment } from '../../../environments/environment';

export interface ChatConfig {
  whatsapp: {
    phoneNumber: string;
    businessName: string;
    defaultMessage?: string;
    twilioAccountSid?: string;
    twilioAuthToken?: string;
    twilioWhatsAppNumber?: string;
    useDirectAPI?: boolean;
    useBackendProxy?: boolean;
    backendProxyUrl?: string;
  };
  chat: {
    welcomeMessage: string;
    botResponses: string[];
  };
}

export const CHAT_CONFIG: ChatConfig = environment.chat;
