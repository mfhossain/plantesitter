import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private supabaseService: SupabaseService, private cdr: ChangeDetectorRef, private router: Router) {}

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
}


