import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService, ContactFormData } from '../../shared/contact.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {
  email = 'info@plantesitter.dk';
  
  // Form data
  contactForm: ContactFormData = {
    name: '',
    email: '',
    subject: '',
    message: '',
    privacyAccepted: false
  };
  
  // Form state
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  showMailtoOption = false;

  constructor(private contactService: ContactService) {}

  onSubmit() {
    // Validate form
    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.submitMessage = '';
    this.submitSuccess = false;
    this.showMailtoOption = false;

    // Try to send via API first, fallback to mailto
    this.contactService.sendContactForm(this.contactForm).subscribe({
      next: (response) => {
        console.log('Contact form response:', response);
        this.isSubmitting = false;
        this.submitSuccess = response.success;
        this.submitMessage = response.message;
        
        if (response.success) {
          this.resetForm();
        }
      },
      error: (error) => {
        console.error('Contact form submission error:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          url: error.url
        });
        this.isSubmitting = false;
        this.submitSuccess = false;
        this.submitMessage = `Der opstod en fejl ved afsendelse (${error.status}). Prøv venligst igen.`;
        this.showMailtoOption = true;
      }
    });
  }

  sendViaMailto() {
    this.contactService.sendEmailViaMailto(this.contactForm);
  }

  private validateForm(): boolean {
    if (!this.contactForm.name.trim()) {
      this.submitMessage = 'Navn er påkrævet.';
      return false;
    }
    
    if (!this.contactForm.email.trim()) {
      this.submitMessage = 'Email er påkrævet.';
      return false;
    }
    
    if (!this.isValidEmail(this.contactForm.email)) {
      this.submitMessage = 'Indtast venligst en gyldig email-adresse.';
      return false;
    }
    
    if (!this.contactForm.message.trim()) {
      this.submitMessage = 'Besked er påkrævet.';
      return false;
    }
    
    if (!this.contactForm.privacyAccepted) {
      this.submitMessage = 'Du skal acceptere persondatapolitikken.';
      return false;
    }
    
    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private resetForm() {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: '',
      privacyAccepted: false
    };
  }
}
