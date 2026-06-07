import {Navigation} from '@/components/custom/navigation'
import {Button} from '@/components/ui/button'
import {ArrowLeft} from 'lucide-react'
import Link from 'next/link'
import ResultsForm from '@/app/(authenticated)/results/create/resultsForm'
import {getDrivers} from '@/dal/drivers'
import {getCircuits} from '@/dal/circuits'
import {getSeasons} from '@/dal/seasons'

export default async function CreateRacePage() {
  const drivers = await getDrivers()
  const circuits = await getCircuits()
  const seasons = await getSeasons()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/results">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Results
            </Button>
          </Link>
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Create New Race</h1>
          <p className="text-muted-foreground">Add a new race result to the season</p>
        </div>

        <ResultsForm drivers={drivers} circuits={circuits} seasons={seasons} />
      </main>
    </div>
  )
}
