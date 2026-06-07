import React, {type HTMLProps, useId} from 'react'
import {cn} from '@/lib/utils'
import {Label} from '@/components/ui/label'
import FormError from '@/components/custom/formError'
import {Controller} from 'react-hook-form'
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'

interface BaseProps<T> extends HTMLProps<HTMLSelectElement> {
  name: string
  label?: string
  options: T[]
}

interface PropsWithLabel<T extends {label: string}> {
  labelExtractor?: (option: T) => string
}

interface PropsWithoutLabel<T> {
  labelExtractor: (option: T) => string
}

interface PropsWithValue<T extends {value: string}> {
  valueExtractor?: (option: T) => string
}

interface PropsWithoutValue<T> {
  valueExtractor: (option: T) => string
}

type FormSelectProps<T> = (T extends {label: string} ? PropsWithLabel<T> : PropsWithoutLabel<T>) &
  (T extends {value: string} ? PropsWithValue<T> : PropsWithoutValue<T>) &
  BaseProps<T>

function FormSelect<T>({
                         label,
                         name,
                         className,
                         options,
                         labelExtractor,
                         valueExtractor,
                         ...inputProps
                       }: FormSelectProps<T>) {
  const id = useId()
  labelExtractor ??= (option: T) => (option as {label: string}).label
  valueExtractor ??= (option: T) => (option as {value: string}).value

  return (
    <div className={cn('flex flex-col gap-2 mb-2 grow', className)}>
      <Label htmlFor={id} hidden={label === undefined}>
        {label}
      </Label>

      <Controller
        name={name}
        render={({field}) => (
          <>
            <input type="hidden" id={id} value={(field.value as string) ?? ''} name={name} onChange={() => {}} />
            <Select value={`${field.value}`} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={inputProps.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(options => (
                  <SelectItem key={valueExtractor(options)} value={valueExtractor(options)}>
                    {labelExtractor(options)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}
      />

      <FormError path={name} />
    </div>
  )
}

export default FormSelect