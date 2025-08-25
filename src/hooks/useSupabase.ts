// src/hooks/useSupabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://biklzpyuarncssdbwfmk.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpa2x6cHl1YXJuY3NzZGJ3Zm1rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5MjQzMDAsImV4cCI6MjA3MTUwMDMwMH0.LYCQhm6L3RHoTW-G3KbpTOLQuGJf4gzHatjzlzYJAKs';

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