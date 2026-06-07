'use client'

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {Pencil, Plus, Trash2} from 'lucide-react'
import {Badge} from '@/components/ui/badge'
import type {FunctionComponent} from 'react'
import React from 'react'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import type {Circuit, Driver, Season} from '@/generated/prisma/client'
import {updateRaceWithResultsSchema} from '@/schemas/raceWithResultsSchemas'
import {updateRaceWithResultsAction} from '@/serverFunctions/raceWithResults'
import FormInput from '@/components/custom/formInput'
import FormSelect from '@/components/custom/formSelect'
import FormDatePicker from '@/components/custom/formDatePicker'
import Form from '@/components/custom/form'
import type {RaceWithDriversAndResults} from '@/models/races'
import {useFieldArray} from 'react-hook-form'

interface ResultsFormProps {
  race: RaceWithDriversAndResults
  circuits: Circuit[]
  drivers: Driver[]
  seasons: Season[]
}

const pointsSystem: Record<number, number> = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
}

const ResultsForm: FunctionComponent<ResultsFormProps> = ({race, circuits, drivers, seasons}) => {
  const [form, updateRaceWithResults] = useZodValidatedForm(updateRaceWithResultsSchema, updateRaceWithResultsAction, {
    defaultValues: {
      id: race.id,
      name: race.name,
      circuitId: race.circuitId,
      seasonId: race.seasonId,
      date: race.date,
      laps: race.laps,
      completed: race.completed,
      results:
        race.results.length > 0
          ? race.results.map((r, i) => ({
              id: r.id,
              driverId: r.driver.id,
              position: Number(r.position ?? i + 1),
              time: r.time || '',
              fastestLap: r.fastestLap || '',
              points: pointsSystem[r.position ?? i + 1] || 0,
            }))
          : Array.from({length: 10}, (_, i) => ({
              position: i + 1,
              driverId: '',
              time: '',
              fastestLap: '',
              points: pointsSystem[i + 1] || 0,
            })),
    },
  })

  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: 'results',
  })

  const addMoreResults = () => {
    append({
      position: fields.length + 1,
      driverId: '',
      time: '',
      fastestLap: '',
      points: pointsSystem[fields.length + 1] || 0,
    })
  }

  const removeResult = (index: number) => {
    if (fields.length <= 1) return
    remove(index)

    // Update posities na removen
    const currentValues = form.getValues('results')
    currentValues.forEach((_, i) => {
      form.setValue(`results.${i}.position`, i + 1)
      form.setValue(`results.${i}.points`, pointsSystem[i + 1] || 0)
    })
  }

  return (
    <Form hookForm={form} className="space-y-6" action={updateRaceWithResults}>
      <FormInput type="hidden" name="id" value={race.id} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Race Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormInput name="name" label="Race Name" placeholder="e.g. Bahrain Grand Prix" />
              </div>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <FormSelect
                    name="circuitId"
                    options={circuits}
                    placeholder="Select a circuit"
                    label="Circuit"
                    labelExtractor={a => `${a.name}`}
                    valueExtractor={a => a.id}
                  />
                  <Link href="/circuits/manage" className="mt-5.5">
                    <Button type="button" variant="outline" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="space-y-2">
                <FormDatePicker name="date" label="Date" placeholder="2025-04-13" />
              </div>
              <FormSelect
                name="seasonId"
                options={seasons}
                placeholder="Select season"
                label="Select a seasoon"
                labelExtractor={a => `${a.year}`}
                valueExtractor={a => a.id}
              />
              <div className="space-y-2">
                <FormInput name="laps" label="Total Laps" placeholder="e.g. 57" />
              </div>
              <div className="space-y-2">
                <FormSelect
                  name="completed"
                  options={[
                    {id: 'true', name: 'Completed'},
                    {id: 'false', name: 'Upcoming'},
                  ]}
                  placeholder="Select status"
                  label="Select a status"
                  labelExtractor={a => `${a.name}`}
                  valueExtractor={a => a.id}
                />
              </div>
            </CardContent>
          </Card>

          <div className="mt-6 flex gap-3">
            <Button type="submit" className="flex-1">
              Update Race
            </Button>
            <Link href="/results" className="flex-1">
              <Button type="button" variant="outline" className="w-full bg-transparent">
                Cancel
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Race Results</CardTitle>
                <Badge variant="secondary">{race.results.length} Drivers</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {fields.map((field, index) => {
                const position = (form.watch(`results.${index}.position`) as number | undefined) ?? index + 1
                const points =
                  (form.watch(`results.${index}.points`) as number | undefined) ?? pointsSystem[index + 1] ?? 0
                const resultId = form.watch(`results.${index}.id`)

                return (
                  <div key={field.id} className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="hidden">
                      {resultId && resultId !== '' && <FormInput type="hidden" name={`results.${index}.id`} />}
                      <FormInput type="hidden" name={`results.${index}.position`} value={position} />
                      <FormInput type="hidden" name={`results.${index}.points`} value={points} />
                    </div>

                    <div className="flex flex-col items-center gap-1 min-w-[60px]">
                      <Badge className="w-full justify-center">P{position}</Badge>
                      <span className="text-sm font-medium text-muted-foreground">{points} pts</span>
                    </div>
                    <div className="flex-1 grid gap-3 sm:grid-cols-3">
                      <div className="space-y-1.5">
                        <FormSelect
                          name={`results.${index}.driverId`}
                          options={drivers}
                          placeholder="Select a driver"
                          label="Driver"
                          labelExtractor={a => `${a.firstName} ${a.lastName}`}
                          valueExtractor={a => a.id}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <FormInput name={`results.${index}.time`} label="Time" placeholder="e.g. 1:35:39.435" />
                      </div>
                      <div className="space-y-1.5">
                        <FormInput
                          name={`results.${index}.fastestLap`}
                          label="Fastest Lap"
                          placeholder="e.g. 1:35.140"
                        />
                      </div>
                    </div>
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 self-center text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => removeResult(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )
              })}

              <Button type="button" variant="outline" onClick={addMoreResults} className="w-full bg-transparent">
                <Plus className="mr-2 h-4 w-4" />
                Add Result
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Form>
  )
}

export default ResultsForm
