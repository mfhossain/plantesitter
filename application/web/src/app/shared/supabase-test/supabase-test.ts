import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-supabase-test',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="supabase-test">
      <h3>Supabase Connection Test</h3>
      
      <div class="status-section">
        <button (click)="testConnection()" [disabled]="isLoading">
          {{ isLoading ? 'Testing...' : 'Test Connection' }}
        </button>
        
        <div *ngIf="connectionStatus" class="status-message" [class.success]="connectionStatus.success" [class.error]="!connectionStatus.success">
          {{ connectionStatus.message }}
        </div>
      </div>

      <div class="table-info" *ngIf="tables.length > 0">
        <h4>Available Tables:</h4>
        <ul>
          <li *ngFor="let table of tables">{{ table }}</li>
        </ul>
      </div>

      <div class="instructions">
        <h4>Setup Instructions:</h4>
        <ol>
          <li>Replace <code>YOUR_SUPABASE_PROJECT_URL</code> in environment files with your actual Supabase project URL</li>
          <li>Replace <code>YOUR_SUPABASE_ANON_KEY</code> in environment files with your actual Supabase anon key</li>
          <li>Add your table names to the environment configuration</li>
          <li>Test the connection using the button above</li>
        </ol>
      </div>
    </div>
  `,
  styles: [`
    .supabase-test {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
      background-color: #f9f9f9;
    }

    .status-section {
      margin: 20px 0;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .status-message {
      margin-top: 10px;
      padding: 10px;
      border-radius: 4px;
    }

    .status-message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .status-message.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .table-info {
      margin: 20px 0;
    }

    .instructions {
      margin-top: 20px;
      background-color: #e9ecef;
      padding: 15px;
      border-radius: 4px;
    }

    .instructions code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
    }

    .instructions ol {
      margin: 10px 0;
    }

    .instructions li {
      margin: 5px 0;
    }
  `]
})
export class SupabaseTest implements OnInit {
  isLoading = false;
  connectionStatus: { success: boolean; message: string } | null = null;
  tables: string[] = [];

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // You can add any initialization logic here
    this.loadTablesFromEnvironment();
  }

  testConnection() {
    this.isLoading = true;
    this.connectionStatus = null;

    this.supabaseService.testConnection().subscribe({
      next: (result) => {
        this.isLoading = false;
        if (result.error) {
          this.connectionStatus = {
            success: false,
            message: `Connection failed: ${result.error.message}`
          };
        } else {
          this.connectionStatus = {
            success: true,
            message: 'Connection successful! Supabase is properly configured.'
          };
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.connectionStatus = {
          success: false,
          message: `Connection error: ${error.message}`
        };
      }
    });
  }

  private loadTablesFromEnvironment() {
    // This would load table names from your environment configuration
    // For now, we'll show a placeholder
    this.tables = [];
    
    // You can uncomment and modify this when you have your table names configured
    // const envTables = environment.supabase.database.tables;
    // this.tables = Object.values(envTables);
  }
}
