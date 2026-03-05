'use client'

import React from 'react'
import { voiceOptions, voiceCategories } from '@/lib/constants'

interface VoiceSelectorProps {
  value?: string
  onChange: (voiceId: string) => void
  disabled?: boolean
  className?: string
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <fieldset disabled={disabled} className={className}>
      <legend className="sr-only">Choose Assistant Voice</legend>
      <div className="space-y-4" role="radiogroup" aria-label="Choose Assistant Voice">
        {/* Male Voices */}
        <div>
          <p className="mb-2 text-sm font-semibold text-(--text-secondary)">Male Voices</p>
          <div className="flex gap-3 flex-wrap">
            {voiceCategories.male.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions]
              const checked = value === voiceId
              return (
                <label
                  key={voiceId}
                  className={`voice-selector-option focus-within:ring-2 focus-within:ring-(--accent-warm) ${
                    checked
                      ? 'voice-selector-option-selected'
                      : 'voice-selector-option-default'
                  }`}
                  title={voice.description}
                >
                  <input
                    type="radio"
                    name="voice"
                    value={voiceId}
                    checked={checked}
                    onChange={() => onChange(voiceId)}
                    disabled={disabled}
                    className="sr-only"
                  />
                  <span>{voice.name}</span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Female Voices */}
        <div>
          <p className="mb-2 text-sm font-semibold text-(--text-secondary)">Female Voices</p>
          <div className="flex gap-3 flex-wrap">
            {voiceCategories.female.map((voiceId) => {
              const voice = voiceOptions[voiceId as keyof typeof voiceOptions]
              const checked = value === voiceId
              return (
                <label
                  key={voiceId}
                  className={`voice-selector-option focus-within:ring-2 focus-within:ring-(--accent-warm) ${
                    checked
                      ? 'voice-selector-option-selected'
                      : 'voice-selector-option-default'
                  }`}
                  title={voice.description}
                >
                  <input
                    type="radio"
                    name="voice"
                    value={voiceId}
                    checked={checked}
                    onChange={() => onChange(voiceId)}
                    disabled={disabled}
                    className="sr-only"
                  />
                  <span>{voice.name}</span>
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </fieldset>
  )
}

export default VoiceSelector
