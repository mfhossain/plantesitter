import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface TwilioWhatsAppMessage {
  From: string;
  To: string;
  Body: string;
}

export interface TwilioWhatsAppResponse {
  sid: string;
  date_created: string;
  date_updated: string;
  date_sent: string;
  account_sid: string;
  to: string;
  from: string;
  body: string;
  status: string;
  direction: string;
  api_version: string;
  price_unit: string;
  price: string;
  uri: string;
}

@Injectable({
  providedIn: 'root'
})
export class TwilioWhatsAppService {
  private readonly apiUrl = 'https://api.twilio.com/2010-04-01/Accounts';
  private readonly accountSid: string;
  private readonly authToken: string;
  private readonly fromNumber: string;

  constructor(private http: HttpClient) {
    this.accountSid = environment.chat.whatsapp.twilioAccountSid || '';
    this.authToken = environment.chat.whatsapp.twilioAuthToken || '';
    this.fromNumber = environment.chat.whatsapp.twilioWhatsAppNumber || '';
  }

  /**
   * Send a WhatsApp message using Twilio API
   */
  sendMessage(to: string, message: string): Observable<{ success: boolean; message: string; data?: any }> {
    if (!this.accountSid || !this.authToken || !this.fromNumber) {
      return of({
        success: false,
        message: 'Twilio credentials not configured'
      });
    }

    const url = `${this.apiUrl}/${this.accountSid}/Messages.json`;
    
    // Create Basic Auth header
    const authHeader = 'Basic ' + btoa(`${this.accountSid}:${this.authToken}`);
    
    const headers = new HttpHeaders({
      'Authorization': authHeader,
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Format phone number for WhatsApp
    const formattedTo = this.formatPhoneNumberForWhatsApp(to);

    // Create form data
    const body = new URLSearchParams();
    body.set('From', this.fromNumber);
    body.set('To', formattedTo);
    body.set('Body', message);

    return this.http.post<TwilioWhatsAppResponse>(url, body.toString(), { headers }).pipe(
      map(response => ({
        success: true,
        message: 'Message sent successfully',
        data: {
          messageId: response.sid,
          status: response.status,
          timestamp: response.date_created
        }
      })),
      catchError(error => {
        console.error('Twilio WhatsApp API Error:', error);
        return of({
          success: false,
          message: error.error?.message || 'Failed to send WhatsApp message'
        });
      })
    );
  }

  /**
   * Send a message to the configured business number
   */
  sendToBusiness(message: string): Observable<{ success: boolean; message: string; data?: any }> {
    const businessNumber = environment.chat.whatsapp.phoneNumber;
    return this.sendMessage(businessNumber, message);
  }

  /**
   * Format phone number for WhatsApp (add whatsapp: prefix)
   */
  private formatPhoneNumberForWhatsApp(phone: string): string {
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    
    // If it starts with 0, replace with country code (assuming Denmark +45)
    if (cleaned.startsWith('0')) {
      cleaned = '45' + cleaned.substring(1);
    }
    
    // If it doesn't start with country code, add Denmark code
    if (!cleaned.startsWith('45')) {
      cleaned = '45' + cleaned;
    }
    
    // Add whatsapp: prefix
    return `whatsapp:+${cleaned}`;
  }

  /**
   * Check if Twilio is properly configured
   */
  isConfigured(): boolean {
    return !!(this.accountSid && this.authToken && this.fromNumber);
  }

  /**
   * Fallback method - opens WhatsApp web if API is not available
   */
  openWhatsAppWeb(message: string): void {
    const phoneNumber = environment.chat.whatsapp.phoneNumber.replace(/\D/g, '');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }

  /**
   * Get Twilio sandbox join code (for testing)
   */
  getSandboxJoinCode(): string {
    // Twilio WhatsApp sandbox join code (you need to join the sandbox first)
    return 'join <two-word-code>'; // Replace with your actual sandbox code
  }
}
