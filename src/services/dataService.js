import { supabase } from '@/lib/supabaseClient';

export const fetchData = async (table) => {
  const { data, error } = await supabase.from(table).select('*');
  if (error) throw error;
  return data;
};
