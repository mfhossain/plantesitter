import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-plantowner-test',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="plantowner-test">
      <h3>Plant Owner Table Test</h3>
      
      <!-- Connection Test -->
      <div class="connection-test">
        <button (click)="testConnection()" [disabled]="isTestingConnection">
          {{ isTestingConnection ? 'Testing...' : 'Test Supabase Connection' }}
        </button>
        <div *ngIf="connectionMessage" class="message" [class.success]="connectionSuccess" [class.error]="!connectionSuccess">
          {{ connectionMessage }}
        </div>
      </div>

      <!-- Table Structure Test -->
      <div *ngIf="connectionSuccess" class="structure-test">
        <button (click)="testTableStructure()" [disabled]="isTestingStructure">
          {{ isTestingStructure ? 'Checking...' : 'Check Table Structure' }}
        </button>
        <div *ngIf="structureMessage" class="message" [class.success]="structureSuccess" [class.error]="!structureSuccess">
          {{ structureMessage }}
        </div>
        <div *ngIf="tableColumns.length > 0" class="table-info">
          <h4>Table Columns:</h4>
          <ul>
            <li *ngFor="let column of tableColumns">{{ column }}</li>
          </ul>
        </div>
      </div>

      <!-- Read Test -->
      <div *ngIf="structureSuccess" class="read-test">
        <div class="read-controls">
          <button (click)="testReadData()" [disabled]="isReadingData">
            {{ isReadingData ? 'Reading...' : 'Test Read Data' }}
          </button>
          <button (click)="testReadData()" [disabled]="isReadingData" class="refresh-btn">
            🔄 Refresh
          </button>
        </div>
        <div *ngIf="readMessage" class="message" [class.success]="readSuccess" [class.error]="!readSuccess">
          {{ readMessage }}
        </div>
        <div *ngIf="existingData.length > 0" class="data-display">
          <h4>Existing Data ({{ existingData.length }} records):</h4>
          <div class="records-grid">
            <div *ngFor="let record of existingData; let i = index" class="record-card">
              <div class="record-header">
                <h5>Record #{{ record.id || (i + 1) }}</h5>
                <span class="record-date">{{ record.created_at | date:'short' }}</span>
              </div>
              <div class="record-details">
                <div *ngIf="record.name" class="record-field">
                  <strong>Name:</strong> {{ record.name }}
                </div>
                <div *ngIf="record.address" class="record-field">
                  <strong>Address:</strong> {{ record.address }}
                </div>
                <div *ngIf="record.postcode" class="record-field">
                  <strong>Postcode:</strong> {{ record.postcode }}
                </div>
              </div>
              <button class="delete-btn" (click)="deleteRecord(record.id)" *ngIf="record.id">
                Delete
              </button>
            </div>
          </div>
        </div>
        <div *ngIf="existingData.length === 0 && readSuccess" class="no-data">
          <p>No records found in the plantowner table. Try creating a test record below!</p>
        </div>
      </div>

      <!-- Create Test -->
      <div *ngIf="structureSuccess" class="create-test">
        <h4>Test Create Data</h4>
        <form (ngSubmit)="testCreateData()">
          <div class="form-group">
            <label>Name:</label>
            <input type="text" [(ngModel)]="newRecord.name" name="name" placeholder="Plant Owner Name" required>
          </div>
          <div class="form-group">
            <label>Address:</label>
            <input type="text" [(ngModel)]="newRecord.address" name="address" placeholder="Street Address">
          </div>
          <div class="form-group">
            <label>Postcode:</label>
            <input type="text" [(ngModel)]="newRecord.postcode" name="postcode" placeholder="1234">
          </div>
          <button type="submit" [disabled]="isCreatingData">
            {{ isCreatingData ? 'Creating...' : 'Create Test Record' }}
          </button>
        </form>
        <div *ngIf="createMessage" class="message" [class.success]="createSuccess" [class.error]="!createSuccess">
          {{ createMessage }}
        </div>
      </div>

      <!-- Summary -->
      <div class="test-summary" *ngIf="connectionSuccess && structureSuccess">
        <h4>Test Summary</h4>
        <ul>
          <li>✅ Connection: {{ connectionSuccess ? 'Success' : 'Failed' }}</li>
          <li>✅ Table Structure: {{ structureSuccess ? 'Success' : 'Failed' }}</li>
          <li>✅ Read Operations: {{ readSuccess ? 'Success' : 'Pending' }}</li>
          <li>✅ Create Operations: {{ createSuccess ? 'Success' : 'Pending' }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .plantowner-test {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      margin: 20px 0;
      background-color: #f9f9f9;
    }

    .connection-test, .structure-test, .read-test, .create-test {
      margin-bottom: 20px;
      padding: 15px;
      background-color: white;
      border-radius: 8px;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 10px;
    }

    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .read-controls {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
    }

    .refresh-btn {
      background-color: #28a745;
    }

    .refresh-btn:hover {
      background-color: #218838;
    }

    .message {
      margin-top: 10px;
      padding: 10px;
      border-radius: 4px;
    }

    .message.success {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
    }

    .message.error {
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
    }

    .table-info {
      margin-top: 15px;
    }

    .table-info ul {
      list-style-type: none;
      padding-left: 0;
    }

    .table-info li {
      padding: 5px;
      background-color: #e9ecef;
      margin: 2px 0;
      border-radius: 3px;
    }

    .data-display {
      margin-top: 15px;
    }

    .records-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .record-card {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 15px;
      position: relative;
    }

    .record-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 1px solid #dee2e6;
    }

    .record-header h5 {
      margin: 0;
      color: #495057;
      font-size: 1.1em;
    }

    .record-date {
      font-size: 0.8em;
      color: #6c757d;
    }

    .record-details {
      margin-bottom: 15px;
    }

    .record-field {
      margin: 8px 0;
      font-size: 0.9em;
    }

    .record-field strong {
      color: #495057;
      margin-right: 8px;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8em;
    }

    .delete-btn:hover {
      background-color: #c82333;
    }

    .no-data {
      text-align: center;
      padding: 20px;
      background-color: #e9ecef;
      border-radius: 8px;
      color: #6c757d;
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-group label {
      display: block;
      margin-bottom: 5px;
      font-weight: bold;
    }

    .form-group input,
    .form-group textarea {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-sizing: border-box;
    }

    .form-group textarea {
      height: 80px;
      resize: vertical;
    }

    .test-summary {
      margin-top: 20px;
      padding: 15px;
      background-color: #e7f3ff;
      border-radius: 8px;
    }

    .test-summary ul {
      list-style-type: none;
      padding-left: 0;
    }

    .test-summary li {
      padding: 5px 0;
    }
  `]
})
export class PlantownerTest implements OnInit {
  // Connection test properties
  isTestingConnection = false;
  connectionMessage = '';
  connectionSuccess = false;

  // Structure test properties
  isTestingStructure = false;
  structureMessage = '';
  structureSuccess = false;
  tableColumns: string[] = [];

  // Read test properties
  isReadingData = false;
  readMessage = '';
  readSuccess = false;
  existingData: any[] = [];

  // Create test properties
  isCreatingData = false;
  createMessage = '';
  createSuccess = false;
  newRecord: any = {
    name: '',
    address: '',
    postcode: ''
  };

  // Delete test properties
  isDeletingRecord = false;
  deleteMessage = '';

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // Auto-test connection on component init
    this.testConnection();
  }

  testConnection() {
    this.isTestingConnection = true;
    this.connectionMessage = '';

    console.log('Testing Supabase connection...');
    console.log('Supabase URL:', environment.supabase.url);
    console.log('Supabase Key length:', environment.supabase.anonKey.length);

    // Test multiple approaches to diagnose the issue
    this.testMultipleQueries();
  }

  testMultipleQueries() {
    console.log('Testing multiple query approaches...');
    
    // Test 1: Basic select with all columns
    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        console.log('Test 1 - Basic select result:', result);
        this.handleConnectionResult(result, 'Basic select');
      },
      error: (error) => {
        console.error('Test 1 - Basic select error:', error);
        this.handleConnectionError(error, 'Basic select');
      }
    });

    // Test 2: Select with specific columns only
    setTimeout(() => {
      this.supabaseService.select('plantowner', 'id, name, email', {}).subscribe({
        next: (result) => {
          console.log('Test 2 - Specific columns result:', result);
        },
        error: (error) => {
          console.error('Test 2 - Specific columns error:', error);
        }
      });
    }, 1000);

    // Test 3: Test with limit
    setTimeout(() => {
      this.supabaseService.select('plantowner', 'id', {}).subscribe({
        next: (result) => {
          console.log('Test 3 - ID only result:', result);
        },
        error: (error) => {
          console.error('Test 3 - ID only error:', error);
        }
      });
    }, 2000);
  }

  handleConnectionResult(result: any, testType: string) {
    this.isTestingConnection = false;
    console.log(`${testType} result:`, result);
    
    if (result.error) {
      this.connectionMessage = `${testType} failed: ${result.error.message}`;
      this.connectionSuccess = false;
      console.error(`${testType} error:`, result.error);
    } else {
      this.connectionMessage = `${testType} successful! Status: ${result.status}`;
      this.connectionSuccess = true;
      console.log(`${testType} successful, status:`, result.status);
      
      if (result.data) {
        this.existingData = result.data;
        this.readSuccess = true;
        this.readMessage = `Found ${result.data.length} existing records`;
        console.log('Found existing data:', result.data);
        
        // Additional debugging
        console.log('Data type:', typeof result.data);
        console.log('Data length:', result.data.length);
        console.log('Is array:', Array.isArray(result.data));
      } else {
        console.log('No data property in result');
      }
    }
  }

  handleConnectionError(error: any, testType: string) {
    this.isTestingConnection = false;
    this.connectionMessage = `${testType} error: ${error.message}`;
    this.connectionSuccess = false;
    console.error(`${testType} subscription error:`, error);
  }

  testTableStructure() {
    this.isTestingStructure = true;
    this.structureMessage = '';

    // Try to get one record to see the structure
    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.isTestingStructure = false;
        if (result.error) {
          this.structureMessage = `Structure check failed: ${result.error.message}`;
          this.structureSuccess = false;
        } else {
          this.structureMessage = 'Table structure accessible!';
          this.structureSuccess = true;
          
          // Extract column names from the first record if available
          if (result.data && result.data.length > 0) {
            this.tableColumns = Object.keys(result.data[0] as object);
          } else {
            // If no data, try to infer from our test record structure
            this.tableColumns = ['id', 'name', 'email', 'phone', 'location', 'plant_count', 'notes', 'created_at', 'updated_at'];
          }
        }
      },
      error: (error) => {
        this.isTestingStructure = false;
        this.structureMessage = `Structure check error: ${error.message}`;
        this.structureSuccess = false;
      }
    });
  }

  testReadData() {
    this.isReadingData = true;
    this.readMessage = '';

    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.isReadingData = false;
        if (result.error) {
          this.readMessage = `Read failed: ${result.error.message}`;
          this.readSuccess = false;
        } else {
          this.existingData = result.data || [];
          this.readMessage = `Successfully read ${this.existingData.length} records`;
          this.readSuccess = true;
        }
      },
      error: (error) => {
        this.isReadingData = false;
        this.readMessage = `Read error: ${error.message}`;
        this.readSuccess = false;
      }
    });
  }

  testCreateData() {
    if (!this.newRecord.name) {
      this.createMessage = 'Please fill in at least the name field';
      this.createSuccess = false;
      return;
    }

    this.isCreatingData = true;
    this.createMessage = '';

    // Prepare the record for insertion
    const recordToInsert = {
      name: this.newRecord.name,
      address: this.newRecord.address || null,
      postcode: this.newRecord.postcode || null
    };

    this.supabaseService.insert('plantowner', recordToInsert).subscribe({
      next: (result) => {
        this.isCreatingData = false;
        if (result.error) {
          this.createMessage = `Create failed: ${result.error.message}`;
          this.createSuccess = false;
        } else {
          this.createMessage = 'Record created successfully!';
          this.createSuccess = true;
          
          // Clear the form
          this.newRecord = {
            name: '',
            address: '',
            postcode: ''
          };
          
          // Refresh the data
          this.testReadData();
        }
      },
      error: (error) => {
        this.isCreatingData = false;
        this.createMessage = `Create error: ${error.message}`;
        this.createSuccess = false;
      }
    });
  }

  deleteRecord(id: number) {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    this.isDeletingRecord = true;
    this.deleteMessage = '';

    this.supabaseService.delete('plantowner', { id }).subscribe({
      next: (result) => {
        this.isDeletingRecord = false;
        if (result.error) {
          this.deleteMessage = `Delete failed: ${result.error.message}`;
          console.error('Delete error:', result.error);
        } else {
          this.deleteMessage = 'Record deleted successfully!';
          console.log('Record deleted successfully');
          // Refresh the data
          this.testReadData();
        }
      },
      error: (error) => {
        this.isDeletingRecord = false;
        this.deleteMessage = `Delete error: ${error.message}`;
        console.error('Delete subscription error:', error);
      }
    });
  }
}
