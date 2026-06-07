import { Navigation } from "@/components/custom/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Trophy, Medal, Plus} from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import {getDriversWithTeamAndPoints} from '@/dal/drivers'

export default async function DriversPage() {
  const drivers = await getDriversWithTeamAndPoints()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Drivers</h1>
          <p className="text-muted-foreground">View all Formula 1 drivers and their standings</p>
          <Link href="/drivers/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Driver
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {drivers.map((driver, index) => (
            <Link key={driver.id} href={`/drivers/${driver.id}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
                  <Image
                    src={driver.imageUrl || "/placeholder.svg"}
                    alt={`${driver.firstName} ${driver.lastName}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/90 text-xl font-bold text-primary-foreground backdrop-blur">
                    {driver.number}
                  </div>
                  {index < 3 && (
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-accent text-accent-foreground">
                        <Trophy className="mr-1 h-3 w-3" />
                        Top {index + 1}
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="px-4 pb-3 pt-4">
                  <h3 className="mb-1 text-xl font-bold">{`${driver.firstName} ${driver.lastName}`}</h3>
                  <p className="mb-3 text-sm text-muted-foreground">{driver.team.name}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{driver.totalPoints}</span>
                      <span className="text-muted-foreground">pts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Medal className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{driver.wins}</span>
                      <span className="text-muted-foreground">wins</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-4 w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
