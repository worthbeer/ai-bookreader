'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Trash2, type LucideIcon } from 'lucide-react'
import { Control, FieldPath, FieldValues } from 'react-hook-form'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

interface FileUploaderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  control: Control<TFieldValues>
  name: TName
  label: string
  acceptTypes: string[]
  icon: LucideIcon
  placeholder: string
  hint: string
  disabled?: boolean
}

const FileUploader = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  acceptTypes,
  icon: Icon,
  placeholder,
  hint,
  disabled = false,
}: FileUploaderProps<TFieldValues, TName>) => {
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (
    file: File | undefined,
    onChange: (value: File | undefined) => void
  ) => {
    if (!file) {
      setPreview(null)
      onChange(undefined)
      return
    }

    onChange(file)

    // Generate preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemove = (onChange: (value: File | undefined) => void) => {
    setPreview(null)
    onChange(undefined)
  }

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <div
              onDrop={(event) => {
                if (disabled) return
                event.preventDefault()
                const file = event.dataTransfer.files[0]
                if (file) {
                  handleFileChange(file, field.onChange)
                }
              }}
              onDragOver={(event) => event.preventDefault()}
              className={`upload-dropzone ${field.value ? 'upload-dropzone-uploaded' : ''}`}
            >
              {field.value ? (
                <div className="flex w-full items-center justify-between px-4">
                  <div className="flex items-center gap-3">
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={56}
                        height={80}
                        className="h-20 w-14 rounded object-cover"
                      />
                    ) : (
                      <Icon className="upload-dropzone-icon" />
                    )}
                    <div className="text-left">
                      <p className="upload-dropzone-text">{field.value.name}</p>
                      <p className="upload-dropzone-hint">
                        {(field.value.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(field.onChange)}
                    className="upload-dropzone-remove"
                    aria-label={`Remove ${label}`}
                    disabled={disabled}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                  <Icon className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">{placeholder}</p>
                  <p className="upload-dropzone-hint">{hint}</p>
                  <input
                    type="file"
                    accept={acceptTypes.join(',')}
                    className="hidden"
                    disabled={disabled}
                    onChange={(event) => {
                      const file = event.target.files?.[0]
                      handleFileChange(file, field.onChange)
                    }}
                  />
                </label>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FileUploader

