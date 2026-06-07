import { Navigation } from "@/components/custom/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users, Flag, Calendar } from "lucide-react"
import Link from "next/link"

import {getDriversWithTeamAndPoints} from '@/dal/drivers'
import {getTeamsWithPoints} from '@/dal/teams'
import {getCompletedRaces, getRecentRaces} from '@/dal/races'


export default async function DashboardPage() {
  const drivers = await getDriversWithTeamAndPoints()
  const teams = await getTeamsWithPoints()
  const recentRaces = await getRecentRaces()
  const completedRaces = await getCompletedRaces()

  const topDrivers = drivers.slice(0, 3)
  const topTeams = teams.slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back to F1 Tracker</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Drivers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{drivers.length}</div>
              <p className="text-xs text-muted-foreground">Active in season</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
              <Flag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
              <p className="text-xs text-muted-foreground">Competing this year</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Races Completed</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedRaces.length}</div>
              <p className="text-xs text-muted-foreground">Of 24 this season</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Championship Leader</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{topDrivers[0].lastName}</div>
              <p className="text-xs text-muted-foreground">{topDrivers[0].totalPoints} points</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Top Drivers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Top Drivers</CardTitle>
                <Link href="/drivers" className="text-sm font-medium text-primary hover:underline">
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {topDrivers.map((driver, index) => (
                <Link key={driver.id} href={`/drivers/${driver.id}`}>
                  <div
                    className={`flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted ${index > 0 && index < topDrivers.length - 1 ? "my-3" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{driver.firstName} {driver.lastName}</h3>
                      <p className="text-sm text-muted-foreground">{driver.team.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{driver.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Top Teams */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold">Top Teams</CardTitle>
                <Link href="/teams" className="text-sm font-medium text-primary hover:underline">
                  View All
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-0">
              {topTeams.map((team, index) => (
                <Link key={team.id} href={`/teams/${team.id}`}>
                  <div
                    className={`flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted ${index > 0 && index < topTeams.length - 1 ? "my-3" : ""}`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">{team.totalPoints}</p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Races */}
        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">Recent Races</CardTitle>
              <Link href="/results" className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRaces.map((race) => {
                const winner = race.results[0]

                return (
                <div
                  key={race.id}
                  className="flex flex-col gap-2 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{race.name}</h3>
                    <p className="text-sm text-muted-foreground">{race.circuit.name}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-background">
                      {new Date(race.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </Badge>
                    <div className="text-right">
                      {winner && (
                        <>
                          <p className="text-sm font-semibold">{winner.driver.firstName} {winner.driver.lastName}</p>
                          <p className="text-xs text-muted-foreground">{winner.driver.team.name}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
