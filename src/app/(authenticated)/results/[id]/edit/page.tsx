import type React from "react"
import { Navigation } from "@/components/custom/navigation"
import { Card, CardContent} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft} from "lucide-react"
import Link from "next/link"
import {getRaceWithDriversAndResults} from '@/dal/races'
import {getDrivers} from '@/dal/drivers'
import {getCircuits} from '@/dal/circuits'
import {getSeasons} from '@/dal/seasons'
import ResultsForm from '@/app/(authenticated)/results/[id]/edit/resultsForm'

export default async function EditRacePage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const race = await getRaceWithDriversAndResults(id)
  const drivers = await getDrivers()
  const circuits = await getCircuits()
  const seasons = await getSeasons()

  if (!race) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Race not found</p>
              <Link href="/results">
                <Button className="mt-4">Back to Results</Button>
              </Link>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

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
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Edit Race</h1>
          <p className="text-muted-foreground">Update race information and results</p>
        </div>

        <ResultsForm race={race} drivers={drivers} circuits={circuits} seasons={seasons} />
      </main>
    </div>
  )
}
