import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nioubprdaqlobsnihfmq.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pb3VicHJkYXFsb2JzbmloZm1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0Mjk2MzksImV4cCI6MjA0ODAwNTYzOX0.ERIpG7yoXO17t618WDpTbIrv70FmZghKswWt-0H1JQ0'; // Replace with your Supabase public API key
export const supabase = createClient(supabaseUrl, supabaseKey);
