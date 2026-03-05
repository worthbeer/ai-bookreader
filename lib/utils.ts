import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function parsePDFFile(file: File): Promise<{ content: Array<{ text: string; segmentIndex: number; pageNumber?: number; wordCount: number }>; cover: string }> {
  // This is a placeholder implementation
  // In a real app, you would parse the PDF on the server using a library like pdf-parse
  // For now, we'll return mock data

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        content: [
          {
            text: "Sample content from PDF",
            segmentIndex: 0,
            pageNumber: 1,
            wordCount: 4
          }
        ],
        cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
      })
    }, 100)
  })
}

