'use client'

import type {FunctionComponent} from 'react'
import type {Driver, Team} from '@/generated/prisma/client'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Form from '@/components/custom/form'
import {updateDriverSchema} from '@/schemas/driverSchemas'
import {updateDriverAction} from '@/serverFunctions/drivers'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import FormInput from '@/components/custom/formInput'
import FormSelect from '@/components/custom/formSelect'
import FormDatePicker from '@/components/custom/formDatePicker'

interface DriverFormProps {
  driver: Driver
  teams: Team[]
  images: string[]
}

const DriverForm: FunctionComponent<DriverFormProps> = ({driver, teams, images}) => {
  const [form, updateDriver] = useZodValidatedForm(updateDriverSchema, updateDriverAction, {
    defaultValues: {
      ...driver,
    },
  })

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Driver Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form hookForm={form} className="space-y-6" action={updateDriver} id={driver.id}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <FormInput name="firstName" label="Driver's First Name" placeholder="e.g. Lewis" />
            </div>

            <div className="space-y-2">
              <FormInput name="lastName" label="Driver's Last Name" placeholder="e.g. Hamilton" />
            </div>

            <div className="space-y-2">
              <FormDatePicker name="birthDate" label="Birthdate" placeholder="1985-01-07" />
            </div>

            <div className="space-y-2">
              <FormInput name="nationality" label="Nationality" placeholder="e.g. British" />
            </div>

            <div className="space-y-2">
              <FormInput name="number" label="Car Number" placeholder="e.g. 44" />
            </div>

            <div className="space-y-2">
              <FormSelect
                name="teamId"
                options={teams}
                placeholder="Select a team"
                label="Team"
                labelExtractor={a => `${a.name}`}
                valueExtractor={a => a.id}
              />
            </div>

            <div className="space-y-2">
              <FormSelect
                name="imageUrl"
                options={images}
                placeholder="Select an image"
                label="Driver Image"
                labelExtractor={a => `${a}`}
                valueExtractor={a => a}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href={`/drivers/${driver.id}`}>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
            <Button type="submit">Save Changes</Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  )
}

export default DriverForm
