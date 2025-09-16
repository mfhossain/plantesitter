import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from './supabase.service';

// Example interface for your Supabase table
export interface SurveyResponse {
  id?: number;
  q1_answer: string;
  q2_answer: string;
  q3_answer: string;
  q4_answer: string;
  q5_answer: string;
  q6_answer: string;
  q7_answer: string;
  q8_answer: string;
  q9_answer: string;
  q10_answer: string;
  q11_answer: string;
  q12_answer: string;
  q13_answer: string;
  q14_answer: string;
  q15_answer: string;
  q16_answer: string;
  q17_answer: string;
  q18_answer: string;
  q19_answer: string;
  q20_answer: string;
  q21_answer: string;
  q22_answer: string;
  q23_answer: string;
  q24_answer: string;
  q25_answer: string;
  q26_answer: string;
  q27_answer: string;
  q28_answer: string;
  q29_answer: string;
  q30_answer: string;
  q31_answer: string;
  q32_answer: string;
  q33_answer: string;
  q34_answer: string;
  q35_answer: string;
  q36_answer: string;
  q37_answer: string;
  q38_answer: string;
  q39_answer: string;
  q40_answer: string;
  q41_answer: string;
  q42_answer: string;
  q43_answer: string;
  q44_answer: string;
  q45_answer: string;
  q46_answer: string;
  q47_answer: string;
  q48_answer: string;
  q49_answer: string;
  q50_answer: string;
  q51_answer: string;
  q52_answer: string;
  q53_answer: string;
  q54_answer: string;
  q55_answer: string;
  q56_answer: string;
  q57_answer: string;
  q58_answer: string;
  q59_answer: string;
  q60_answer: string;
  q61_answer: string;
  q62_answer: string;
  q63_answer: string;
  q64_answer: string;
  q65_answer: string;
  q66_answer: string;
  q67_answer: string;
  q68_answer: string;
  q69_answer: string;
  q70_answer: string;
  q71_answer: string;
  q72_answer: string;
  q73_answer: string;
  q74_answer: string;
  q75_answer: string;
  q76_answer: string;
  q77_answer: string;
  q78_answer: string;
  q79_answer: string;
  q80_answer: string;
  q81_answer: string;
  q82_answer: string;
  q83_answer: string;
  q84_answer: string;
  q85_answer: string;
  q86_answer: string;
  q87_answer: string;
  q88_answer: string;
  q89_answer: string;
  q90_answer: string;
  q91_answer: string;
  q92_answer: string;
  q93_answer: string;
  q94_answer: string;
  q95_answer: string;
  q96_answer: string;
  q97_answer: string;
  q98_answer: string;
  q99_answer: string;
  q100_answer: string;
  created_at?: string;
  updated_at?: string;
}

@Component({
  selector: 'app-supabase-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="supabase-example">
      <h3>Supabase Survey Integration Example</h3>
      
      <!-- Connection Test -->
      <div class="connection-test">
        <button (click)="testSupabaseConnection()" [disabled]="isTestingConnection">
          {{ isTestingConnection ? 'Testing...' : 'Test Supabase Connection' }}
        </button>
        <div *ngIf="connectionMessage" class="message" [class.success]="connectionSuccess" [class.error]="!connectionSuccess">
          {{ connectionMessage }}
        </div>
      </div>

      <!-- Simple Survey Form -->
      <form *ngIf="connectionSuccess" (ngSubmit)="submitSurvey()" class="survey-form">
        <h4>Quick Survey Test</h4>
        
        <div class="form-group">
          <label>Question 1: How many plants do you have?</label>
          <select [(ngModel)]="surveyData.q1_answer" name="q1" required>
            <option value="">Select an option</option>
            <option value="0">None</option>
            <option value="1-3">1-3 plants</option>
            <option value="4-7">4-7 plants</option>
            <option value="8+">8+ plants</option>
          </select>
        </div>

        <div class="form-group">
          <label>Question 2: What's your biggest plant care challenge?</label>
          <textarea [(ngModel)]="surveyData.q2_answer" name="q2" rows="3" required></textarea>
        </div>

        <button type="submit" [disabled]="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit Survey' }}
        </button>
      </form>

      <!-- Results Display -->
      <div *ngIf="submissionMessage" class="submission-result" [class.success]="submissionSuccess" [class.error]="!submissionSuccess">
        {{ submissionMessage }}
      </div>

      <!-- Recent Submissions -->
      <div *ngIf="recentSubmissions.length > 0" class="recent-submissions">
        <h4>Recent Submissions ({{ recentSubmissions.length }})</h4>
        <div *ngFor="let submission of recentSubmissions" class="submission-item">
          <strong>ID:</strong> {{ submission.id }} | 
          <strong>Q1:</strong> {{ submission.q1_answer }} | 
          <strong>Q2:</strong> {{ submission.q2_answer }} |
          <strong>Date:</strong> {{ submission.created_at | date:'short' }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .supabase-example {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
      background-color: #f9f9f9;
    }

    .connection-test {
      margin-bottom: 20px;
    }

    .connection-test button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .connection-test button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .message, .submission-result {
      margin-top: 10px;
      padding: 10px;
      border-radius: 4px;
    }

    .message.success, .submission-result.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message.error, .submission-result.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .survey-form {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .survey-form button {
      padding: 10px 20px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .survey-form button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .recent-submissions {
      margin-top: 20px;
      background-color: white;
      padding: 15px;
      border-radius: 8px;
    }

    .submission-item {
      padding: 8px;
      border-bottom: 1px solid #eee;
      font-size: 0.9em;
    }

    .submission-item:last-child {
      border-bottom: none;
    }
  `]
})
export class SupabaseExample implements OnInit {
  isTestingConnection = false;
  connectionMessage = '';
  connectionSuccess = false;
  isSubmitting = false;
  submissionMessage = '';
  submissionSuccess = false;
  recentSubmissions: SurveyResponse[] = [];

  surveyData: Partial<SurveyResponse> = {
    q1_answer: '',
    q2_answer: ''
  };

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // Load recent submissions on component init
    this.loadRecentSubmissions();
  }

  testSupabaseConnection() {
    this.isTestingConnection = true;
    this.connectionMessage = '';

    this.supabaseService.testConnection().subscribe({
      next: (result) => {
        this.isTestingConnection = false;
        if (result.error) {
          this.connectionMessage = `Connection failed: ${result.error.message}`;
          this.connectionSuccess = false;
        } else {
          this.connectionMessage = 'Supabase connection successful!';
          this.connectionSuccess = true;
        }
      },
      error: (error) => {
        this.isTestingConnection = false;
        this.connectionMessage = `Connection error: ${error.message}`;
        this.connectionSuccess = false;
      }
    });
  }

  submitSurvey() {
    if (!this.surveyData.q1_answer || !this.surveyData.q2_answer) {
      this.submissionMessage = 'Please fill in all required fields.';
      this.submissionSuccess = false;
      return;
    }

    this.isSubmitting = true;
    this.submissionMessage = '';

    // Submit to Supabase
    this.supabaseService.insert<SurveyResponse>('survey_responses', this.surveyData as SurveyResponse).subscribe({
      next: (result) => {
        this.isSubmitting = false;
        if (result.error) {
          this.submissionMessage = `Submission failed: ${result.error.message}`;
          this.submissionSuccess = false;
        } else {
          this.submissionMessage = 'Survey submitted successfully!';
          this.submissionSuccess = true;
          // Reset form
          this.surveyData = {
            q1_answer: '',
            q2_answer: ''
          };
          // Reload recent submissions
          this.loadRecentSubmissions();
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submissionMessage = `Submission error: ${error.message}`;
        this.submissionSuccess = false;
      }
    });
  }

  loadRecentSubmissions() {
    // Load the 5 most recent survey submissions
    this.supabaseService.select<SurveyResponse>('survey_responses', 'id, q1_answer, q2_answer, created_at', {})
      .subscribe({
        next: (result) => {
          if (result.data) {
            // Sort by created_at descending and take first 5
            this.recentSubmissions = result.data
              .sort((a: any, b: any) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
              .slice(0, 5);
          }
        },
        error: (error) => {
          console.error('Error loading recent submissions:', error);
        }
      });
  }
}
