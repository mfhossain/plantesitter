import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SurveyService, SurveyData } from '../../shared/survey.service';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './survey.html',
  styleUrls: ['./survey.scss']
})
export class Survey {
  isSubmitting = false;
  submitMessage = '';
  submitSuccess = false;
  connectionStatus = '';

  constructor(private surveyService: SurveyService) {
    // Test connection to Apps Script when component initializes
    this.testConnection();
  }

  surveyData: SurveyData = {
    q1: {
      ingen: false,
      oneToThree: false,
      fourToSeven: false,
      eightPlus: false
    },
    q2: {
      notDifficult: false,
      littleDifficult: false,
      veryDifficult: false
    },
    q3: {
      severalTimes: false,
      fewTimes: false,
      never: false
    },
    q4: {
      zero: false,
      hundredToThreeHundred: false,
      threeHundredToSixHundred: false
    },
    q5: {
      yesDefinitely: false,
      maybeDepends: false,
      noNotInterested: false
    },
    q6: {
      neighborFriend: false,
      professionalTeam: false,
      automaticTech: false,
      other: false
    },
    q7: {
      zeroTimes: false,
      oneToTwoTimes: false,
      threeToFourTimes: false,
      fivePlusTimes: false
    },
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
}
