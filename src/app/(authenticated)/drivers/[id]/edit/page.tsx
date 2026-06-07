import { Navigation } from "@/components/custom/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {getDriver} from '@/dal/drivers'
import {getTeams} from '@/dal/teams'
import DriverForm from '@/app/(authenticated)/drivers/[id]/edit/driverForm'
import {getDriversImages} from '@/lib/imageAPI'

export default async function EditDriverPage({ params }: {params: Promise<{id: string}>}) {
  const {id} = await params
  const driver = await getDriver(id)
  const teams = await getTeams()
  const driverImages = getDriversImages()

  if (!driver) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/drivers/${driver.id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Driver Profile
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Edit Driver</h1>
          <p className="text-muted-foreground">Update {driver.firstName} {driver.lastName}'s information</p>
        </div>

        <DriverForm driver={driver} teams={teams} images={driverImages} />
      </main>
    </div>
  )
}
