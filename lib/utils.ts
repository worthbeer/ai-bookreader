import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function parsePDFFile(file: File): Promise<{ content: Array<{ text: string; segmentIndex: number; pageNumber?: number; wordCount: number }>; cover: string }> {
  // Validate file type
  if (!file.type || file.type !== 'application/pdf') {
    throw new Error(
      `Invalid file type: ${file.type || 'unknown'}. Only PDF files are supported.`
    )
  }

  // Validate file size (max 50MB)
  const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB in bytes
  if (file.size > MAX_FILE_SIZE) {
    throw new Error(
      `File size ${(file.size / 1024 / 1024).toFixed(2)}MB exceeds maximum allowed size of 50MB.`
    )
  }

  if (file.size === 0) {
    throw new Error('File is empty. Please select a valid PDF file.')
  }

  // Check if running in production
  const isProduction = process.env.NODE_ENV === 'production'
  const isDevelopment = process.env.NODE_ENV === 'development'

  // Check if real PDF parsing is configured (server-side API endpoint)
  const hasPDFParsingEndpoint = !!process.env.NEXT_PUBLIC_PDF_PARSE_API

  if (isProduction && !hasPDFParsingEndpoint) {
    throw new Error(
      'PDF parsing is not configured for production. ' +
      'Please set up a server-side PDF parsing endpoint and configure NEXT_PUBLIC_PDF_PARSE_API. ' +
      'Mock parsing is only available in development mode.'
    )
  }

  // If PDF parsing endpoint is configured, use it
  if (hasPDFParsingEndpoint) {
    // TODO: Implement real server-side PDF parsing
    // Example:
    // const formData = new FormData();
    // formData.append('pdf', file);
    // const response = await fetch(process.env.NEXT_PUBLIC_PDF_PARSE_API, {
    //   method: 'POST',
    //   body: formData,
    // });
    // if (!response.ok) throw new Error('PDF parsing failed');
    // return await response.json();

    throw new Error(
      'Server-side PDF parsing endpoint configured but not yet implemented. ' +
      'Please implement the PDF parsing API at: ' + process.env.NEXT_PUBLIC_PDF_PARSE_API
    )
  }

  // Development/test mode only - return mock data with clear warnings
  if (!isDevelopment) {
    throw new Error(
      'PDF parsing is only available in development mode. ' +
      'Cannot parse PDFs in production without proper configuration.'
    )
  }

  console.warn(
    '⚠️ WARNING: Using mock PDF parser in development mode. ' +
    'This will NOT work in production. File details:',
    {
      name: file.name,
      size: `${(file.size / 1024).toFixed(2)}KB`,
      type: file.type
    }
  )

  // Mock data for development only
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        content: [
          {
            text: `[MOCK DATA] Sample content from: ${file.name}`,
            segmentIndex: 0,
            pageNumber: 1,
            wordCount: 5
          },
          {
            text: `[MOCK DATA] This is development mode placeholder text. File size: ${(file.size / 1024).toFixed(2)}KB`,
            segmentIndex: 1,
            pageNumber: 1,
            wordCount: 12
          }
        ],
        cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      })
    }, 100)
  })
}

