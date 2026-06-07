import type React from 'react'
import {Navigation} from '@/components/custom/navigation'
import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import {getCircuits} from '@/dal/circuits'
import Link from 'next/link'
import CircuitForm from '@/app/(authenticated)/circuits/manage/circuitForm'

export default async function ManageCircuitsPage() {
  const circuits = await getCircuits()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/dashboard">
            <Button variant="ghost" className="mb-4" >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Manage Circuits</h1>
          <p className="text-muted-foreground">Add, edit, or remove circuits from the system</p>
        </div>

        <CircuitForm circuits={circuits} />
      </main>
    </div>
  )
}
