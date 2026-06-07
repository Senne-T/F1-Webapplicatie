import { Navigation } from "@/components/custom/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import {getTeam} from '@/dal/teams'
import {getTeamsImages} from '@/lib/imageAPI'
import TeamForm from '@/app/(authenticated)/teams/[id]/edit/teamForm'

export default async function EditTeamPage({ params }: {params: Promise<{id: string}>}) {
  const {id} = await params
  const team = await getTeam(id)
  const teamImages = getTeamsImages()

  if (!team) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            href={`/teams/${team.id}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Team Details
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Edit Team</h1>
          <p className="text-muted-foreground">Update {team.name}'s information</p>
        </div>

        <TeamForm team={team} images={teamImages} />
      </main>
    </div>
  )
}
