// src/hooks/useSupabase.ts
import { createClient } from '@supabase/supabase-js';
import { getSupabaseUrl, getSupabaseKey } from '@/lib/env';

const supabaseUrl = getSupabaseUrl();
const supabaseKey = getSupabaseKey();

export const supabase = createClient(supabaseUrl, supabaseKey);

export const useSupabase = () => {
  const uploadFile = async (file: File, bucket: string = 'my-files') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) {
      throw error;
    }

    return data;
  };

  const getFileUrl = (path: string, bucket: string = 'my-files') => {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(path);

    return data.publicUrl;
  };

  return {
    uploadFile,
    getFileUrl,
    supabase,
  };
};