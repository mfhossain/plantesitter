import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../../shared/supabase.service';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscribe.html',
  styleUrls: ['./subscribe.scss']
})
export class Subscribe {
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  showOverlay = false;

  form = {
    email: '',
    name: '',
    address: '',
    postcode: '',
    country: ''
  };

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private http: HttpClient
  ) {}

  submit() {
    this.submitError = '';
    this.submitSuccess = false;

    if (!this.form.email) {
      this.submitError = 'E-mail er påkrævet.';
      return;
    }

    this.isSubmitting = true;

    const payload: any = {
      email: this.form.email,
      name: this.form.name || null,
      address: this.form.address || null,
      postcode: this.form.postcode || null,
      country: this.form.country || null
    };

    this.supabaseService.insert('plantowner', payload).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        if (result.error) {
          this.submitError = result.error.message || 'Kunne ikke tilmelde.';
          return;
        }
        this.submitSuccess = true;
        console.log('Insert result:', result);
        this.form = { email: '', name: '', address: '', postcode: '', country: '' };
        this.showOverlay = true;
        // Ensure view updates immediately
        this.cdr.detectChanges();
        // Fire-and-forget email via SendGrid
        this.sendConfirmationEmail(result?.data?.[0]);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.submitError = err?.message || 'Netværksfejl under tilmelding.';
      },
      complete: () => {
        // Safety: ensure button is re-enabled
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  closeOverlay() {
    this.showOverlay = false;
    this.router.navigateByUrl('/');
  }

  private sendConfirmationEmail(inserted?: any) {
    try {
      const sg = environment.sendgrid;
      if (!sg?.apiKey) {
        console.warn('SendGrid API key not configured. Skipping email.');
        return;
      }
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${sg.apiKey}`,
        'Content-Type': 'application/json'
      });
      const toEmail = this.form.email || inserted?.email || sg.toAdminEmail;
      const payload = {
        personalizations: [
          { to: [{ email: toEmail }], subject: 'Tak for din tilmelding' }
        ],
        from: { email: sg.fromEmail, name: sg.fromName },
        content: [
          {
            type: 'text/plain',
            value: `Hej ${this.form.name || inserted?.name || ''}\n\nTak for din tilmelding til PlanteSitter.\n\nVenlig hilsen\nPlanteSitter`
          }
        ]
      };
      this.http.post('https://api.sendgrid.com/v3/mail/send', payload, { headers }).subscribe({
        next: () => {},
        error: (e) => console.warn('SendGrid error (ignored):', e?.status || e)
      });
    } catch (e) {
      console.warn('SendGrid exception (ignored):', e);
    }
  }
}


