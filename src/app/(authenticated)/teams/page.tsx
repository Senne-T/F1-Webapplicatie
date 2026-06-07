import { Navigation } from "@/components/custom/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {Trophy, Flag, Plus} from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import {getTeamsWithPoints} from '@/dal/teams'

export default async function TeamsPage() {
  const teams = await getTeamsWithPoints()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Teams</h1>
            <p className="text-muted-foreground">View all Formula 1 constructor teams and standings</p>
          </div>
          <Link href="/teams/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Team
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, index) => (
            <Link key={team.id} href={`/teams/${team.id}`}>
              <Card className="group overflow-hidden transition-all hover:shadow-lg">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                  <Image
                    src={team.imageUrl || "/placeholder.svg"}
                    alt={team.name}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading="eager"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
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
                  <div className="mb-2 flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: team.color }} />
                    <h3 className="text-xl font-bold">{team.name}</h3>
                  </div>
                  <p className="mb-3 text-sm text-muted-foreground">{team.location}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Trophy className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{team.totalPoints}</span>
                      <span className="text-muted-foreground">pts</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flag className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold">{team.championships}</span>
                      <span className="text-muted-foreground">titles</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-4 w-full group-hover:bg-primary group-hover:text-primary-foreground"
                  >
                    View Details
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
