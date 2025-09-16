import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SurveyService, SurveyData } from '../../shared/survey.service';
import { PlantownerTable } from '../../shared/plantowner-table/plantowner-table';
import { SupabaseService } from '../../shared/supabase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dev',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, PlantownerTable],
  templateUrl: './dev.html',
  styleUrls: ['./dev.scss']
})
export class Dev implements OnInit {
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  connectionStatus = '';

  // Test fetch state
  isLoadingPlantowners = true;
  plantownersTestData: any[] = [];
  plantownersTestError = '';

  // Password protection
  isAuthenticated = false;
  passwordInput = '';
  passwordError = '';
  showPasswordForm = true;

  constructor(private surveyService: SurveyService, private supabaseService: SupabaseService, private cdr: ChangeDetectorRef) {
    // Test connection to Apps Script when component initializes
    this.testConnection();
  }

  ngOnInit() {
    // Check if password protection is enabled
    if (environment.dev.enabled) {
      this.showPasswordForm = true;
      this.isAuthenticated = false;
    } else {
      this.showPasswordForm = false;
      this.isAuthenticated = true;
      // Run Supabase test fetch after component is fully initialized
      this.testFetch();
    }
  }

  surveyData: SurveyData = {
    q1: { ingen: false, oneToThree: false, fourToSeven: false, eightPlus: false },
    q2: { notDifficult: false, littleDifficult: false, veryDifficult: false },
    q3: { severalTimes: false, fewTimes: false, never: false },
    q4: { zero: false, hundredToThreeHundred: false, threeHundredToSixHundred: false },
    q5: { yesDefinitely: false, maybeDepends: false, noNotInterested: false },
    q6: { neighborFriend: false, professionalTeam: false, automaticTech: false, other: false },
    q7: { zeroTimes: false, oneToTwoTimes: false, threeToFourTimes: false, fivePlusTimes: false },
    email: ''
  };

  // Test connection to Apps Script
  testConnection() {
    this.connectionStatus = 'Testing connection...';
    this.surveyService.testConnection().subscribe({
      next: (response) => {
        this.connectionStatus = '✅ Connected to Google Apps Script';
        console.log('Apps Script connection successful:', response);
      },
      error: (error) => {
        this.connectionStatus = '❌ Connection failed - check Apps Script URL';
        console.error('Apps Script connection failed:', error);
      }
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    this.submitMessage = '';
    this.submitSuccess = false;

    this.surveyService.submitSurvey(this.surveyData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.submitMessage = 'Tak for dine svar! Din besvarelse er blevet gemt i Google Sheets.';
        
        // Reset form after successful submission
        this.resetForm();
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitSuccess = false;
        this.submitMessage = 'Der opstod en fejl ved gemning til Google Sheets. Prøv venligst igen senere.';
        console.error('Survey submission error:', error);
      }
    });
  }

  private resetForm() {
    this.surveyData = {
      q1: { ingen: false, oneToThree: false, fourToSeven: false, eightPlus: false },
      q2: { notDifficult: false, littleDifficult: false, veryDifficult: false },
      q3: { severalTimes: false, fewTimes: false, never: false },
      q4: { zero: false, hundredToThreeHundred: false, threeHundredToSixHundred: false },
      q5: { yesDefinitely: false, maybeDepends: false, noNotInterested: false },
      q6: { neighborFriend: false, professionalTeam: false, automaticTech: false, other: false },
      q7: { zeroTimes: false, oneToTwoTimes: false, threeToFourTimes: false, fivePlusTimes: false },
      email: ''
    };
  }

  // Password authentication methods
  authenticate() {
    this.passwordError = '';
    
    if (this.passwordInput === environment.dev.password) {
      this.isAuthenticated = true;
      this.showPasswordForm = false;
      this.passwordError = '';
      // Run Supabase test fetch after successful authentication
      this.testFetch();
    } else {
      this.passwordError = 'Incorrect password. Please try again.';
      this.passwordInput = '';
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.showPasswordForm = true;
    this.passwordInput = '';
    this.passwordError = '';
    this.plantownersTestData = [];
    this.isLoadingPlantowners = true;
  }

  // Use SupabaseService like in loadRecords()
  testFetch() {
    this.isLoadingPlantowners = true;
    this.plantownersTestError = '';
    this.plantownersTestData = [];

    console.log('Loading plantowner records using SupabaseService...');

    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.isLoadingPlantowners = false;
        console.log('Plantowner records loaded:', result);
        
        if (result.error) {
          this.plantownersTestError = `Failed to load records: ${result.error.message}`;
          console.error('Error loading records:', result.error);
        } else {
          this.plantownersTestData = result.data || [];
          console.log(`Loaded ${this.plantownersTestData.length} plantowner records`);
          console.log('plantownersTestData after assignment:', this.plantownersTestData);
          console.log('isLoadingPlantowners after assignment:', this.isLoadingPlantowners);
          
          // Force change detection
          this.cdr.detectChanges();
          console.log('Change detection triggered');
          
          if (this.plantownersTestData.length === 0) {
            console.log('No records found in plantowner table');
          }
        }
      },
      error: (error) => {
        this.isLoadingPlantowners = false;
        this.plantownersTestError = `Connection error: ${error.message}`;
        console.error('Subscription error:', error);
      }
    });
  }
}


