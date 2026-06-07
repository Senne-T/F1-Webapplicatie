'use client'

import type {FunctionComponent} from 'react'
import type {Team} from '@/generated/prisma/client'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Form from '@/components/custom/form'
import {updateTeamSchema} from '@/schemas/teamSchemas'
import {updateTeamAction} from '@/serverFunctions/teams'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import FormInput from '@/components/custom/formInput'
import FormSelect from '@/components/custom/formSelect'

interface TeamFormProps {
  team: Team
  images: string[]
}

const TeamForm: FunctionComponent<TeamFormProps> = ({team, images}) => {
  const [form, updateTeam] = useZodValidatedForm(updateTeamSchema, updateTeamAction, {
    defaultValues: {
      ...team,
    },
  })

  return (
    <Card className="mx-auto max-w-2xl">
      <CardHeader>
        <CardTitle>Team Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form hookForm={form} className="space-y-6" action={updateTeam} id={team.id}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <FormInput name="name" label="Team Name" placeholder="e.g. Ferrari" />
            </div>

            <div className="space-y-2">
              <FormInput name="location" label="Base Location" placeholder="e.g. Maranello, Italy" />
            </div>

            <div className="space-y-2">
              <FormInput name="principal" label="Team Principal" placeholder="e.g. Fred Vasseur" />
            </div>

            <div className="space-y-2">
              <FormInput name="chassis" label="Chassis" placeholder="e.g. SF-23" />
            </div>

            <div className="space-y-2">
              <FormInput name="engine" label="Power Unit" placeholder="e.g. Ferrari" />
            </div>

            <div className="space-y-2">
              <FormInput name="firstEntry" label="First Entry Year" placeholder="e.g. 1950" />
            </div>

            <div className="space-y-2">
              <FormInput name="championships" label="Championships Won" placeholder="e.g. 16" />
            </div>

            <div className="space-y-2">
              <FormInput name="color" label="Team Color" placeholder="e.g. #DC0000" />
            </div>

            <div className="space-y-2">
              <FormSelect
                name="imageUrl"
                options={images}
                placeholder="Select an image"
                label="Team Image"
                labelExtractor={a => `${a}`}
                valueExtractor={a => a}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href={`/teams/${team.id}`}>
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

export default TeamForm
