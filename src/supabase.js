import { createClient } from '@supabase/supabase-js';

// Public Supabase frontend configuration.
// The Publishable Key is intended for use in browser applications.
const supabaseUrl = 'https://tfqndmgwjuyjegskgbbz.supabase.co';
const supabaseKey = 'sb_publishable_yeiDgR3KaQV2CqevqYQVVQ_rvmfacbJ';

export const supabase = createClient(supabaseUrl, supabaseKey);
