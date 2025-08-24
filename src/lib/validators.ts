// src/lib/validators.ts
import { z } from 'zod';

export const uploadSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD.'),
  processingMethod: z.enum(['standard', 'ai']),
  file: z.instanceof(File).refine(
    (file) => file.size <= 10 * 1024 * 1024, 
    'File size must be less than 10MB'
  ).refine(
    (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
    'Invalid file type. Only PDF and images are allowed.'
  ),
});

export type UploadFormData = z.infer<typeof uploadSchema>;