'use client'

import {Navigation} from '@/components/custom/navigation'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible'
import {Trophy, Calendar, MapPin, Clock, Zap, ChevronDown, Plus, Pencil, Trash2} from 'lucide-react'
import Link from 'next/link'
import {type FunctionComponent, useState} from 'react'
import type {RaceWithDriversAndResults} from '@/models/races'
import {deleteRaceWithResultsServerFunction} from '@/serverFunctions/raceWithResults'

function calculateOverallStandings(races: RaceWithDriversAndResults[]) {
  const driverPoints: Record<string, {driver: string; team: string; points: number}> = {}

  races.forEach(race => {
    race.results.forEach(result => {
      const driverName = `${result.driver.firstName} ${result.driver.lastName}`
      const teamName = result.driver.team.name

      if (!driverPoints[driverName]) {
        driverPoints[driverName] = {
          driver: driverName,
          team: teamName,
          points: 0,
        }
      }

      driverPoints[driverName].points += result.points
    })
  })

  return Object.values(driverPoints)
    .sort((a, b) => b.points - a.points)
    .slice(0, 10)
}

function parseLapTime(lap: string): number {
  // Verwacht formaat "M:SS.mmm" of "MM:SS.mmm"
  const [minPart, secPart] = lap.split(':')
  const minutes = parseInt(minPart)
  const seconds = parseFloat(secPart)
  return minutes * 60 + seconds
}

type FastestLap = {
  driver: {
    firstName: string
    lastName: string
    team: {name: string}
  }
  time: string
} | null

function getFastestLapDriver(results: RaceWithDriversAndResults['results']): FastestLap {
  let fastestDriver: {
    firstName: string
    lastName: string
    team: {name: string}
  } | null = null

  let fastestTime: string | null = null

  results.forEach(result => {
    if (!result.fastestLap) return

    const lapTime = parseLapTime(result.fastestLap)
    if (!fastestTime || lapTime < parseLapTime(fastestTime)) {
      fastestTime = result.fastestLap
      fastestDriver = result.driver
    }
  })

  if (!fastestDriver || !fastestTime) return null

  return {driver: fastestDriver, time: fastestTime}
}

interface ResultsListProps {
  races: RaceWithDriversAndResults[]
}

const ResultsList: FunctionComponent<ResultsListProps> = ({races}) => {
  const [openRaces, setOpenRaces] = useState<string[]>([])

  const overallStandings = calculateOverallStandings(races)

  const toggleRace = (raceId: string) => {
    setOpenRaces(prev => (prev.includes(raceId) ? prev.filter(id => id !== raceId) : [...prev, raceId]))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Race Results</h1>
            <p className="text-muted-foreground">View all Formula 1 race results from the current season</p>
          </div>
          <Link href="/results/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Race
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              Overall Top 10 Drivers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overallStandings.map((standing, index) => (
                <div
                  key={standing.driver}
                  className="flex items-center gap-4 rounded-lg border border-border bg-background p-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                      index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{standing.driver}</p>
                    <p className="text-sm text-muted-foreground">{standing.team}</p>
                  </div>
                  <Badge variant="secondary" className="text-base font-bold">
                    {standing.points} pts
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {races.map((race, index) => {
            const fastestLap = getFastestLapDriver(race.results)
            const isOpen = openRaces.includes(race.id)

            return (
              <Collapsible key={race.id} open={isOpen} onOpenChange={() => toggleRace(race.id)}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-xl font-bold text-primary-foreground">
                            {index + 1}
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{race.name}</CardTitle>
                            <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{race.circuit.name}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>
                                  {new Date(race.date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/results/${race.id}/edit`}>
                            <Button variant="outline" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button variant="outline" size="icon" onClick={() => deleteRaceWithResultsServerFunction({id: race.id})}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            race.completed ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                          }>
                          {race.completed ? (
                            <>
                              <Trophy className="mr-1 h-3 w-3" />
                              Completed
                            </>
                          ) : (
                            'Upcoming'
                          )}
                        </Badge>

                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm">
                            {isOpen ? 'Hide Details' : 'Show Details'}
                            <ChevronDown
                              className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </Button>
                        </CollapsibleTrigger>
                      </div>
                    </div>
                  </CardHeader>

                  <CollapsibleContent>
                    <CardContent className="p-6">
                      {race.completed && race.results.length > 0 && (
                        <>
                          <div className="mb-6 grid gap-4 md:grid-cols-2">
                            <div className="space-y-3">
                              <h3 className="font-semibold">Race Winner</h3>
                              <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                  1
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold">
                                    {race.results[0].driver.firstName} {race.results[0].driver.lastName}{' '}
                                  </p>
                                  <p className="text-sm text-muted-foreground">{race.results[0].driver.team.name}</p>
                                </div>
                                <Trophy className="h-6 w-6 text-primary" />
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h3 className="font-semibold">Race Details</h3>
                              <div className="space-y-2 rounded-lg border border-border bg-background p-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Total Laps</span>
                                  <Badge variant="secondary">{race.laps} laps</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Clock className="h-3 w-3" />
                                    Winner Time
                                  </span>
                                  <span className="text-sm font-medium">{race.results[0].time}</span>
                                </div>
                                {fastestLap && (
                                  <div className="flex items-center justify-between border-t border-border pt-2">
                                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                      <Zap className="h-3 w-3" />
                                      Fastest Lap
                                    </span>
                                    <div className="text-right">
                                      <p className="text-sm font-medium">
                                        {fastestLap.driver.firstName} {fastestLap.driver.lastName}
                                      </p>
                                      <p className="text-xs text-muted-foreground">{fastestLap.time}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="font-semibold">Race Results (Top {race.results.length})</h3>
                            <div className="overflow-x-auto">
                              <table className="w-full">
                                <thead>
                                  <tr className="border-b border-border">
                                    <th className="px-2 py-2 text-left text-sm font-semibold">Pos</th>
                                    <th className="px-2 py-2 text-left text-sm font-semibold">Driver</th>
                                    <th className="px-2 py-2 text-left text-sm font-semibold">Team</th>
                                    <th className="px-2 py-2 text-right text-sm font-semibold">Time</th>
                                    <th className="px-2 py-2 text-right text-sm font-semibold">Laps</th>
                                    <th className="px-2 py-2 text-right text-sm font-semibold">Fastest</th>
                                    <th className="px-2 py-2 text-right text-sm font-semibold">Points</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {race.results.map(result => {
                                    const isFastestLap =
                                      fastestLap &&
                                      result.driver === fastestLap.driver &&
                                      result.fastestLap === fastestLap.time

                                    return (
                                      <tr key={result.position} className="border-b border-border last:border-0">
                                        <td className="px-2 py-3">
                                          <div
                                            className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                                              result.position === 1
                                                ? 'bg-primary text-primary-foreground'
                                                : result.position <= 3
                                                  ? 'bg-accent text-accent-foreground'
                                                  : 'bg-muted text-muted-foreground'
                                            }`}>
                                            {result.position}
                                          </div>
                                        </td>
                                        <td className="px-2 py-3">
                                          <div className="flex items-center gap-2">
                                            <span className="font-medium">
                                              {result.driver.firstName} {result.driver.lastName}
                                            </span>
                                            {isFastestLap && (
                                              <Zap className="h-3 w-3 text-primary" aria-label="Fastest Lap" />
                                            )}
                                          </div>
                                        </td>
                                        <td className="px-2 py-3 text-sm text-muted-foreground">
                                          {result.driver.team.name}
                                        </td>
                                        <td className="px-2 py-3 text-right text-sm">{result.time}</td>
                                        <td className="px-2 py-3 text-right text-sm text-muted-foreground">
                                          {race.laps}
                                        </td>
                                        <td className="px-2 py-3 text-right text-sm text-muted-foreground">
                                          {result.fastestLap}
                                        </td>
                                        <td className="px-2 py-3 text-right">
                                          <Badge variant="secondary">{result.points}</Badge>
                                        </td>
                                      </tr>
                                    )
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </>
                      )}

                      {!race.completed && (
                        <div className="py-8 text-center text-muted-foreground">
                          <Calendar className="mx-auto mb-2 h-12 w-12 opacity-50" />
                          <p>
                            Race scheduled for{' '}
                            {new Date(race.date).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </p>
                          <p className="text-sm">Results will be available after the race</p>
                        </div>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            )
          })}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Season Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Total Races</p>
                <p className="text-2xl font-bold">{races.length}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{races.filter(r => r.completed).length}</p>
              </div>
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">{races.filter(r => !r.completed).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default ResultsList
