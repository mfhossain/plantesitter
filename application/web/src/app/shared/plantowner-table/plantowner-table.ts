import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';

@Component({
  selector: 'app-plantowner-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="plantowner-table-container">
      <h3>🌱 Plant Owners Database</h3>
      
      <!-- Error State -->
      <div *ngIf="viewErrorMessage" class="error-state">
        <p>❌ {{ viewErrorMessage }}</p>
        <button (click)="loadRecords()" class="retry-btn">Retry</button>
      </div>

      <!-- Data Table -->
      <div *ngIf="!viewErrorMessage" class="table-container">
        <div class="table-header">
          <h4>Plant Owners ({{ viewRecords.length }} records)</h4>
          <button (click)="loadRecords()" class="refresh-btn" [disabled]="isLoading">
            🔍 Fetch
          </button>
        </div>
        
        <div *ngIf="viewRecords.length === 0" class="no-data">
          <p>No data loaded. Click Fetch to load plant owners.</p>
        </div>

        <div *ngIf="viewRecords.length > 0" class="table-wrapper">
          <table class="plantowner-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Postcode</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let record of viewRecords; trackBy: trackByRecordId">
                <td class="id-cell">{{ record.id }}</td>
                <td class="name-cell">{{ record.name }}</td>
                <td class="address-cell">{{ record.address || '-' }}</td>
                <td class="postcode-cell">{{ record.postcode || '-' }}</td>
                <td class="date-cell">{{ record.created_at | date:'short' }}</td>
                <td class="actions-cell">
                  <button 
                    (click)="deleteRecord(record.id)" 
                    class="delete-btn"
                    [disabled]="isDeleting"
                    title="Delete this record">
                    🗑️
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Success Message -->
      <div *ngIf="successMessage" class="success-message">
        ✅ {{ successMessage }}
      </div>
    </div>
  `,
  styles: [`
    .plantowner-table-container {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .plantowner-table-container h3 {
      margin: 0 0 20px 0;
      color: #2c3e50;
      font-size: 1.5em;
      font-weight: 600;
    }

    /* Loading spinner removed per requirements */

    .error-state {
      text-align: center;
      padding: 20px;
      background-color: #f8d7da;
      border: 1px solid #f5c6cb;
      border-radius: 8px;
      color: #721c24;
    }

    .retry-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    .retry-btn:hover {
      background-color: #c82333;
    }

    .table-container {
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background-color: #e9ecef;
      border-bottom: 1px solid #dee2e6;
    }

    .table-header h4 {
      margin: 0;
      color: #495057;
      font-size: 1.1em;
    }

    .refresh-btn {
      background-color: #28a745;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9em;
    }

    .refresh-btn:hover:not(:disabled) {
      background-color: #218838;
    }

    .refresh-btn:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .no-data {
      text-align: center;
      padding: 40px;
      color: #6c757d;
      background-color: #f8f9fa;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .plantowner-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9em;
    }

    .plantowner-table th {
      background-color: #495057;
      color: white;
      padding: 12px 8px;
      text-align: left;
      font-weight: 600;
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .plantowner-table td {
      padding: 12px 8px;
      border-bottom: 1px solid #dee2e6;
      vertical-align: top;
    }

    .plantowner-table tbody tr:hover {
      background-color: #f8f9fa;
    }

    .plantowner-table tbody tr:nth-child(even) {
      background-color: #f8f9fa;
    }

    .plantowner-table tbody tr:nth-child(even):hover {
      background-color: #e9ecef;
    }

    .id-cell {
      text-align: center;
      font-weight: 600;
      color: #007bff;
      width: 60px;
    }

    .name-cell {
      font-weight: 500;
      color: #2c3e50;
      min-width: 150px;
    }

    .address-cell {
      color: #495057;
      min-width: 200px;
      word-wrap: break-word;
    }

    .postcode-cell {
      text-align: center;
      color: #6c757d;
      width: 80px;
    }

    .date-cell {
      color: #6c757d;
      font-size: 0.85em;
      white-space: nowrap;
      width: 120px;
    }

    .actions-cell {
      text-align: center;
      width: 80px;
    }

    .delete-btn {
      background-color: #dc3545;
      color: white;
      border: none;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.8em;
    }

    .delete-btn:hover:not(:disabled) {
      background-color: #c82333;
    }

    .delete-btn:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .success-message {
      background-color: #d4edda;
      color: #155724;
      border: 1px solid #c3e6cb;
      border-radius: 4px;
      padding: 12px;
      margin-top: 16px;
      text-align: center;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .plantowner-table-container {
        padding: 16px;
        margin: 16px 0;
      }

      .table-header {
        flex-direction: column;
        gap: 10px;
        align-items: stretch;
      }

      .plantowner-table th,
      .plantowner-table td {
        padding: 8px 4px;
        font-size: 0.8em;
      }

      .address-cell {
        min-width: 120px;
      }
    }
  `]
})
export class PlantownerTable implements OnInit, OnChanges {
  @Input() data: any[] | null = null;
  @Input() loading: boolean | null = null;
  @Input() error: string | null = null;

  records: any[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  isDeleting = false;

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit() {
    // If parent didn't provide data, load records when component initializes
    //if (this.data === null) {
    //  this.loadRecords();
    //}
  }

  ngOnChanges(changes: SimpleChanges) {
    // When parent-provided data changes, reflect it in the view
    //if (changes['data'] && this.data !== null) {
    //  // No local mutation needed; view uses computed getter
    //}
      // No local mutation needed; view uses computed getter
  }

  // View helpers to prioritize parent-provided state when available
  // Loading indicator removed; keep method for compatibility if referenced
  get viewIsLoading(): boolean {
    return false;
  }

  get viewErrorMessage(): string {
    return this.error !== null ? this.error : this.errorMessage;
  }

  get viewRecords(): any[] {
    return this.data !== null ? this.data : this.records;
  }

  loadRecords() {
    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Loading plantowner records...');

    this.supabaseService.select('plantowner', '*', {}).subscribe({
      next: (result) => {
        this.isLoading = false;
        console.log('Plantowner records loaded:', result);
        
        if (result.error) {
          this.errorMessage = `Failed to load records: ${result.error.message}`;
          console.error('Error loading records:', result.error);
        } else {
          this.records = result.data || [];
          console.log(`Loaded ${this.records.length} plantowner records`);
          
          if (this.records.length === 0) {
            console.log('No records found in plantowner table');
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = `Connection error: ${error.message}`;
        console.error('Subscription error:', error);
      }
    });
  }

  deleteRecord(id: number) {
    if (!confirm(`Are you sure you want to delete plant owner with ID ${id}?`)) {
      return;
    }

    this.isDeleting = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log(`Deleting plantowner record with ID: ${id}`);

    this.supabaseService.delete('plantowner', { id }).subscribe({
      next: (result) => {
        this.isDeleting = false;
        console.log('Delete result:', result);
        
        if (result.error) {
          this.errorMessage = `Failed to delete record: ${result.error.message}`;
          console.error('Delete error:', result.error);
        } else {
          this.successMessage = `Plant owner with ID ${id} deleted successfully!`;
          console.log('Record deleted successfully');
          
          // Refresh the records list
          this.loadRecords();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        }
      },
      error: (error) => {
        this.isDeleting = false;
        this.errorMessage = `Delete error: ${error.message}`;
        console.error('Delete subscription error:', error);
      }
    });
  }

  trackByRecordId(index: number, record: any): number {
    return record.id;
  }
}
