// Test file to verify UploadSchema import works
import { UploadSchema } from '@/lib/zod';

// This should compile without errors
const testSchema = UploadSchema;

console.log('UploadSchema imported successfully:', testSchema);

export {};

