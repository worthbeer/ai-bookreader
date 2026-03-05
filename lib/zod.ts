import { z } from 'zod';
import { MAX_FILE_SIZE, ACCEPTED_PDF_TYPES, MAX_IMAGE_SIZE, ACCEPTED_IMAGE_TYPES } from './constants';

// Allowed voice IDs from voiceOptions in constants.ts
const ALLOWED_VOICE_IDS = ['dave', 'daniel', 'chris', 'rachel', 'sarah'] as const;

export const UploadSchema = z.object({
  pdfFile: z
    .instanceof(File, { message: 'PDF file is required' })
    .refine((file) => file.size <= MAX_FILE_SIZE, 'PDF must be less than 50MB')
    .refine(
      (file) => ACCEPTED_PDF_TYPES.includes(file.type),
      'Only PDF files are accepted'
    ),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_IMAGE_SIZE, 'Image must be less than 10MB')
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    )
    .optional(),
  title: z
    .string()
    .min(1, 'Title is required')
    .min(2, 'Title must be at least 2 characters')
    .max(200, 'Title must be less than 200 characters'),
  author: z
    .string()
    .min(1, 'Author name is required')
    .min(2, 'Author name must be at least 2 characters')
    .max(100, 'Author name must be less than 100 characters'),
  persona: z.enum(ALLOWED_VOICE_IDS, {
    errorMap: () => ({ message: 'Please select a valid voice (dave, daniel, chris, rachel, or sarah)' })
  }),
});

