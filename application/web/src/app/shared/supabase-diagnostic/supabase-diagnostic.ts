import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-supabase-diagnostic',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="diagnostic-panel">
      <h4>🔍 Supabase Diagnostic</h4>
      
      <div class="diagnostic-section">
        <h5>Configuration Check:</h5>
        <ul>
          <li>✅ URL: {{ environment.supabase.url }}</li>
          <li>✅ API Key Length: {{ environment.supabase.anonKey.length }} characters</li>
          <li>✅ Table Name: plantowner</li>
        </ul>
      </div>

      <div class="diagnostic-section">
        <h5>Connection Tests:</h5>
        <button (click)="runDiagnostics()" [disabled]="isRunning">
          {{ isRunning ? 'Running...' : 'Run Full Diagnostics' }}
        </button>
        
        <div *ngIf="diagnosticResults.length > 0" class="results">
          <div *ngFor="let result of diagnosticResults" class="result-item" [class.error]="result.error" [class.success]="!result.error">
            <strong>{{ result.test }}:</strong> 
            <span *ngIf="!result.error">{{ result.message }}</span>
            <span *ngIf="result.error" class="error-text">{{ result.message }}</span>
            <div *ngIf="result.data" class="data-preview">
              <pre>{{ result.data | json }}</pre>
            </div>
          </div>
        </div>
      </div>

      <div class="diagnostic-section">
        <h5>Quick Fixes to Try:</h5>
        <ol>
          <li><strong>Check RLS Policies:</strong> In Supabase dashboard, go to Authentication → Policies and ensure there's a policy allowing SELECT for the 'anon' role on the plantowner table.</li>
          <li><strong>Disable RLS temporarily:</strong> Run this SQL in Supabase SQL editor: <code>ALTER TABLE plantowner DISABLE ROW LEVEL SECURITY;</code></li>
          <li><strong>Create a simple policy:</strong> Run this SQL: <code>CREATE POLICY "Allow public read access" ON plantowner FOR SELECT USING (true);</code></li>
          <li><strong>Check table permissions:</strong> Ensure the 'anon' role has SELECT permissions on the plantowner table.</li>
        </ol>
      </div>
    </div>
  `,
  styles: [`
    .diagnostic-panel {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
    }

    .diagnostic-section {
      margin-bottom: 20px;
    }

    .diagnostic-section h5 {
      color: #495057;
      margin-bottom: 10px;
    }

    .diagnostic-section ul, .diagnostic-section ol {
      padding-left: 20px;
    }

    .diagnostic-section li {
      margin: 5px 0;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .results {
      margin-top: 15px;
    }

    .result-item {
      padding: 10px;
      margin: 5px 0;
      border-radius: 4px;
      background-color: #d4edda;
      border: 1px solid #c3e6cb;
    }

    .result-item.error {
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
    }

    .error-text {
      color: #721c24;
    }

    .data-preview {
      margin-top: 10px;
      background-color: white;
      padding: 10px;
      border-radius: 4px;
      max-height: 200px;
      overflow-y: auto;
    }

    .data-preview pre {
      margin: 0;
      font-size: 0.8em;
    }

    code {
      background-color: #e9ecef;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: monospace;
    }
  `]
})
export class SupabaseDiagnostic implements OnInit {
  isRunning = false;
  diagnosticResults: any[] = [];
  environment = environment;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // Auto-run basic diagnostics
    this.runBasicDiagnostics();
  }

  runBasicDiagnostics() {
    console.log('Running basic Supabase diagnostics...');
    this.diagnosticResults = [];
    
    // Test 1: Basic connection
    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.diagnosticResults.push({
          test: 'Basic Connection',
          message: result.error ? `Error: ${result.error.message}` : `Success - Status: ${result.status}`,
          error: !!result.error,
          data: result
        });
      },
      error: (error) => {
        this.diagnosticResults.push({
          test: 'Basic Connection',
          message: `Subscription Error: ${error.message}`,
          error: true,
          data: error
        });
      }
    });
  }

  runDiagnostics() {
    this.isRunning = true;
    this.diagnosticResults = [];
    
    console.log('Running comprehensive Supabase diagnostics...');

    // Test 1: Basic select
    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.addResult('Basic SELECT *', result);
        this.isRunning = false;
      },
      error: (error) => {
        this.addResult('Basic SELECT *', null, error);
        this.isRunning = false;
      }
    });

    // Test 2: Select specific columns
    setTimeout(() => {
      this.supabaseService.select('plantowner', 'id, name', {}).subscribe({
        next: (result) => this.addResult('SELECT id, name', result),
        error: (error) => this.addResult('SELECT id, name', null, error)
      });
    }, 500);

    // Test 3: Select with limit
    setTimeout(() => {
      this.supabaseService.select('plantowner', 'id', {}).subscribe({
        next: (result) => this.addResult('SELECT id only', result),
        error: (error) => this.addResult('SELECT id only', null, error)
      });
    }, 1000);

    // Test 4: Test insert (to check permissions)
    setTimeout(() => {
      const testRecord = {
        name: 'Test User',
        address: 'Test Address',
        postcode: '1234'
      };
      this.supabaseService.insert('plantowner', testRecord).subscribe({
        next: (result) => this.addResult('INSERT Test', result),
        error: (error) => this.addResult('INSERT Test', null, error)
      });
    }, 1500);
  }

  private addResult(testName: string, result?: any, error?: any) {
    if (error) {
      this.diagnosticResults.push({
        test: testName,
        message: `Error: ${error.message}`,
        error: true,
        data: error
      });
    } else if (result) {
      this.diagnosticResults.push({
        test: testName,
        message: result.error ? `Error: ${result.error.message}` : `Success - Data: ${result.data?.length || 0} records`,
        error: !!result.error,
        data: result
      });
    }
  }
}
