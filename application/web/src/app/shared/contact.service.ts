import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.contact.googleAppsScriptUrl;
  private recipientEmail = environment.contact.recipientEmail;
  private useMailtoFallback = environment.contact.useMailtoFallback;

  constructor(private http: HttpClient) { }

  sendContactForm(contactData: ContactFormData): Observable<ContactResponse> {
    console.log('Sending contact form data:', contactData);
    console.log('API URL:', this.apiUrl);
    
    const formData = new FormData();
    formData.append('data', JSON.stringify(contactData));
    
    return this.http.post<ContactResponse>(this.apiUrl, formData);
  }

  // Alternative: Use a simple mailto approach for now
  sendEmailViaMailto(contactData: ContactFormData): void {
    const subject = encodeURIComponent(`PlanteSitter Contact: ${contactData.subject}`);
    const body = encodeURIComponent(`
Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

---
This message was sent from the PlanteSitter contact form.
    `);
    
    const mailtoUrl = `mailto:${this.recipientEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoUrl, '_blank');
  }

  // Method to update the API URL (useful for switching between dev/prod)
  updateApiUrl(newUrl: string) {
    this.apiUrl = newUrl;
  }
}
