import { Navigation } from "@/components/custom/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import TeamForm from '@/app/(authenticated)/teams/create/teamForm'
import {getTeamsImages} from '@/lib/imageAPI'


export default function CreateTeamPage() {
  const teamImages = getTeamsImages()

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/teams" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Teams
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Create New Team</h1>
          <p className="text-muted-foreground">Add a new F1 constructor team</p>
        </div>

        <TeamForm images={teamImages} />
      </main>
    </div>
  )
}
