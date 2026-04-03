import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const supabaseUrl = 'https://djndwgmplyztwzzkojlu.supabase.co';
const supabaseKey = 'sb_publishable_RyvH88Ux1b8c22mSBc68LQ_alTorgrx';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('blog_categories').select('*');
  fs.writeFileSync('output-categories.json', JSON.stringify({data, error}, null, 2));
}

run();
