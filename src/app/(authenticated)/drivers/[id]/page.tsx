import {Navigation} from '@/components/custom/navigation'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Flag, ArrowLeft, Pencil} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {getDriverWithTeamAndPoints} from '@/dal/drivers'
import {notFound} from 'next/navigation'
import {DeleteDriverDialog} from '@/components/custom/delete-driver-dialog'
import {getCompletedRaces} from '@/dal/races'

export default async function DriverDetailPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const driver = await getDriverWithTeamAndPoints(id)
  const completedRaces = await getCompletedRaces()
  const winPercentage = (driver.wins / completedRaces.length) * 100
  const podiumPercentage = (driver.podiums / completedRaces.length) * 100

  if (!driver) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/drivers">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Drivers
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/drivers/${driver.id}/edit`}>
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>

            <DeleteDriverDialog driverId={driver.id} driverName={`${driver.firstName} ${driver.lastName}`} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Driver Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-[3/4] w-full bg-muted">
                <Image
                  src={driver.imageUrl || '/placeholder.svg'}
                  alt={`${driver.firstName} ${driver.lastName}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 top-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/90 text-2xl font-bold text-primary-foreground backdrop-blur">
                  {driver.number}
                </div>
              </div>
              <CardContent className="p-6">
                <h1 className="mb-2 text-3xl font-bold">
                  {driver.firstName} {driver.lastName}
                </h1>
                <p className="mb-4 text-lg text-muted-foreground">{driver.team.name}</p>
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{driver.nationality}</span>
                </div>
                <p className="text-sm">
                  {(() => {
                    const date = new Date(driver.birthDate)
                    const day = String(date.getDate()).padStart(2, '0')
                    const month = String(date.getMonth() + 1).padStart(2, '0')
                    const year = date.getFullYear()
                    return `${day}-${month}-${year}`
                  })()}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Driver Stats and Details */}
          <div className="lg:col-span-2">
            {/* Career Information */}
            <Card>
              <CardHeader>
                <CardTitle>Career Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Team</span>
                  <span className="text-muted-foreground">{driver.team.name}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Car Number</span>
                  <span className="text-muted-foreground">#{driver.number}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Nationality</span>
                  <span className="text-muted-foreground">{driver.nationality}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Championship Points</span>
                  <Badge variant="secondary">{driver.totalPoints} points</Badge>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Race Victories</span>
                  <Badge variant="secondary">{driver.wins} wins</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Podium Finishes</span>
                  <Badge variant="secondary">{driver.podiums} podiums</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Season Performance */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Season Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Win Rate</span>
                    <span className="text-sm font-semibold">
                      {Math.round(winPercentage)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{width: `${winPercentage}%`}}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Podium Rate</span>
                    <span className="text-sm font-semibold">
                      {Math.round(podiumPercentage)}%
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{width: `${podiumPercentage}%`}}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
