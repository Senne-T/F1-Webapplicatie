import type {FunctionComponent, InputHTMLAttributes} from 'react'
import {useId, useState} from 'react'
import {CalendarIcon} from 'lucide-react'
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover'
import {Button} from '@/components/ui/button'
import {format} from 'date-fns'
import {Calendar} from '@/components/ui/calendar'
import {cn} from '@/lib/utils'
import {Controller, useFormContext} from 'react-hook-form'
import {Label} from '@/components/ui/label'
import FormError from '@/components/custom/formError'

interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'defaultValue'> {
  name: string
  label: string
  defaultValue?: Date
}

const DatePicker: FunctionComponent<DatePickerProps> = ({defaultValue, label, ...inputProps}) => {
  const form = useFormContext()
  const formDefault = form.getValues(inputProps.name) ? new Date(form.getValues(inputProps.name) as string) : undefined
  const [date, setDate] = useState<Date | undefined>(defaultValue ?? formDefault ?? undefined)
  const id = useId()

  return (
    <div className={cn('flex flex-col gap-2 mb-2 grow', inputProps.className)}>
      <input id={id} type="hidden" value={(date ?? new Date()).toISOString()} {...inputProps} onChange={() => {}} />
      <Label htmlFor={id}>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>{inputProps.placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          {/**
           * De eerste keer dat het formulier gesubmit wordt, controleert Hook Form (via Zod) of er validatiefouten
           * zijn. Als dit het geval is, wordt de input een controlled component in plaats van een uncontrolled
           * component. Zo kan hookform validatiefouten verwijderen terwijl de gebruiker aan het typen is.
           * Dit werkt echter enkel als we de onChange handler van Hook Form gebruiken.
           * Deze wordt dan automatisch toegevoegd via de register functie.
           * Omdat we hier met een complexe component zitten, wordt die onChange functie echter nooit uitgevoerd.
           *
           * Een value change triggert de onChange niet als deze vanuit React gebeurd in plaats van via de browser,
           * bovenstaande input zal dus nooit een onChange triggeren.
           *
           * Om dit probleem op te lossen, gebruiken we de Controller uit Hook Form, dit is een wrapper die rond
           * complexere input elementen gezet kan worden om deze toch te koppelen aan Hook Form.
           */}
          <Controller
            name={inputProps.name}
            render={({field}) => (
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value as string) : undefined}
                captionLayout="dropdown"
                onSelect={newDate => {
                  setDate(newDate)
                  field.onChange(date ? new Date().toISOString() : newDate?.toISOString())
                }}
                autoFocus
              />
            )}
          />
        </PopoverContent>
      </Popover>
      <FormError path={inputProps.name} />
    </div>
  )
}

export default DatePicker