# Supabase Integration Setup Guide

This guide will help you set up Supabase integration in your Angular application.

## Prerequisites

- Supabase project created
- Project URL and API key from your Supabase dashboard
- Database table(s) created in Supabase

## Setup Steps

### 1. Configure Environment Variables

Update both environment files with your Supabase credentials:

**File: `src/environments/environment.ts` (Development)**
```typescript
supabase: {
  url: 'YOUR_SUPABASE_PROJECT_URL', // e.g., 'https://your-project.supabase.co'
  anonKey: 'YOUR_SUPABASE_ANON_KEY', // Your public anon key
  database: {
    tables: {
      survey_responses: 'survey_responses',
      // Add other table names here
    }
  }
}
```

**File: `src/environments/environment.prod.ts` (Production)**
```typescript
// Same configuration as above
```

### 2. Create Your Database Tables

In your Supabase dashboard, create the necessary tables. For example:

```sql
-- Example survey_responses table
CREATE TABLE survey_responses (
  id BIGSERIAL PRIMARY KEY,
  q1_answer TEXT,
  q2_answer TEXT,
  q3_answer TEXT,
  -- Add more columns as needed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public inserts (adjust as needed)
CREATE POLICY "Allow public inserts" ON survey_responses
  FOR INSERT WITH CHECK (true);

-- Create a policy to allow public reads (adjust as needed)
CREATE POLICY "Allow public reads" ON survey_responses
  FOR SELECT USING (true);
```

### 3. Using the Supabase Service

The `SupabaseService` provides methods for common database operations:

```typescript
import { SupabaseService } from '../shared/supabase.service';

constructor(private supabaseService: SupabaseService) {}

// Insert data
submitData(data: any) {
  this.supabaseService.insert('your_table_name', data).subscribe({
    next: (result) => {
      if (result.error) {
        console.error('Error:', result.error);
      } else {
        console.log('Success:', result.data);
      }
    }
  });
}

// Select data
loadData() {
  this.supabaseService.select('your_table_name').subscribe({
    next: (result) => {
      if (result.data) {
        console.log('Data:', result.data);
      }
    }
  });
}

// Update data
updateData(id: number, newData: any) {
  this.supabaseService.update('your_table_name', newData, { id }).subscribe({
    next: (result) => {
      console.log('Updated:', result.data);
    }
  });
}

// Delete data
deleteData(id: number) {
  this.supabaseService.delete('your_table_name', { id }).subscribe({
    next: (result) => {
      console.log('Deleted:', result.data);
    }
  });
}
```

### 4. Test the Integration

1. Add the test component to any page:
```typescript
import { SupabaseTest } from '../shared/supabase-test/supabase-test';

// In your component template:
<app-supabase-test></app-supabase-test>
```

2. Or use the example component:
```typescript
import { SupabaseExample } from '../shared/supabase-example';

// In your component template:
<app-supabase-example></app-supabase-example>
```

### 5. Real-time Subscriptions

To listen for real-time changes:

```typescript
// Subscribe to changes
const subscription = this.supabaseService.subscribeToTable('your_table_name', (payload) => {
  console.log('Change received:', payload);
});

// Unsubscribe when done
this.supabaseService.unsubscribe(subscription);
```

### 6. File Storage

For file uploads:

```typescript
// Upload a file
uploadFile(file: File) {
  this.supabaseService.uploadFile('your-bucket', 'path/to/file.jpg', file).subscribe({
    next: (result) => {
      if (result.error) {
        console.error('Upload failed:', result.error);
      } else {
        console.log('Upload successful:', result.data);
      }
    }
  });
}

// Get public URL
const publicUrl = this.supabaseService.getPublicUrl('your-bucket', 'path/to/file.jpg');
```

## Security Considerations

1. **Row Level Security (RLS)**: Always enable RLS on your tables
2. **API Keys**: Never expose service role keys in client-side code
3. **Policies**: Create appropriate policies for your use case
4. **Environment Variables**: Keep sensitive data in environment files

## Common Issues

### Connection Errors
- Verify your project URL and API key
- Check if your Supabase project is active
- Ensure your domain is allowed in Supabase settings

### Permission Errors
- Check your RLS policies
- Verify your API key has the correct permissions
- Make sure your table exists and is accessible

### CORS Issues
- Add your domain to Supabase allowed origins
- Check your Supabase project settings

## Next Steps

1. Replace the placeholder values in environment files
2. Create your database tables
3. Test the connection using the test component
4. Integrate Supabase into your existing components
5. Set up proper security policies

For more information, visit the [Supabase Documentation](https://supabase.com/docs).
