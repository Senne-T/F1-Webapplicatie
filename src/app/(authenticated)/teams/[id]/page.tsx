import {Navigation} from '@/components/custom/navigation'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Badge} from '@/components/ui/badge'
import {Button} from '@/components/ui/button'
import {Trophy, Calendar, ArrowLeft, Pencil} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import {getTeamWithDriversAndPoints} from '@/dal/teams'
import {DeleteTeamDialog} from '@/components/custom/delete-team-dialog'

export default async function TeamDetailPage({params}: {params: Promise<{id: string}>}) {
  const {id} = await params
  const team = await getTeamWithDriversAndPoints(id)

  if (!team) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/teams">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Teams
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={`/teams/${team.id}/edit`}>
              <Button variant="outline">
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </Link>
            <DeleteTeamDialog teamId={team.id} teamName={team.name} />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Team Image and Basic Info */}
          <div className="lg:col-span-1">
            <Card className="overflow-hidden">
              <div className="relative aspect-[4/3] w-full bg-muted">
                <Image
                  src={team.imageUrl || '/placeholder.svg'}
                  alt={team.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="eager"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full" style={{backgroundColor: team.color}} />
                  <h1 className="text-3xl font-bold">{team.name}</h1>
                </div>
                <p className="mb-4 text-muted-foreground">{team.location}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Team Principal</span>
                    <span className="font-medium">{team.principal}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">First Entry</span>
                    <span className="font-medium">{team.firstEntry}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Stats and Details */}
          <div className="lg:col-span-2">
            {/* Stats Cards */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Championship Points</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{team.totalPoints}</span>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Championships</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{team.championships}</span>
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Years in F1</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">{new Date().getFullYear() - team.firstEntry}</span>
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Technical Information */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Technical Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Chassis</span>
                  <span className="text-muted-foreground">{team.chassis}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Power Unit</span>
                  <span className="text-muted-foreground">{team.engine}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Team Principal</span>
                  <span className="text-muted-foreground">{team.principal}</span>
                </div>
                <div className="flex justify-between border-b border-border pb-3">
                  <span className="font-medium">Base</span>
                  <span className="text-muted-foreground">{team.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">First Entry</span>
                  <Badge variant="secondary">{team.firstEntry}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Drivers */}
            <Card>
              <CardHeader>
                <CardTitle>Current Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {team.drivers.length > 0 ? (
                    team.drivers.map((driver, index) => {
                      const totalPoints = driver.results.reduce((sum, r) => sum + r.points, 0)

                      return (
                        <Link key={driver.id} href={`/drivers/${driver.id}`}>
                          <div
                            className={`flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted ${index !== 0 ? 'mt-4' : ''}`}>
                            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-muted">
                              <Image
                                src={driver.imageUrl || '/placeholder.svg'}
                                alt={`${driver.firstName} ${driver.lastName}`}
                                sizes="(max-width: 768px) 100vw, 50vw"
                                loading="eager"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold">
                                {driver.firstName} {driver.lastName}
                              </h3>
                              <p className="text-sm text-muted-foreground">#{driver.number}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold">{totalPoints}</p>
                              <p className="text-xs text-muted-foreground">points</p>
                            </div>
                          </div>
                        </Link>
                      )
                    })
                  ) : (
                    <p className="text-sm text-muted-foreground">No drivers found for this team</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
