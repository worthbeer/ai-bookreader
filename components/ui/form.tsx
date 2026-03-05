"use client"

import * as React from "react"
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const FormItemContext = React.createContext<{ id: string }>({ id: "" })

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  )
}

function useFormField() {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext.name) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

function FormLabel({ className, ...props }: React.ComponentProps<"label">) {
  const { error, formItemId } = useFormField()

  return (
    <label
      className={cn("form-label", error && "text-red-600", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

/**
 * FormControl wrapper for form inputs.
 *
 * The actual interactive control (input, select, textarea) inside this wrapper
 * should receive the ARIA attributes from useFormField or useFormControlProps.
 *
 * Example with Input component (spreads all props including id/aria-*):
 *   <FormControl>
 *     <Input {...field} />
 *   </FormControl>
 *
 * Example with custom input using useFormControlProps:
 *   <FormControl>
 *     <input {...useFormControlProps()} {...field} />
 *   </FormControl>
 *
 * This ensures FormLabel(htmlFor={formItemId}) correctly points to the actual
 * interactive control, enabling proper focus behavior and accessibility.
 */
function FormControl({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(className)}
      {...props}
    />
  )
}

function getFormControlProps(error?: boolean, formItemId?: string, formDescriptionId?: string, formMessageId?: string) {
  return {
    id: formItemId,
    "aria-describedby": !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`,
    "aria-errormessage": error ? formMessageId : undefined,
    "aria-invalid": !!error,
  } as React.InputHTMLAttributes<HTMLInputElement>
}

/**
 * Hook to get form control attributes for use in custom form inputs.
 * Usage: const fieldProps = useFormControlProps();
 *        <input {...fieldProps} />
 */
function useFormControlProps() {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
  return {
    id: formItemId,
    "aria-describedby": !error ? formDescriptionId : `${formDescriptionId} ${formMessageId}`,
    "aria-errormessage": error ? formMessageId : undefined,
    "aria-invalid": !!error,
  } as React.InputHTMLAttributes<HTMLInputElement>
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      id={formDescriptionId}
      className={cn("text-sm text-(--text-secondary)", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      id={formMessageId}
      className={cn("text-sm text-red-600", className)}
      aria-live="assertive"
      role="alert"
      {...props}
    >
      {body}
    </p>
  )
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
  getFormControlProps,
  useFormControlProps,
}

