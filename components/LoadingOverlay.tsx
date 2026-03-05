'use client'

import { Loader2 } from 'lucide-react'

const LoadingOverlay = () => {
  return (
    <div
      className="loading-wrapper"
      role="status"
      aria-live="polite"
      aria-busy={true}
    >
      {/* Screen reader announcement for accessibility */}
      <span className="sr-only">
        Processing your book. Uploading files and parsing content.
      </span>
      <div className="loading-shadow-wrapper bg-(--bg-card)">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-(--accent-warm)" />
          <h2 className="loading-title">Processing your book...</h2>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" />
              <span className="text-sm text-(--text-secondary)">Uploading files and parsing content...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay

