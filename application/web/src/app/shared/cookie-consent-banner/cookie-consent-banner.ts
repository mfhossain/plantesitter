import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cookie-consent-banner',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cookie-consent-banner.html',
  styleUrls: ['./cookie-consent-banner.scss']
})
export class CookieConsentBanner implements OnInit {
  showBanner = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    // Only access localStorage in browser environment
    if (isPlatformBrowser(this.platformId)) {
      // Check if user has already made a choice
      const consent = localStorage.getItem('cookieConsent');
      if (!consent) {
        this.showBanner = true;
      }
    }
  }

  acceptCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'accepted');
      localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }
    this.showBanner = false;
    
    // Here you can enable analytics, tracking, etc.
    this.enableAnalytics();
  }

  declineCookies() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookieConsent', 'declined');
      localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }
    this.showBanner = false;
    
    // Disable non-essential cookies
    this.disableNonEssentialCookies();
  }

  private enableAnalytics() {
    // Enable Google Analytics, tracking pixels, etc.
    // This is where you would initialize analytics if you add them later
    console.log('Analytics enabled');
  }

  private disableNonEssentialCookies() {
    // Remove any non-essential cookies
    // This ensures compliance with user's choice
    console.log('Non-essential cookies disabled');
  }
}
