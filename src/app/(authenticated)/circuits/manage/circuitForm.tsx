/*

--------------------------------------------
          UNDER CONSTRUCTION
--------------------------------------------

 */
'use client'

import type {FunctionComponent} from 'react'
import React, {useState} from 'react'
import {useZodValidatedForm} from '@/lib/useZodValidatedForm'
import type {Circuit} from '@/generated/prisma/client'
import {createCircuitSchema, updateCircuitSchema} from '@/schemas/circuitSchemas'
import {createCircuitAction, updateCircuitAction} from '@/serverFunctions/circuits'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import Form from '@/components/custom/form'
import FormInput from '@/components/custom/formInput'
import {Button} from '@/components/ui/button'
import {Pencil, Plus, Trash2} from 'lucide-react'

interface CircuitFormProps {
  circuits: Circuit[]
}

const CircuitForm: FunctionComponent<CircuitFormProps> = ({circuits}) => {
  const [status, setStatus] = useState<string>('create')

  const [form, createOrUpdateCircuit] = useZodValidatedForm(
    status === 'create' ? createCircuitSchema : updateCircuitSchema,
    status === 'create' ? createCircuitAction : updateCircuitAction,
  )

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (editingId) {
  //     setCircuitList(prev =>
  //       prev.map(circuit =>
  //         circuit.id === editingId
  //           ? {
  //               ...circuit,
  //               name: formData.name,
  //               location: formData.location,
  //               length: Number.parseFloat(formData.length),
  //             }
  //           : circuit,
  //       ),
  //     )
  //     alert('Circuit updated successfully!')
  //   } else {
  //     const newCircuit = {
  //       id: Math.max(...circuitList.map(c => c.id)) + 1,
  //       name: formData.name,
  //       location: formData.location,
  //       length: Number.parseFloat(formData.length),
  //     }
  //     setCircuitList(prev => [...prev, newCircuit])
  //     alert('Circuit added successfully!')
  //   }
  //   setFormData({name: '', location: '', length: ''})
  //   setEditingId(null)
  // }
  //
  // const handleEdit = (circuit: Circuit) => {
  //   setEditingId(circuit.id)
  //   setFormData({name: circuit.name, location: circuit.location, length: circuit.length.toString()})
  // }
  //
  // const handleDelete = (id: number) => {
  //   if (confirm('Are you sure you want to delete this circuit?')) {
  //     setCircuitList(prev => prev.filter(c => c.id !== id))
  //     alert('Circuit deleted successfully!')
  //   }
  // }

  const handleCancel = () => {
    setStatus('create')
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{status === 'create' ? 'Add New Circuit' : 'Edit Circuit'}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form hookForm={form} className="space-y-4" action={createOrUpdateCircuit}>
            <div className="space-y-2">
              <FormInput name="name" label="Circuit Name" placeholder="e.g. Bahrain International Circuit" />
            </div>
            <div className="space-y-2">
              <FormInput name="country" label="Country" placeholder="e.g. Bahrain" />
            </div>
            <div className="space-y-2">
              <FormInput name="city" label="City" placeholder="e.g. Sakhir" />
            </div>
            <div className="space-y-2">
              <FormInput name="length" label="Length (km)" placeholder="e.g. 5.412" />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                {status === 'create' ? 'Add Circuit' : 'Update Circuit'}
              </Button>
              <Button
                type="button" // let op: geen type="submit" hier
                onClick={() => {
                  console.log('Form values:', form.getValues()) // data van alle velden
                  console.log('Form errors:', form.formState.errors) // eventuele validatie errors
                }}>
                Test
              </Button>
              {status !== 'create' && (
                <Button type="button" variant="outline" onClick={handleCancel} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Circuits ({circuits.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="max-h-[500px] space-y-2 overflow-y-auto">
            {circuits.map(circuit => (
              <div key={circuit.id} className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{circuit.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {circuit.city}, {circuit.country} • {circuit.lengthKm}km
                  </p>
                </div>
                <div className="flex gap-1">
                  {/*<Button type="button" variant="ghost" size="icon" onClick={() => handleEdit(circuit)}>*/}
                  {/*  <Pencil className="h-4 w-4" />*/}
                  {/*</Button>*/}
                  {/*<Button*/}
                  {/*  type="button"*/}
                  {/*  variant="ghost"*/}
                  {/*  size="icon"*/}
                  {/*  onClick={() => handleDelete(circuit.id)}*/}
                  {/*  className="text-destructive hover:text-destructive">*/}
                  {/*  <Trash2 className="h-4 w-4" />*/}
                  {/*</Button>*/}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CircuitForm
