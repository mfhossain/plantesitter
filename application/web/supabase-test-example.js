// Working Supabase test code - copy this pattern
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(environment.supabase.url, environment.supabase.anonKey);

async function testFetch() {
  const { data, error } = await supabase.from('plantowner').select('*');
  console.log('data:', data);
  console.log('error:', error);
}
testFetch();
