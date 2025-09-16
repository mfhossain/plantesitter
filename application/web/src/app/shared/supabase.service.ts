import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    // Initialize Supabase client with environment configuration
    console.log('Initializing Supabase client...');
    console.log('URL:', environment.supabase.url);
    console.log('Key length:', environment.supabase.anonKey.length);
    console.log('Schema:', environment.supabase.database.schema);
    console.log('Project ID:', environment.supabase.database.projectId);
    
    this.supabase = createClient(
      environment.supabase.url,
      environment.supabase.anonKey
    );
    
    console.log('Supabase client initialized:', this.supabase);
  }

  /**
   * Get the Supabase client instance
   */
  getClient(): SupabaseClient {
    return this.supabase;
  }

  /**
   * Test the connection to Supabase
   */
  testConnection(): Observable<any> {
    return from(this.supabase.from('_test').select('*').limit(1));
  }

  /**
   * Generic method to select data from any table
   */
  select<T>(table: string, columns: string = '*', filters?: any): Observable<any> {
    console.log(`Supabase select: table=${table}, columns=${columns}`, filters);
    
    let query = this.supabase.from(table).select(columns);
    
    // Apply filters if provided
    if (filters) {
      Object.keys(filters).forEach(key => {
        query = query.eq(key, filters[key]);
      });
    }
    
    console.log('Supabase query prepared:', query);
    return from(query);
  }

  /**
   * Generic method to insert data into any table
   */
  insert<T>(table: string, data: T | T[]): Observable<any> {
    // Request inserted rows back in the response
    return from(this.supabase.from(table).insert(data).select());
  }

  /**
   * Generic method to update data in any table
   */
  update<T>(table: string, data: Partial<T>, filters: any): Observable<any> {
    let query = this.supabase.from(table).update(data);
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    
    return from(query);
  }

  /**
   * Generic method to delete data from any table
   */
  delete<T>(table: string, filters: any): Observable<any> {
    let query = this.supabase.from(table).delete();
    
    // Apply filters
    Object.keys(filters).forEach(key => {
      query = query.eq(key, filters[key]);
    });
    
    return from(query);
  }

  /**
   * Upload file to Supabase Storage
   */
  uploadFile(bucket: string, path: string, file: File): Observable<any> {
    return from(this.supabase.storage.from(bucket).upload(path, file));
  }

  /**
   * Download file from Supabase Storage
   */
  downloadFile(bucket: string, path: string): Observable<any> {
    return from(this.supabase.storage.from(bucket).download(path));
  }

  /**
   * Get public URL for a file in Supabase Storage
   */
  getPublicUrl(bucket: string, path: string): string {
    const { data } = this.supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  /**
   * Subscribe to real-time changes in a table
   */
  subscribeToTable(table: string, callback: (payload: any) => void): any {
    return this.supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: table }, 
        callback
      )
      .subscribe();
  }

  /**
   * Unsubscribe from real-time changes
   */
  unsubscribe(subscription: any): void {
    this.supabase.removeChannel(subscription);
  }

  /**
   * Get current user session
   */
  getCurrentSession(): Observable<any> {
    return from(this.supabase.auth.getSession());
  }

  /**
   * Sign up a new user
   */
  signUp(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signUp({ email, password }));
  }

  /**
   * Sign in a user
   */
  signIn(email: string, password: string): Observable<any> {
    return from(this.supabase.auth.signInWithPassword({ email, password }));
  }

  /**
   * Sign out current user
   */
  signOut(): Observable<any> {
    return from(this.supabase.auth.signOut());
  }
}
