import { Navigation } from "@/components/custom/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {getTeams} from '@/dal/teams'
import DriverForm from '@/app/(authenticated)/drivers/create/driverForm'
import {getDriversImages} from '@/lib/imageAPI'

export default async function CreateDriverPage() {
  const teams = await getTeams()
  const driverImages = getDriversImages()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href="/drivers"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Drivers
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Create New Driver</h1>
          <p className="text-muted-foreground">Add a new F1 driver to the roster</p>
        </div>

        <DriverForm teams={teams} images={driverImages} />
      </main>
    </div>
  )
}
